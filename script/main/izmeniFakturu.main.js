import { radSaFakturama } from "../radSaFakturama.class.js";
import { Validacija } from "../validacija.class.js";
import {radSaStavkamaFakture} from '../radSaStavkamaFakture.class.js'

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava is ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
    location.reload(true);
}

var pib = window.location.search.slice(1);
var prikaz = document.querySelector("#prikazStavki");
var ukupno = $("#ukupno");
// vraca izabranu fakturu i pupunjava polja 
var idFakture = window.location.search.slice(1);

var pronadjenaFaktura = radSaFakturama.getFakturaById(idFakture);

radSaStavkamaFakture.prikazUkupno = ukupno;
radSaStavkamaFakture.prikaz = prikaz;
radSaStavkamaFakture.stavke = pronadjenaFaktura.stavkeFakture;
radSaStavkamaFakture.prikazStavki();

$(".obrisiStavku").click(function (event){
    event.preventDefault();
    let id = event.target.id;
    radSaStavkamaFakture.ukloniStavku(id);    
})


// validacija unosa
// pretpostvaljamo da su pocetni podaci u korektnom formatu
var proveraPibKupuje = true;
var proveraPibProdaje = true;
var proveraDatum = true;

// provera stavki

var proveraNazivStavke = false;
var proveraCenaStavke = false;
var proveraJedinicaStavke = false;
var proveraKolicina = false;

// provera pib prodaje
$("#pibProdaje").keyup(() => {
    if ($("#pibProdaje").val().length != 9) {
        $("#pibProdajeAlert").attr("hidden", false);
        proveraPibProdaje = false;
    }
    else {
        $("#pibProdajeAlert").attr("hidden", true);
        proveraPibProdaje = true;
    }
})

// provera pib kupuje
$("#pibKupuje").keyup(() => {
    if ($("#pibKupuje").val().length != 9) {
        $("#pibKupujeAlert").attr("hidden", false);
        proveraPibKupuje = false;
    }
    else {
        $("#pibKupujeAlert").attr("hidden", true);
        proveraPibKupuje = true;
    }
})

//provera datuma

$("input[type=date]").change(() => {
    var datum1 = new Date($("#datumGenerisanja").val());
    var datum2 = new Date($("#datumValute").val());

    if (datum2 <= datum1) {
        $("#datumAlert").attr("hidden", false);
        proveraDatum = false;
    }
    else {
        $("#datumAlert").attr("hidden", true);
        proveraDatum = true;
    }
})



// provera naziva stavke
$("#naziv").keyup(() => {
    if ($("#naziv").val().length < 2) {
        $("#nazivStavkeAlert").attr("hidden", false);
        proveraNazivStavke = false;
    }
    else {
        $("#nazivStavkeAlert").attr("hidden", true);
        proveraNazivStavke = true;
    }
})

// provera cene stavke
$("#cena").keyup(() => {
    if ($("#cena").val().length == 0) {
        $("#cenaStavkeAlert").attr("hidden", false);
        proveraCenaStavke = false;
    }
    else {
        $("#cenaStavkeAlert").attr("hidden", true);
        proveraCenaStavke = true;
    }
})

// provera kolicine stavke
$("#kolicina").keyup(() => {
    if ($("#kolicina").val().length == 0) {
        $("#kolicinaStavkeAlert").attr("hidden", false);
        proveraKolicina = false;
    }
    else {
        $("#kolicinaStavkeAlert").attr("hidden", true);
        proveraKolicina = true;
    }
})

// provera jedinice mere stavke
$("#jedinicaMere").keyup(() => {
    if ($("#jedinicaMere").val().length == 0) {
        $("#jedinicaStavkeAlert").attr("hidden", false);
        proveraJedinicaStavke = false;
    }
    else {
        $("#jedinicaStavkeAlert").attr("hidden", true);
        proveraJedinicaStavke = true;
    }
})



// dodavanje vrednosti izabrane fakture input poljima 

// dodavanje stavki u fakturu
$("#pibProdaje").val(pronadjenaFaktura.pibPreduzeceProdaje);
$("#pibKupuje").val(pronadjenaFaktura.pibPreduzeceKupuje);

console.log(pronadjenaFaktura);
var datumGenerisanja = $("#datumGenerisanja").val(Validacija.kraciZapisDatuma(pronadjenaFaktura.datumGenerisanja));
var datumValute = $("#datumValute").val(Validacija.kraciZapisDatuma(pronadjenaFaktura.datumValute));

var tipFakture = $("#tipFakture");

if (pronadjenaFaktura.tipFakture == "ulazna") {
    tipFakture.val("ulazna");
}
else {
    tipFakture.val("izlazna");
}
console.log(pronadjenaFaktura);

// rad sa stavkama

$("#dodajStavku").click(e => {
    e.preventDefault();
    var nazivStavke = $("#naziv").val();
    var cena = $("#cena").val();
    var jedinicaMere = $("#jedinicaMere").val();
    var kolicina = $("#kolicina").val();
    if (proveraCenaStavke && proveraJedinicaStavke && proveraNazivStavke && proveraKolicina) {
        radSaStavkamaFakture.dodajStavku(nazivStavke, parseInt(cena), parseInt(kolicina), jedinicaMere);
        $("#stavkaAlert").attr("hidden", true);
    }
    else {
        $("#stavkaAlert").attr("hidden", false);
    }
})



// azuriranje fakuture

$("#dodajFakturu").click(function (e) {
    e.preventDefault();
    if (proveraDatum && proveraPibKupuje && proveraPibProdaje && radSaStavkamaFakture.stavke.length > 0) {
        var datumValute = $("#datumValute").val();
        var datumGenerisanja = $("#datumGenerisanja").val();
        var pibProdaje = $("#pibProdaje").val();
        var pibKupuje = $("#pibKupuje").val();
        var tipFakture = $("#tipFakture").val();
        var ukupno = $("#ukupno").val();
        var stavke = document.querySelectorAll("#stavka");
        console.log(stavke);
        radSaFakturama.izmeniFakturu(parseInt(pib), parseInt(pibKupuje), parseInt(pibProdaje), datumValute, datumGenerisanja, stavke, tipFakture)
    }
    else {
        console.log(proveraDatum, radSaStavkamaFakture.stavke.length > 0, proveraPibKupuje, proveraPibProdaje);
        $("#neuspesnoDodavanjeFakture").attr("hidden", false).text("Proverite podatke");
    }
})