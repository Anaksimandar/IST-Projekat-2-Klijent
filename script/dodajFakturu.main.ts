import { radSaStavkamaFakture } from './radSaStavkamaFakture.class.js';
import { radSaFakturama } from './radSaFakturama.class.js';
import { toggleAlert, changeClass } from './helper-functions/alert.js';
import { FormMenadzer } from './helper-functions/formManager.js';
import { FakturaForm,FakturaValidation } from './models/formInterface/FakturaForm.js';
import { PreduzeceValidation } from './models/formInterface/PreduzeceForm.js';
import { FakturaAlert } from './models/formInterface/FakturaAlert.js';

// validacija unosa
var proveraPibKupuje = false;
var proveraPibProdaje = false;
var proveraDatum = false;
// provera stavki
var proveraNazivStavke = false;
var proveraCenaStavke = false;
var proveraJedinicaStavke = false;
var proveraKolicina = false;

// provera pib prodaje
var alertPibProdaje = $("#pibProdajeAlert");
var alertPibKupuje = $("#pibKupujeAlert");
var datumAlert = $("#datumAlert");
var nazivStavkeAlert = $("#nazivStavkeAlert");
var kolicinaStavkeAlert = $("#kolicinaStavkeAlert");
var cenaStavkeAlert = $("#cenaStavkeAlert");
var jedinicaMereStavkeAlert = $("#jedinicaMereStavkeAlert");

var prikazStavki:JQuery = $("#prikazStavki");
var prikazUkupno: JQuery = $("#ukupno");
radSaStavkamaFakture.prikaz = prikazStavki;
radSaStavkamaFakture.prikazUkupno = prikazUkupno;



const ElementiFormeFakture:FakturaForm = 
    {
        pibProdaje: $("#pibProdaje"),
        pibKupuje: $("#pibKupuje"),
        datumGenerisanja: $("#datumGenerisanja"),
        datumValute: $("#datumValute"),
        nazivStavke: $("#nazivStavke"),
        cenaStavke: $("#cenaStavke"),
        kolicinaStavke: $("#kolicinaStavke"),
        jedinicaStavke: $("#jedinicaStavke") 
    };
    
const validacijaElemenata:FakturaValidation | PreduzeceValidation = {
    pibProdaje: false,
    pibKupuje: false,
    datumGenerisanja: false,
    datumValute: false,
    nazivStavke: false,
    cenaStavke: false,
    kolicinaStavke: false,
    jedinicaStavke: false
}

const alertElementi:FakturaAlert = {
    pibProdaje: $("#pibProdajeAlert"),
    pibKupuje: $("#pibKupujeAlert"),
    datumGenerisanja: $("#datumAlert"),
    datumValute: $("#datumAlert"),
    nazivStavke: $("#nazivStavkeAlert"),
    cenaStavke: $("#cenaStavkeAlert"),
    kolicinaStavke: $("#kolicinaStavkeAlert"),
    jedinicaStavke: $("#jedinicaStavkeAlert")
}

const menadzerForme = new FormMenadzer(ElementiFormeFakture, validacijaElemenata,alertElementi);
const fakturaInputList = $(".form-control");
console.log(fakturaInputList);
fakturaInputList.on('input', (e) => {
    let nazivElementa = e.target.id;
    console.log(nazivElementa);
    
    let izabranElement = menadzerForme.getElementByName(nazivElementa);
    console.log(izabranElement.val());
    
    // validacija elementa
    const [isElementValid,message,elementAlert] = menadzerForme.validateElement(izabranElement);
    console.log(isElementValid,message,elementAlert);
    
    toggleAlert(!isElementValid, elementAlert,message);
});




// $("#pibProdaje").keyup(() => {
//     if ($("#pibProdaje").val().length != 9) {
//         proveraPibProdaje = false;
//     }
//     else {
//         proveraPibProdaje = true;
//     }

//     toggleAlert(!proveraPibProdaje, alertPibProdaje, "PIB mora da sadrzi 9 cifara");
// });
// provera pib kupuje

//provera datuma
$("input[type=date]").change(() => {
    var datum1 = new Date($("#datumGenerisanja").val());
    var datum2 = new Date($("#datumValute").val());
    if (datum2 < datum1) {
        $("#datumAlert").attr("hidden", false);
        proveraDatum = false;
    }
    else {
        $("#datumAlert").attr("hidden", true);
        proveraDatum = true;
    }
    toggleAlert(!proveraDatum, datumAlert, "Datum valute ne moze biti pre datuma generisanja fakture");
});

// provera cene stavke
$("#cena").keyup(() => {
    if ($("#cena").val().length == 0) {
        proveraCenaStavke = false;
    }
    else {
        proveraCenaStavke = true;
    }
    toggleAlert(!proveraCenaStavke, cenaStavkeAlert, "Ovo polje ne sme biti prazno");
});
// provera kolicine stavke
$("#kolicina").keyup(() => {
    if ($("#kolicina").val().length == 0) {
        proveraKolicina = false;
    }
    else {
        proveraKolicina = true;
    }
    toggleAlert(!proveraKolicina, kolicinaStavkeAlert, "Ovo polje ne sme biti prazno");

});
// provera jedinice mere stavke
$("#jedinicaMere").keyup(() => {
    if ($("#jedinicaMere").val().length == 0) {
        proveraJedinicaStavke = false;
    }
    else {
        proveraJedinicaStavke = true;
    }
    toggleAlert(!proveraJedinicaStavke, jedinicaMereStavkeAlert, "Ovo polje ne sme biti prazno");

});

$("#dodajStavku").click((e) => {
    e.preventDefault();
    if (proveraCenaStavke && proveraJedinicaStavke && proveraNazivStavke && proveraKolicina) {
        let naziv = $("#naziv").val();
        let cena = parseInt($("#cena").val());
        let kolicina = parseInt($("#kolicina").val());
        let jedinicaMere = $("#jedinicaMere").val();
        //let ukupno = document.querySelector("#ukupno");
        radSaStavkamaFakture.dodajStavku(naziv, cena, kolicina, jedinicaMere);
    }
    else {
        changeClass($("#stavkaAlert"), "alert-danger", "Proverite unete podatke", true);
    }
});
$(".btn btn-danger").on('click', (e) => {
    e.preventDefault();
});
$("#dodajFakturu").on('click', (e) => {
    let dodajFakturuAlert: JQuery = $("#dodajFakturuAlert");
    e.preventDefault();
    if (proveraPibKupuje && proveraPibProdaje && proveraDatum && proveraCenaStavke && proveraJedinicaStavke && proveraKolicina && proveraNazivStavke) {
        let elementi = document.querySelectorAll("#stavka");
        let pibPreduzecaKupuje = document.querySelector("#pibKupuje").value;
        let pibPreduzecaProdaje = document.querySelector("#pibProdaje").value;
        let datumValute = document.querySelector("#datumValute").value;
        let datumGenerisanja = document.querySelector("#datumGenerisanja").value;
        let tipFakture = document.querySelector("#tipFakture").value;
        radSaFakturama.dodajFakturu(dodajFakturuAlert,pibPreduzecaKupuje, pibPreduzecaProdaje, datumValute, datumGenerisanja, elementi, tipFakture);
    }
    else {
        changeClass(dodajFakturuAlert,'alert-danger','Proverite unete podatke',true);
    }
});

// obrisi stavku
prikazStavki.on("click", ".obrisiStavku", (e) => {
    e.preventDefault();
    let id = e.target.id;
    radSaStavkamaFakture.ukloniStavku(parseInt(id));
});


