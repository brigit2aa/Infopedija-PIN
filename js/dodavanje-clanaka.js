window.addEventListener("load", f);

function f() {
    var korisnik = localStorage.getItem("korisnik");
    if (korisnik === null) {
        window.location.href = "http://localhost/Popravak/MojaStranica/infopedija.html?idKategorije=1";
    }
    ucitajNavigaciju();
    ucitajKategorijeSelect();
    ucitajClanake();
}

function ucitajKategorijeSelect() {

    var oDb = firebase.database();
    var oDbKategorije = oDb.ref('kategorije/');
    oDbKategorije.once('value', function (oOdgovorPosluzitelja) {
        var oKategorije = oOdgovorPosluzitelja.val();
        var kategorije = Object.keys(oOdgovorPosluzitelja.val());
        var opcije = "";
        for (var i = 0; i < kategorije.length; i++) {
            opcije = opcije + '<option value="' + kategorije[i] + '">' + oKategorije[kategorije[i]].Naziv + '</option>';
        }
        document.getElementById("karegorijeSelect").innerHTML = opcije;

    });
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
                + '<a class="nav-link" aria-current="page" href="upravljanjeKategorijama.html">Upravljanje kategorijama</a>'
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

function createHeader() {

    var hreader = '<table id="tablica-clanaka" class="table">'
        + '<thead>'
        + '  <tr>'
        + '    <th scope="col">Rb. članka</th>'
        + '    <th scope="col">Kategorija</th>'
        + '    <th scope="col">Slika</th>'
        + '    <th scope="col">Naziv</th>'
        + '    <th scope="col">Kratki opis</th>'
        + '    <th scope="col">Tekst</th>'
        + '    <th scope="col">Ključne riječi</th>'
        + '   <th scope="col">Autor</th>'
        + '   <th scope="col">Ocjena</th>'
        + '    <th scope="col">Datum</th>'
        + '   <th scope="col">Brisanje</th>'
        + '    <th scope="col">Ažuriranje</th>'
        + '   </tr>'
        + ' </thead>';
    return hreader;
}

function kreirajRedak(oClanak, key) {

   
    console.log(oClanak[key]);
    //console.log(oClanak[key].Ocjena);
    var ocjena = oClanak[key].Ocjena;

    switch (oClanak[key].Ocjena) {
        case undefined:
            ocjena = ("Neocjenjeno");
            break;
        case "1":
            ocjena = ("Jedan");
            break;
        case "2":
            ocjena = "Dva";
            break;
        case "3":
            ocjena = "Tri";
            break;
        case "4":
            ocjena = "Četiri";
            break;
        case "5":
            ocjena = "Pet";
            break;
        default:
        // code block  
    }

  var slika =  oClanak[key].Slika;

    
    var redak = "";

    if (ocjena >= "Tri") { 
        redak = '  <tr>'
            + '    <td scope="col">' + key + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Kategirija + '</td>'
            + '    <td scope="col"> '  + '<img id="images_4" style=" style=" width="128" height="128"" src=" ' + slika + '" alt="...">'+ '</td>'   
            + '    <td scope="col"> ' + oClanak[key].Naslov + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Opis + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Sadrzaj + '</td>'
            + '    <td scope="col"> ' + oClanak[key].KljucneRijeci + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Autor + '</td>'
            + '    <td scope="col"> ' + ocjena + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Datum + '</td>'
            + '    <td scope="col"><button id="btnObrisiClanak-' + key + '" class="btn btn-outline-warning">Obriši</button></td>'
            + '    <td scope="col"><button id="btnAzurirajClanak-' + key + '" class="btn btn-warning">Ažuriraj</button></td>'
            + '    </tr>';
        return redak;
    }
    else if (slika == "" || ocjena == "Neocjenjeno") {
        redak = '  <tr style="background-color:red;">'
            + '    <td scope="col">' + key + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Kategirija + '</td>'
            + '    <td scope="col"> ' + '<img src="images/nemaSlike.jpg" style=" width="128" height="128"" alt="">' + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Naslov + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Opis + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Sadrzaj + '</td>' 
            + '    <td scope="col"> ' + oClanak[key].KljucneRijeci + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Autor + '</td>'
            + '    <td scope="col"> ' + ocjena + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Datum + '</td>'
            + '    <td scope="col"><button id="btnObrisiClanak-' + key + '" class="btn btn-outline-warning" disabled>Obriši</button></td>'
            + '    <td scope="col"><button id="btnAzurirajClanak-' + key + '" class="btn btn-warning">Ažuriraj</button></td>'
            + '    </tr>';
        return redak;
    }
    else if (ocjena == "Neocjenjeno") {
        redak = '  <tr>'
            + '    <td scope="col">' + key + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Kategirija + '</td>'
            + '    <td scope="col"> '  + '<img id="images_4" style="width="128" height="128">" src=" ' + slika + '" alt="...">' + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Naslov + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Opis + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Sadrzaj + '</td>'
            + '    <td scope="col"> ' + oClanak[key].KljucneRijeci + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Autor + '</td>'
            + '    <td scope="col"> ' + ocjena + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Datum + '</td>'
            + '    <td scope="col"><button id="btnObrisiClanak-' + key + '" class="btn btn-outline-warning" disabled>Obriši</button></td>'
            + '    <td scope="col"><button id="btnAzurirajClanak-' + key + '" class="btn btn-warning">Ažuriraj</button></td>'
            + '    </tr>';
        return redak;
    }
    
    else if (ocjena < "Tri") {
        redak = '  <tr style="background-color:red;">'
            + '    <td scope="col">' + key + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Kategirija + '</td>'
            + '    <td scope="col"> ' +  '<img id="images_4" style=" style=" width="128" height="128"" src=" ' +  slika + '" alt="...">' + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Naslov + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Opis + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Sadrzaj + '</td>'
            + '    <td scope="col"> ' + oClanak[key].KljucneRijeci + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Autor + '</td>'
            + '    <td scope="col"> ' + ocjena + '</td>'
            + '    <td scope="col"> ' + oClanak[key].Datum + '</td>'
            + '    <td scope="col"><button id="btnObrisiClanak-' + key + '" class="btn btn-outline-warning" >Obriši</button></td>'
            + '    <td scope="col"><button id="btnAzurirajClanak-' + key + '" class="btn btn-warning">Ažuriraj</button></td>'
            + '    </tr>';
        return redak;
    }
    
}

function ucitajClanake() {
    var oDb = firebase.database();

    var oDbClanak = oDb.ref('clanak/');


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
        document.getElementById("clanciAktualno").innerHTML = tablica;

    });
}


