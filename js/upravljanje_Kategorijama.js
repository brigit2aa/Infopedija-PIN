window.addEventListener("load", f);

function f() {
    var korisnik = localStorage.getItem("korisnik");
    if (korisnik === null) {
        window.location.href = "http://localhost/Popravak/MojaStranica/infopedija.html?idKategorije=1";
    }

    ucitajNavigaciju();
}
function ucitajNavigaciju() {

    var navigacija = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">'
        + '<div class="container-fluid">'
        + '  <a class="navbar-brand" href="prijava.html">Pin-info</a>'
        + ' <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"'
        + '   aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'
        + '   <span class="navbar-toggler-icon"></span>'
        + '  </button>'
        + '  <div class="collapse navbar-collapse" id="navbarSupportedContent">'
        + '    <ul class="navbar-nav me-auto mb-2 mb-lg-0">'
    var kategorijeIzbornik = "";
    var oDb = firebase.database();
    var oDbKategorije = oDb.ref('kategorije/');
    oDbKategorije.once('value', function (oOdgovorPosluzitelja) {
        var oKategorije = oOdgovorPosluzitelja.val();
        var kategorije = Object.keys(oOdgovorPosluzitelja.val());
        for (var i = 0; i < kategorije.length; i++) {
            kategorijeIzbornik = kategorijeIzbornik + '<li class="nav-item">'
                + '<a class="nav-link" aria-current="page" href="infopedija.html?idKategorije=' + kategorije[i] + '">' + oKategorije[kategorije[i]].Naziv + '</a>'
                + '</li>';
        }
        var korisnik = localStorage.getItem("korisnik");
        if (korisnik !== null) {
            kategorijeIzbornik = kategorijeIzbornik + '<li class="nav-item">'
                + '<a class="nav-link" aria-current="page" href="upravljanjeKategorijama.html"> Upravljanje kategorijama</a>'
                + '</li>';
            kategorijeIzbornik = kategorijeIzbornik + '<li class="nav-item">'
                + '<a class="nav-link" aria-current="page" href="dodavanje_clanaka.html">Dodavanje članaka</a>'
                + '</li>';
        }
        navigacija = navigacija + kategorijeIzbornik
            + '    </ul>'
            + '    <form class="d-flex">'
            + '      <input class="form-control me-2" type="search" placeholder="Pretraži" aria-label="Search">'
            + '      <button type="button" class="btn btn-warning" id="pretrazi">Pretraži</button>'
            + '     </form>'
            + '    </div>'
            + '  </div>'
            + '</nav>';
        document.getElementById("izbornik").innerHTML = navigacija;

    });

}


$("#btnDodajKategoriju").click(function () {

    var promjena = $('#kategorija').val();
    var oDb = firebase.database();

    var oDbClanak = oDb.ref('kategorije/');


    oDbClanak.once('value', function (oOdgovorPosluzitelja) {
        var oClanak = oOdgovorPosluzitelja.val();
        if (confirm("Dali ste sigurni da želite dodati novu kategoriju?")) {
            if (oClanak !== null) {
                var clanci = Object.keys(oOdgovorPosluzitelja.val());
                console.log(clanci);
                var maxId = parseInt(clanci[0]);
                for (var i = 0; i < clanci.length; i++) {
                    if (parseInt(clanci[i]) > parseInt(maxId)) {
                        maxId = clanci[i];
                    }
                }
                var index = parseInt(maxId) + 1;
                firebase.database().ref('kategorije/' + index).set({
                    Naziv: promjena
                });
            }
            else {
                firebase.database().ref('kategorije/' + 1).set({
                    Naziv: promjena
                });
            }
            ucitajKategoriju();
            alert("Dodana je nova kategorija!")
        }
        else {
            alert("Nova kategorija nije dodana!")
        }
    });
}
);

$("#btnObrisiKategoriju").click(function () {
    firebase.database().ref('kategorije/' + 1).remove();
}
);

$("#btnAzurirajKategoriju").click(function () {
    var updates = {};

    updates['Naziv'] = "Komedija";

    firebase.database().ref('kategorije/' + 1).update(updates);
}
);

$("#btnDohvatiKategorije").click(function () {

    var oDb = firebase.database();
    var oDbKategorije = oDb.ref('kategorije/');
    oDbKategorije.once('value', function (oOdgovorPosluzitelja) {
        var oKategorije = oOdgovorPosluzitelja.val();
        var kategorije = Object.keys(oOdgovorPosluzitelja.val());
        console.log(oKategorije);
    });
}
);

function createHeader() {

    var hreader = '<table id="tablicaKategorija" class="table">'
        + '<thead>'
        + '<tr>'
        + '<th scope="col">Rb. kategorije</th>'
        + '<th scope="col">Kategorija</th>'
        + '<th scope=col>Brisanje</th>'
        + '<th scope=col>Ažuriranje</th>'
        + '</tr>'
        + '</thead>';
    return hreader;
}

function kreirajRedak(oClanak, key) {
    document.getElementById('tablicaKategorija').style.backgroundColor = "gray";

    var redak = '<tr>'
        + '<td scope="col">' + key + '</td>'
        + '<td scope="col"> ' + oClanak[key].Naziv + '</td>'
        + '<td scope="col"> <button id="btnObrisiKategoriju-' + key + '" class="btn btn-outline-warning">Obriši kategoriju</button></td>'
        + '<td scope="col"><button id="btnAzurirajKategoriju-' + key + '" class="btn btn-warning">Ažuriraj kategoriju</button></td>'
        + '</tr>';
    return redak;
}

function ucitajKategoriju() {
    var oDb = firebase.database();

    var oDbClanak = oDb.ref('kategorije/');


    oDbClanak.once('value', function (oOdgovorPosluzitelja) {
        var oClanak = oOdgovorPosluzitelja.val();
        var clanci = Object.keys(oOdgovorPosluzitelja.val());
        var tablica = createHeader();
        tablica = tablica + '<tbody>'
        for (var i = 0; i < clanci.length; i++) {
            tablica = tablica + kreirajRedak(oClanak, clanci[i]);
        }
        tablica = tablica + '</tbody>'
        tablica = tablica + '</table>'
        console.log(tablica);
        document.getElementById("tablicaKategorija").innerHTML = tablica;
        console.log("tu sam");
    });
}

ucitajKategoriju();


$(document).on('click', '.btn-warning', function () {

    if ($(this).attr('id').startsWith("btnAzurirajKategoriju")) {
        if (confirm("Dali ste sigurni da želite ažurirati kategoriju?")) {
            var idKategorije = $(this).attr('id').replace("btnAzurirajKategoriju-", "");
            var promjena = $('#kategorija').val();
            console.log(promjena);
            var updates = {};

            updates['Naziv'] = promjena;

            firebase.database().ref('kategorije/' + idKategorije).update(updates);
            ucitajKategoriju();
            alert("Kategorija je ažurirana!");
        }
        else {
            alert("Kategorija nije ažurirana")
        }
    }

});

$(document).on('click', '.btn-outline-warning', function () {
    if (confirm("Dali ste sigurni da želite obristi kategoriju?")) {
        if ($(this).attr('id').startsWith("btnObrisiKategoriju")) {
            var idKategorije = $(this).attr('id').replace("btnObrisiKategoriju-", "");
            firebase.database().ref('kategorije/' + idKategorije).remove();
            ucitajKategoriju();
            ucitajNavigaciju();
            alert("Kategorija je obrisana!");
        }
    }
    else {
        alert("Kategorija nije obrisana!");
    }
});

