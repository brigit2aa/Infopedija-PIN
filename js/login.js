$("#prijaviSe").click(function () {

    var email = $("#email").val();
    var password = $("#password").val();
    var oDb = firebase.database();
    var oDbKategorije = oDb.ref('korisnici/' + email);
    oDbKategorije.once('value', function (oOdgovorPosluzitelja) {
        var oKategorije = oOdgovorPosluzitelja.val();
       
        if (oKategorije !== null) {
            var passwordIzBaze = oKategorije["Lozinka"];

            if (passwordIzBaze === password) {
                /* var korisnik={
                     "email":email,
                     "ime":oKategorije["Ime"],
                     "prezime":oKategorije["Prezime"]
                 }*/
                localStorage.setItem("korisnik", oKategorije["Ime"]+" "+oKategorije["Prezime"]);
                window.location.href = "http://localhost/Popravak/MojaStranica/infopedija.html";
            } else {
                alert("Unjeli ste pogrešnu lozinku");
            }
        }
        else {
            alert("Ne postoji korisnik s navedenim emailom");
        }
        console.log(oKategorije);

    });
alert("Uspješno ste se prijavili!");
}
);