$("#btnAdd").click(function () {
    if (confirm("Dali ste sigurni da želite dodati novi članak?")) {
        var urlSlike = $("#images").val();
        var naslovClanka = $("#naslov").val();
        var kratkiSadrzaj = $("#opis").val();
        var tekstClanka = $("#sadrzaj").val();
        var rijeciClanka = $("#kljucneRijeci").val();
        var autorClanka = localStorage.getItem("korisnik");
        var kategorijaClanka = $("#karegorijeSelect").val();
        var datum = danasnjiDatum();

        var oDbClanak = oDb.ref('clanak/');


        oDbClanak.once('value', function (oOdgovorPosluzitelja) {
            var oClanak = oOdgovorPosluzitelja.val();
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
                firebase.database().ref('clanak/' + index).set({
                    Naslov: naslovClanka,
                    Opis: kratkiSadrzaj,
                    Sadrzaj: tekstClanka,
                    Slika: urlSlike,
                    Autor: autorClanka,
                    KljucneRijeci: rijeciClanka,
                    Datum: datum,
                    Kategirija: kategorijaClanka
                });
            }
            else {
                firebase.database().ref('clanak/' + 1).set({
                    Naslov: naslovClanka,
                    Opis: kratkiSadrzaj,
                    Sadrzaj: tekstClanka,
                    Slika: urlSlike,
                    Autor: autorClanka,
                    KljucneRijeci: rijeciClanka,
                    Datum: datum,
                    KategorijaClanka: kategorijaClanka,
                    Kategirija: kategorijaClanka
                });
            }

            $("#images").val("");
            $("#naslov").val("");
            $("#opis").val("");
            $("#sadrzaj").val("");
            $("#kljucneRijeci").val("");
            $("#autor").val("");
            $('#zatvoriFormu').trigger('click');

            ucitajClanake();
        });


        alert("Dodali ste novi članak!");
    }
    else {
        $('#zatvoriFormu').trigger('click');
        alert("Niste dodali novi članak!");
    }
});



