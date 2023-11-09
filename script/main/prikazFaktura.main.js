import {radSaFakturama} from '../radSaFakturama.class.js';
import { izlistavanjeFaktura } from '../izlisatavanjeFaktura.class.js';

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava is ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
    location.reload(true);
}

let prikazFaktura = document.querySelector("#prikazFaktura");
let prikazStavki = document.querySelector("#prikazStavki");

radSaFakturama.prikaz = prikazFaktura;
radSaFakturama.dostaviFakture();

$(".obrisiFakturu").click(function(e){
    var izabranaFaktura = e.target.id;
    radSaFakturama.obrisiFakturu(izabranaFaktura);
})

$(".prikazStavki").click(function(e){
    var idFakture = parseInt(e.target.id);
    radSaFakturama.prikazStavkiFakture(idFakture);
})

$("#filtrirajFakture").click(() => {
    var unos = $("#unos").val();
    if (unos) {
        radSaFakturama.filtrirajFakture(unos);
        $("#faktura-search-alert").attr("hidden", true);
    }
    else {
        $("#faktura-search-alert").attr("hidden", false);
        radSaFakturama.dostaviFakture()
        radSaFakturama.prikazFaktura(radSaFakturama.fakture);
    }


})