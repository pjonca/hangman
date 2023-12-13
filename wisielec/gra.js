var hasla = new Array(9);

hasla[0] = "Biednemu zawsze wiatr w oczy";
hasla[1] = "Bez pracy nie ma kołaczy";
hasla[2] = "Apetyt rośnie w miarę jedzenia";
hasla[3] = "wilk syty i owca cała";
hasla[4] = "Cel uświęca środki";
hasla[5] = "Na złodzieju czapka gore";
hasla[6] = "Kłamstwo ma krótkie nogi";
hasla[7] = "Mądry Polak po szkodzie";
hasla[8] = "Dla chcącego nic trudnego";

function losowanie()
{
    var index = Math.floor(Math.random() * hasla.length);
    return hasla[index];
}

var haslo = losowanie();
haslo = haslo.toUpperCase();

var dlugosc = haslo.length
var haslo2 = "";

for(i=0; i<dlugosc; i++)
{
    if(haslo.charAt(i) == " ")
    {
        haslo2 = haslo2 + " ";
    }
    else
    {
        haslo2 = haslo2 + "-"
    }
}

var yes = new Audio("sound/yes.mp3");
var no = new Audio("sound/no.mp3");
var lose = new Audio("sound/lose.mp3");
var win = new Audio("sound/win.mp3")

var ilosc_nietrafionych = 0;


function wyswietl_haslo()
{
    document.getElementById("tytul").innerHTML = haslo2;
}

window.onload = start;

var litery = new Array(35)
litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

function start()
{
    var tresc = "";

    for(i=0; i<=34; i++)
    {
        var element = "lit" + i;
        tresc = tresc + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">' + litery[i] + '</div>';
   
        if((i+1) % 12 == 0)
        {
            tresc = tresc + '<div style="clear:both;"></div>';
        }
    }

    document.getElementById("klawiatura").innerHTML = tresc;

    wyswietl_haslo();
}

String.prototype.wstawZnak = function(miejsce, znak)
{
    if(miejsce > this.length - 1)
    {
        return this.toString();
    }
    else
    {
        return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
    }
}

function sprawdz(nr)
{
    var zgodnosc = false;

    for(i=0; i<dlugosc; i++)
    {
        if(haslo.charAt(i) == litery[nr])
        {
            haslo2 = haslo2.wstawZnak(i, litery[nr]);
            zgodnosc = true;
        }
    }

    if(zgodnosc == true)
    {
        yes.play();

        var element = "lit" + nr;

        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";

        wyswietl_haslo();
    }
    else
    {
        no.play();

        var element = "lit" + nr;

        document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");		
		
        ilosc_nietrafionych++;
        var obraz = "img/o" + ilosc_nietrafionych + ".jpg";
        document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'"/>';
    }

    if(haslo == haslo2)
    {
        win.play();
        document.getElementById("klawiatura").innerHTML = "Tak jest! Prawidłowe hasło: <br /><br />  " + haslo + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }

    if(ilosc_nietrafionych >= 10)
    {
        lose.play();
        document.getElementById("klawiatura").innerHTML = "Przegrana! <br /><br />Prawidłowe hasło: " + haslo + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
      
    }
}

