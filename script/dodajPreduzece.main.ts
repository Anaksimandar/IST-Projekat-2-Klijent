import { radSaPreduzecima } from "./radSaPreduzecima.class.js";
import { toggleAlert } from "./helper-functions/alert.js";

var proveraPIB = false;
var proveraIme = false;
var proveraPrezime = false;
var proveraNaziv = false;
var proveraUlica = false;
var proveraBroj = false;
var proveraMejl = false;
var proveraTelefon = false;

// dohvatamo sve alert elemente ne bi li kasnije manipulisali njima 

// dohvatamo sve alert elemente ne bi li kasnije manipulisali njima 
var pib = $("#pib");
var naziv = $("#naziv");
var ime = $("#ime");
var telefon = $("#telefon");
var prezime = $("#prezime");
var mejl = $("#mejl");
var ulica = $("#ulica");
var broj = $("#broj");
var alertElement = $("#proveraForme");

var pibAlert = $("#pibAlert");
var nazivAlert = $("#nazivAlert");
var imeAlert = $("#imeAlert");
var prezimeAlert = $("#prezimeAlert");
var telefonAlert = $("#telefonAlert");
var mejlAlert = $("#mailAlert");
var ulicaAlert = $("#ulicaAlert");
var brojAlert = $("#brojAlert");

// provera pib
$("#pib").keyup(() => {
    if ($("#pib").val().length != 9) {
        proveraPIB = false;
    }
    else {
        proveraPIB = true;
    }
    toggleAlert(!proveraPIB, pibAlert, "PIB mora da sadrzi 9 cifara"); // ako je validacija neuspesna, obavestenje se prikazuje

})

// provera preduzeca
$("#naziv").keyup(() => {
    var inputValue = $("#naziv").val();
    if (inputValue.length < 3 || /\d/.test(inputValue)) {
        proveraNaziv = false;

    }
    else {
        proveraNaziv = true;
    }
    toggleAlert(!proveraNaziv, nazivAlert, "Naziv preduzeca ne sme sadrzati brojeve i mora imati minimalno 3 karaktera");

})

// provera imena
$("#ime").keyup(() => {
    var inputValue = $("#ime").val();
    if (inputValue.length < 3 || /\d/.test(inputValue)) {
        proveraIme = false;
    }
    else {
        proveraIme = true;
    }
    toggleAlert(!proveraIme, imeAlert, "Ime ne sme sadrzati brojeve i mora imati minimalno 3 karaktera");

})

// provera imena
$("#prezime").keyup(() => {
    var inputValue = $("#prezime").val();
    if (inputValue.length < 3 || /\d/.test(inputValue)) {
        proveraPrezime = false;
    }
    else {
        proveraPrezime = true;
    }

    toggleAlert(!proveraPrezime, prezimeAlert, "Prezime ne sme sadrzati brojeve i mora imati minimalno 3 karaktera");

})

// provera telefona
$("#telefon").keyup(() => {
    var inputValue = $("#telefon").val();
    if (/^\+381\d{9}$/.test(inputValue) == false) {
        proveraTelefon = false;
    }
    else {
        proveraTelefon = true;
    }
    toggleAlert(!proveraTelefon, telefonAlert, "Broj telefona mora da pocinje sa +381 i sadrzi 9 cifara");

})

// provera mejla
$("#mejl").keyup(() => {
    var emailValue = $("#mejl").val();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue) == false) {
        proveraMejl = false;
    }
    else {
        proveraMejl = true;

    }
    toggleAlert(!proveraMejl, mejlAlert, "Neispravan format");

})

// provera ulice
$("#ulica").keyup(() => {
    var inputValue = $("#ulica").val();
    if (inputValue.length < 3) {
        proveraUlica = false;
    }
    else {
        proveraUlica = true;
    }
    toggleAlert(!proveraUlica, ulicaAlert, "Ulica mora da sadrzi bar 3 karaktera");

})

// provera broja ulice
$("#broj").keyup(() => {
    var inputValue = $("#broj").val();
    if (/\d/.test(inputValue) == false) {
        proveraBroj = false;
    }
    else {
        proveraBroj = true;
        
    }
    toggleAlert(!proveraBroj, brojAlert, "Broj ulice ne moze da sadrzi karaktere");

})


$("#dodajPreduzece").click((e) => {
    e.preventDefault();
    let naziv = document.querySelector("#naziv").value;
    let pib = document.querySelector("#pib").value;
    let ime = document.querySelector("#ime").value;
    let prezime = document.querySelector("#prezime").value;
    let ulica = document.querySelector("#ulica").value;
    let broj = document.querySelector("#broj").value;
    let mejl = document.querySelector("#mejl").value;
    let telefon = document.querySelector("#telefon").value;
    let alertElement: JQuery = $("#proveraForme");

    if (proveraPIB && proveraIme && proveraPrezime && proveraNaziv && proveraTelefon && proveraMejl && proveraUlica && proveraBroj) {
        radSaPreduzecima.dodajPreduzece(alertElement,naziv, pib, ime, prezime, ulica, broj, mejl, telefon);
    }
    else {
        toggleAlert(!proveraBroj, brojAlert, "Proverite podatke");
        // changeClass(show,element,success,message);
        $("#proveraForme").attr("hidden", false);
        
    }


})
