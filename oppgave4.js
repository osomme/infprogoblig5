window.onload = oppstart;
var xmlhttp;

var utskrift = {
    a: document.getElementById("utskrift")
};

var inputAntDager = parseInt(document.getElementById("inputDager").value);

function oppstart() {
    document.getElementById("btn").onclick = goTo;
}

function goTo() {
    lastData(finnStedXML, "data/noreg.txt");
}

function finnStedXML() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data = xmlhttp.responseText;
        var rader = data.split("\n");

        var input = document.getElementById("inputStedsNavn").value;
        var svarKolonne;

        for (var i = 0; i < rader.length; i++) {
            var kolonne = rader[i].split("¤");
            if (input.toUpperCase() == kolonne[1].toUpperCase()) {
                svarKolonne = kolonne[11];
                lastData(lastYrData, "oppgave4.php?sted=" + svarKolonne);
                break;
            }
        }
    }
}

function lastYrData() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var yrXML = xmlhttp.responseXML;
        var tempXDager = "";

        var yrData = {
            stedsNavn: yrXML.getElementsByTagName("forecast")[0].
                    getElementsByTagName("text")[0].getElementsByTagName("location")[0].attributes.
                    getNamedItem("name").value,
            tekstIDag: yrXML.getElementsByTagName("forecast")[0].
                    getElementsByTagName("text")[0].getElementsByTagName("location")[0].
                    getElementsByTagName("time")[0].getElementsByTagName("body")[0].
                    childNodes[0].nodeValue,
            tempNaa: yrXML.getElementsByTagName("forecast")[0].
                    getElementsByTagName("tabular")[0].getElementsByTagName("time")[0].
                    getElementsByTagName("temperature")[0].attributes.getNamedItem("value").value,
            dager:   yrXML.getElementsByTagName("forecast")[0].
                    getElementsByTagName("tabular")[0].getElementsByTagName("time"),

        };

        // Denne løkka finner temperaturen for X antall dager fremover. X bestemmes av brukeren.
        // Temperaturene skrives ut i variablen tempXDager.
        for (var i = 0; i < yrData.dager.length; i++) {
            if (yrData.dager[i].attributes.getNamedItem("period").value == 2) {
                tempXDager += yrData.dager[i].getElementsByTagName("temperature")[0].
                attributes.getNamedItem("value").value;
            }
            if (tempXDager.length == inputAntDager) {
                break;
            }
        }

        console.log(yrData.tekstIDag, yrData.tempNaa);
        console.log(tempXDager.split(""));
    }
}

function lastData(a, b) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = a;
    xmlhttp.open("GET", b, true);
    xmlhttp.send();
}
