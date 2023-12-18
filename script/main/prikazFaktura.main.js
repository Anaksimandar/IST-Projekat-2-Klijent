import {radSaFakturama} from '../radSaFakturama.class.js';
import { izlistavanjeFaktura } from '../izlisatavanjeFaktura.class.js';

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava i ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
    location.reload(true);
}

let unosPretrazivanje = document.querySelector("#unos");
let prikazFaktura = document.querySelector("#prikazFaktura");
let prikazStavki = document.querySelector("#prikazStavki");

radSaFakturama.prikaz = prikazFaktura;
radSaFakturama.dostaviFakture();


$("#prikazFaktura").on("click", ".obrisiFakturu", function (e) {
    var izabranaFaktura = e.target.id;
    radSaFakturama.obrisiFakturu(izabranaFaktura);
});

$("#prikazFaktura").on("click", ".prikazStavki", function (e) {
    var idFakture = parseInt(e.target.id);
    radSaFakturama.prikazStavkiFakture(idFakture);
});


$("#filtrirajFakture").click(() => {
    var unos = $("#unos").val();
    if (unos) {
        radSaFakturama.filtrirajFakture(unos);
        $("#faktura-search-alert").attr("hidden", true);
        
    }
    else {
        $("#faktura-search-alert").attr("hidden", false);
        setTimeout(() => {
            $("#faktura-search-alert").attr("hidden", true);
        }, 3000)
        radSaFakturama.dostaviFakture()
        
    }


})