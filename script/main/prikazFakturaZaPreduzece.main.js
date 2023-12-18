import { izlistavanjeFaktura } from "../izlisatavanjeFaktura.class.js";
import {radSaFakturama} from "../radSaFakturama.class.js"
import { Validacija } from "../validacija.class.js";

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava is ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
    location.reload(true);
}

var pib = location.search.substring(1);
var prikazFakture = document.querySelector("#prikazFaktura");
var ispis = document.querySelector("#prikazStavki");
var brojStrane = document.querySelector("h4");
var rezultatiPretrage = document.querySelector("#rezultatiPretrage");
var prikazStranica = document.querySelector("#prikazStranica");
var navigacioniMeni = document.querySelector("#pagination-navigation");

izlistavanjeFaktura.navigationMenu = navigacioniMeni;
izlistavanjeFaktura.rezultatiPretragePrikaz = rezultatiPretrage;
izlistavanjeFaktura.prikazStranica = prikazStranica;
izlistavanjeFaktura.prikaz = prikazFakture;
izlistavanjeFaktura.PIB = parseInt(pib);
izlistavanjeFaktura.dostaviFakture();

$("#prikazFaktura").on("click", ".obrisiFakturu", function (e) {
    var izabranaFaktura = e.target.id;
    radSaFakturama.obrisiFakturu(izabranaFaktura);
    izlistavanjeFaktura.dostaviFakture();
});

$("#prikazFaktura").on("click", ".prikazStavki", function (e) {
    var idFakture = parseInt(e.target.id);
    console.log(idFakture, 'id fakture');

    radSaFakturama.prikazStavkiFakture(idFakture);
});

$("#pretraga").on("click",()=>{
    var unos = $("#unos").val();
    if(unos){
        izlistavanjeFaktura.filtrirajFakture(unos)
    }
    else{
        $("#faktura-search-alert").attr("hidden", false).text("Unesite iznos fakture ili naziv stavke");
        setTimeout(()=>{
            $("#faktura-search-alert").attr("hidden", true).text("Unesite iznos fakture ili naziv stavke");
        },3000)

    }
    
})

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
    if (izlistavanjeFaktura.brojStrane - 1 > 0) {
        izlistavanjeFaktura.brojStrane--;
        izlistavanjeFaktura.dostaviFakture();
    }
})


$("#next").click(() => {
    console.log(izlistavanjeFaktura.brojStrana);
    console.log(izlistavanjeFaktura.brojStrane);
    if (izlistavanjeFaktura.brojStrane + 1 <= izlistavanjeFaktura.brojStrana) {
        izlistavanjeFaktura.brojStrane++;
        izlistavanjeFaktura.dostaviFakture();
    } 
})
