$("#registrirajSe").click(function () {


    var ime = $("#ime").val();
    var prezime = $("#prezime").val();
    var email = $("#registracijskiEmail").val();
    var lozinka = $("#registracijskaLozinka").val();
    console.log(ime);
    console.log(prezime);
    console.log(email);
    console.log(lozinka);

    if (confirm("Dali ste sigurni da se želite registrirati?")) {
    if (ime === "") {
        alert("Niste unjeli sve podatke");
    } else {
        
        firebase.database().ref('korisnici/' + email).set({
            Ime: ime,
            Prezime: prezime,
            Lozinka: lozinka
            
        });

        $("#ime").val("");
        $("#prezime").val("");
        $("#registracijskiEmail").val("");
        $("#registracijskaLozinka").val("");
        alert("Registrirali ste se! Vratite se na prijavu!");  
    }
    }
    else
    {
        alert("Korisnik se nije registrirao");
    }
    

});