function danasnjiDatum() {

    var d = new Date();
    var datum = d.getDate() + "." + d.getMonth() + /*1 + */"." + d.getFullYear() + ".";
    return datum;
}

$(document).on('click', '.btn-outline-warning', function () {
    if (confirm("Dali ste sigurni da želite obrisati članak?")) {
        if ($(this).attr('id').startsWith("btnObrisiClanak")) {
            var idKategorije = $(this).attr('id').replace("btnObrisiClanak-", "");
            firebase.database().ref('clanak/' + idKategorije).remove();
            ucitajClanake();
        }

        alert("Članak je obrisan!");
    }
    else {

        alert("Članak nije obrisan");
    }
});

$(document).on('click', '.btn-warning', function () {
    if ($(this).attr('id').startsWith("btnAzurirajClanak")) {
        var idClanka = $(this).attr('id').replace("btnAzurirajClanak-", "");
        var oDb = firebase.database();

        var oDbClanak = oDb.ref('clanak/' + idClanka);

        oDbClanak.once('value', function (oOdgovorPosluzitelja) {
            var oClanak = oOdgovorPosluzitelja.val();
            $('#imageAzuriranje').val(oClanak.Slika);
            $('#naslovAzuriranje').val(oClanak.Naslov);
            $('#opisAzuriranje').val(oClanak.Opis);
            $('#sadrzajAzuriranje').val(oClanak.Sadrzaj);
            $('#rijeciAzuriranje').val(oClanak.KljucneRijeci);
            $('#autorAzuriranje').val(oClanak.Autor);
            $('#idClanka').val(idClanka);
            var oDb = firebase.database();
            var oDbKategorije = oDb.ref('kategorije/');
            oDbKategorije.once('value', function (oOdgovorPosluzitelja) {
                var oKategorije = oOdgovorPosluzitelja.val();
                var kategorije = Object.keys(oOdgovorPosluzitelja.val());
                var opcije = "";
                for (var i = 0; i < kategorije.length; i++) {
                    if (parseInt(kategorije[i]) === parseInt(oClanak.Kategirija)) {
                        opcije = opcije + '<option value="' + kategorije[i] + '" selected>' + oKategorije[kategorije[i]].Naziv + '</option>';
                    } else {
                        opcije = opcije + '<option value="' + kategorije[i] + '">' + oKategorije[kategorije[i]].Naziv + '</option>';
                    }

                }
                document.getElementById("karegorijeSelectAzuriranje").innerHTML = opcije;
                $('#digniFormu').trigger('click');
            });

        });


    }
});

$("#btnAzuriranje").click(function () {
    if (confirm("Dali ste sigurni da želite napraviti promjenu na članaku?")) {
        var slika = $('#imageAzuriranje').val();
        var naslov = $('#naslovAzuriranje').val();
        var opis = $('#opisAzuriranje').val();
        var sadrzaj = $('#sadrzajAzuriranje').val();
        var rijeci = $('#rijeciAzuriranje').val();
        var autor = localStorage.getItem("korisnik");
        var id = $('#idClanka').val();

        var updates = {};
        updates['Naslov'] = naslov;
        updates['Opis'] = opis;
        updates['Sadrzaj'] = sadrzaj;
        updates['Slika'] = slika;
        updates['KljucneRijeci'] = rijeci;
        updates['Autor'] = autor;
        firebase.database().ref('clanak/' + id).update(updates);
        $('#zatvoriFormuAzuriranje').trigger('click');
        ucitajClanake();
        alert("Napravili ste promjenu na članku");
    }
    else {
        alert("Niste napravili promjenu na članku");
        $('#zatvoriFormuAzuriranje').trigger('click');
    }
}
);

