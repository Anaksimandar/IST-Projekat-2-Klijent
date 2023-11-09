import { radSaPreduzecima } from "../radSaPreduzecima.class.js";

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava is ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
    location.reload(true);
}

var pib = window.location.search.slice(1);

$("#pib").val(pib);
// trazimo izabrano preduzece i dodajemo podtake istog u polja

var pronadjenoPreduzece = radSaPreduzecima.getPreduzeceByPib(pib);
console.log(pronadjenoPreduzece);
var naziv = $("#naziv").val(pronadjenoPreduzece.nazivPreduzeca);
var ime = $("#ime").val(pronadjenoPreduzece.odgovornoLice.ime);
var prezime = $("#prezime").val(pronadjenoPreduzece.odgovornoLice.prezime);
var telefon = $("#telefon").val(pronadjenoPreduzece.telefon);
var mejl = $("#mejl").val(pronadjenoPreduzece.email);
var ulica = $("#ulica").val(pronadjenoPreduzece.adresa.ulica);
var broj = $("#broj").val(pronadjenoPreduzece.adresa.broj);

$("#izmeniPreduzece").click((e) => {
    e.preventDefault();
    radSaPreduzecima.izmeniPreduzece(parseInt(pib), naziv, ime, prezime, ulica, broj, mejl, telefon);
})