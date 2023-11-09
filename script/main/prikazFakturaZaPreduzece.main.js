import { radSaPreduzecima } from "../radSaPreduzecima.class.js";
import { Validacija } from "../validacija.class.js";

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava is ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
    location.reload(true);
}

var pib = location.search.substring(1);
var prikazFakture = document.querySelector("#prikazFakture");
var ispis = document.querySelector("#prikazStavki");
var brojStrane = document.querySelector("h4");
var rezultatiPretrage = document.querySelector("#rezultatiPretrage");
var prikazStranica = document.querySelector("#prikazStranica");

$("#prethodna").click(() => {
    Validacija.izlistavanjeFaktura.prethodnaStrana();
})

$("#sledeca").click(() => {
    Validacija.izlistavanjeFaktura.sledecaStrana();
})

izlistavanjeFaktura.rezultatiPretragePrikaz = rezultatiPretrage;
izlistavanjeFaktura.prikazStranica = prikazStranica;
izlistavanjeFaktura.prikaz = prikazFakture;
izlistavanjeFaktura.PIB = parseInt(pib);
izlistavanjeFaktura.dostaviFakture();
izlistavanjeFaktura.prikazFakture();

// PomocneFunkcije.oznaciAktivnuStranu(brojStrane) => forEach (sveStrane) if id == trenutna this.class = active else this.rmClass = active

// vazno je obratiti paznju da nije moguce raditi sa elementom koji jos nije renderovan, u ovom slucaju broj stranice
// $(".page-link").click(function () { // if we use arrow functions this doesnt work
//   //$(this).addClass("active");
//   console.log($(this));
//   izlistavanjeFaktura.brojStrane = $(this).attr("id");
//   izlistavanjeFaktura.dostaviFakture(pib);
//   izlistavanjeFaktura.prikazFakture();


// })


$("#previous").click(() => {
    if (izlistavanjeFakture.brojStrane) {
        
    }
})


$("#next").click(() => {
    alert('++')
})
