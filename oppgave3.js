window.onload = oppstart;

var xmlhttp;

function oppstart() {
  request(sjekkStatus, "data/presentasjoner.dat");
}

function registrering(v) {
  document.getElementById("opplisting").style.display = "none";
  document.getElementById("regSkjema").style.display = "block";
  document.getElementById("btnRegistrer").onclick = skriv;
  lagDropdown(v.currentTarget.value);
}

function sjekkStatus() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    // Lag array der hver indeks består av en linje med data.
    var rader = xmlhttp.responseText.split("\n");

    for (var i = 0; i < rader.length; i++) {
      var kolonne = rader[i].split("%");
      var ledigePlasser = kolonne[3] - kolonne[4];
      if (Date.parse(kolonne[2]) > Date.now()) {
        printPresentasjoner("<b>" + kolonne[0] + " - " + kolonne[1] + "</b>" +
          "<br />" + kolonne[2] + "<br />" + "Antall ledige plasser: " +
          ledigePlasser + " av " + kolonne[3] + "<br />", kolonne[0], ledigePlasser);
      }
    }
  }
}

function printPresentasjoner(utskrift, kursVerdi, ledigePlasser) {
  // Funksjonen viser presentasjoner og generer knapper.
  var div = document.createElement("div");
  var knapp = document.createElement("button");
  div.innerHTML = utskrift;
  knapp.value = kursVerdi;
  knapp.setAttribute("onclick", "");
  knapp.onclick = registrering;
  if (ledigePlasser == 0) {
    knapp.disabled = true;
    knapp.innerHTML = "Ingen ledige plasser";
  } else {
    knapp.innerHTML = "Meld deg på";
  }
  document.getElementById("opplisting").appendChild(div).appendChild(knapp);
}

function skriv() {
  var input = {
    id: document.getElementById("inputID").value,
    navn: document.getElementById("inputNavn").value,
    epost: document.getElementById("inputEpost").value
  };
  request(skrivBekreftelse, "oppgave2.php?kode=" + input.id + "&navn=" + input.navn +
    "&epost=" + input.epost);
}

function skrivBekreftelse() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    document.getElementById("utskriftReg").innerHTML = xmlhttp.responseText;
  }
}

function lagDropdown(verdi) {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    // Lag array der hver indeks består av en linje med data.
    var rader = xmlhttp.responseText.split("\n");

    for (var i = 0; i < rader.length; i++) {
      var kolonne = rader[i].split("%");
      var ledigePlasser = kolonne[3] - kolonne[4];
      if (Date.parse(kolonne[2]) > Date.now() && ledigePlasser > 0) {
        // Vis kun presentasjoner som har ledige plasser og ikke har skjedd enda.
        var skrivUt = kolonne[1] + " " + kolonne[2];
        lagListe(skrivUt, kolonne[0], kolonne, verdi);
      }
    }
  }
}

function lagListe(kursNavn, id, kolonne, verdi) {
  var valg = document.createElement("option");
  var valgMuligheter = document.createTextNode(kursNavn);
  if (kolonne[0] == verdi) {
    valg.selected = true;
  }
  valg.appendChild(valgMuligheter);
  valg.value = id;
  document.getElementById("inputID").appendChild(valg);
}

function request(funksjon, fil) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = funksjon;
  xmlhttp.open("GET", fil, true);
  xmlhttp.send();
}
