var sviID = [];

function osvjezi() {
    var tabela = document.getElementById("tabelaStudenata");
    var studenti;

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4 && ajax.status == 200) {
            var tekst = ajax.responseText;
            studenti = JSON.parse(tekst);

            var tabelaUnutrasnjost = "<tr><th>ID</th><th>Predmet</th><th>Ime</th><th>Prezime</th><th>Prisustvo</th><th>Zadaće</th><th>Prva parcijala</th><th>Druga parcijala</th><th>Ocjena</th></tr>";
            var i;
            for (i=0; i<studenti.length; i++) {
                tabelaUnutrasnjost +=
                    "<tr> <td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["id"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["predmet"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["ime"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["prezime"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["prisustvo"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["zadace"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["1parc"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["2parc"] +
                    "</td><td style='border: 1px solid black; border-radius: 5px; padding: 5px'>" + studenti[i]["ocjena"] + "</tr>";
                sviID.push(studenti[i]["id"]);
            }
            tabela.innerHTML = tabelaUnutrasnjost;
        }
    }
    ajax.open("POST", "http://zamger.etf.unsa.ba/studenti.php", true);
    ajax.send();
}
onload = osvjezi();

function promjenaAkcije() {
    var akcija = document.getElementById("akcija").value;

    if(akcija == "Dodavanje") {
        document.getElementById("dodavanje").style.display = "block";
        document.getElementById("promjena").style.display = "none";
        document.getElementById("brisanje").style.display = "none";
    }
    else if (akcija == "Promjena") {
        document.getElementById("dodavanje").style.display = "none";
        document.getElementById("promjena").style.display = "block";
        document.getElementById("brisanje").style.display = "none";
    }
    else if (akcija == "Brisanje") {
        document.getElementById("dodavanje").style.display = "none";
        document.getElementById("promjena").style.display = "none";
        document.getElementById("brisanje").style.display = "block";
    }
    else {
        alert("Neocekivano ponasanje.")
    }
}

function dodaj() {
    var _id = parseInt(document.getElementById("idDodavanje").value);
    var _predmet = parseInt(document.getElementById("predmetDodavanje").value);
    var _ime = document.getElementById("imeDodavanje").value;
    var _prezime = document.getElementById("prezimeDodavanje").value;
    var _prisustvo = parseInt(document.getElementById("prisustvoDodavanje").value);
    var _zadace = parseInt(document.getElementById("zadaceDodavanje").value);
    var _prvaParcijala = parseInt(document.getElementById("prvaParcijalaDodavanje").value);
    var _drugaParcijala = parseInt(document.getElementById("drugaParcijalaDodavanje").value);
    var _ocjena = parseInt(document.getElementById("ocjenaDodavanje").value);

    var i;
    for(i=0; i<sviID.length; i++) {
        if (_id == sviID[i]) {
            document.getElementById("errorDodaj").innerHTML = "Uneseni ID već postoji";
            return;
        }
    }

    var student = {
        id: _id,
        predmet: _predmet,
        ime: _ime,
        prezime: _prezime,
        prisustvo: _prisustvo,
        zadace: _zadace,
        "1parc": _prvaParcijala,
        "2parc": _drugaParcijala,
        ocjena: _ocjena
    }

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.status == 200 && ajax.readyState == 4) {
            alert("Student je uspjesno unesen");
            osvjezi();
        }
        else if (ajax.status == 400 && ajax.readyState == 4) {
            alert("Neispravni podaci");
        }
        else if (ajax.status == 404 && ajax.readyState == 4) {
            alert("Nepostojeći student");
        }
    }
    ajax.open("POST", "http://zamger.etf.unsa.ba/studenti.php", true);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send ("akcija=dodavanje&student=" + JSON.stringify(student));
    alert(JSON.stringify(student));
}