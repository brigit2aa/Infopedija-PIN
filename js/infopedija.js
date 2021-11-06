
window.addEventListener("load", f); 

function f() {
  var korisnik = localStorage.getItem("korisnik");
  ucitajNavigaciju();
  dohvatiClankeKategorije();
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
      + '      <input id="kljucnaRijec" class="form-control me-2" type="search" placeholder="Pretraži" aria-label="Search">'
      + '      <button type="button" class="btn btn-warning" id="pretrazi">Pretraži</button>'
      + '     </form>'
      + '    </div>'
      + '  </div>'
      + '</nav>';
    document.getElementById("izbornik").innerHTML = navigacija;

  });

}

function dohvatiClankeKategorije() {
  const params = new URL(location.href).searchParams;
  const idKAtegorije = params.get('idKategorije');
  dohvatClankeKategorije(idKAtegorije);
}

function dohvatClankeKategorije(idKAtegorije) {
  var oDb = firebase.database();

  var oDbClanak = oDb.ref('clanak/');


  oDbClanak.once('value', function (oOdgovorPosluzitelja) {
    var oClanak = oOdgovorPosluzitelja.val();
    var clanci = Object.keys(oOdgovorPosluzitelja.val());
    var kartice = '';
    for (var i = 0; i < clanci.length; i++) {
      kartice = kartice + kreirajKarticu(oClanak, clanci[i], idKAtegorije);
    }
    console.log(kartice);
    document.getElementById("aktualno").innerHTML = kartice;
  });

}


$(document).on('click', '.btn-warning', function () {
  if ($(this).attr('id') === 'pretrazi') {
    const params = new URL(location.href).searchParams;
    const idKategorije = params.get('idKategorije');
    var kljucnaRijec = $("#kljucnaRijec").val();
    console.log(idKategorije + " " + kljucnaRijec);
    dohvatClankeKategorijeKljucnaRijec(idKategorije, kljucnaRijec);
  } else {
    if ($(this).attr('id').startsWith('procitaj-')) {
      var idClanka = $(this).attr('id').replace("procitaj-", "");
      var oDb = firebase.database();
      var oDbClanak = oDb.ref('clanak/' + idClanka);
      oDbClanak.once('value', function (oOdgovorPosluzitelja) {
        var oClanak = oOdgovorPosluzitelja.val();
        $('#imagesModal').attr('src', oClanak.Slika);
        document.getElementById('sadrzajVijestiModal').innerHTML = oClanak.Sadrzaj;
        for(var i=1;i<=oClanak.Ocjena;i++){
          $('#'+i).attr('class',"fa fa-star checked");
        }
        $('#idClankaPrikaz').val(idClanka);
        $('#otvoriClanak').trigger('click');
      });

    }
  }
});

$(document).on('click', '.fa-star', function () {
  var ocjena = $(this).attr('id');
  var idClanka = $('#idClankaPrikaz').val();
  var updates = {};
  updates['Ocjena'] = ocjena;
  firebase.database().ref('clanak/' + idClanka).update(updates);
  for(var i=1;i<=ocjena;i++){
    $('#'+i).attr('class',"fa fa-star checked");
  }
  var brojac=parseInt(ocjena)+1;
  for(var j=brojac;j<=5;j++){
    var idZvjezdice=j;
    $('#'+idZvjezdice).attr('class',"fa fa-star");
  }

  //Dropdown umjesto zvezdica
});

function kreirajKarticu(oClanak, key, idKategorije) {

  if (parseInt(oClanak[key].Kategirija) === parseInt(idKategorije)) {
    var kartica = ' <div id="akt" class="row justify-content-center">'
      + '<div class="col-4">'
      + ' <div class="card mb-3 shadow bg-white rounded">'
      + '   <div class="row g-0" style=" with:100%;>'
      + '     <div class="col-md-4">'
      + '      <img id="images_4" style=" with: 20%;" src=" ' + oClanak[key].Slika + '" alt="...">'
      + '     </div>'
      + '      <div class="col-md-8">'
      + '        <div class="card-body">'
      + '          <h5 id="vijest-naslov" class="card-title">' + oClanak[key].Naslov + '</h5>'
      + '         <p id="opis-vijesti" class="card-text">' + oClanak[key].Opis + '</p>'
      + '         <p id="datum-vijesti" class="card-text"><small class="text-muted">' + oClanak[key].Datum + '</small></p>'
      + '        </div>'
      + '      </div>'
      + '      <button id="procitaj-' + key + '" type="button" class="btn btn-warning">'
      + '        Pročitajte više...</button></p>'
      + '  </div>'
      + ' </div>'
      + ' </div>'
      + '</div>';

    return kartica;
  }
  return "";
}



function dohvatClankeKategorijeKljucnaRijec(idKAtegorije, kljucnaRijec) {
  var oDb = firebase.database();

  var oDbClanak = oDb.ref('clanak/');

  oDbClanak.once('value', function (oOdgovorPosluzitelja) {
    var oClanak = oOdgovorPosluzitelja.val();
    var clanci = Object.keys(oOdgovorPosluzitelja.val());
    var kartice = '';
    for (var i = 0; i < clanci.length; i++) {
      var rijeci = oClanak[clanci[i]].KljucneRijeci;
      var listaRijeci = rijeci.split(",");
      for (var j = 0; j < listaRijeci.length; j++) {
        if (listaRijeci[j] === kljucnaRijec) {
          kartice = kartice + kreirajKarticu(oClanak, clanci[i], idKAtegorije);
        }
      }

    }
    console.log(kartice);
    document.getElementById("aktualno").innerHTML = kartice;
  });

}


