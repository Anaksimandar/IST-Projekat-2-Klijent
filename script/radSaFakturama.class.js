var _a;
import { izlistavanjeFaktura } from "./izlisatavanjeFaktura.class.js";
import { ajaxSettings } from "./models/ajax.model.js";
import { Validacija } from "./validacija.class.js";
export class radSaFakturama {
    // Potrebno je prikazati fakture po strani (jedna faktura jedna strana) kao i pretrazivanje po 
    // iznosu fakture i po stavkama fakture
    static vratiSveFakturePreduzeca() {
        //let fakture:Faktura[] = [];
        ajaxSettings.url += '/faktura/preduzece/" + radSaFakturama.PIB';
        $.ajax(ajaxSettings).done((response) => {
            izlistavanjeFaktura.fakture = response;
        })
            .fail((jqXHR) => {
            izlistavanjeFaktura.prikaz.innerHTML = "";
            izlistavanjeFaktura.fakture = [];
            izlistavanjeFaktura.prikazFakture();
            $(".alert-warning").removeAttr('hidden');
            $(".alert-warning").text(jqXHR.responseText);
        });
    }
    static prikazFaktura(fakture) {
        this.prikaz.innerHTML = "";
        console.log("prikaz", fakture);
        fakture.forEach(f => {
            var datumValute = Validacija.kraciZapisDatuma(f.datumValute.toString());
            var datumGenerisanja = Validacija.kraciZapisDatuma(f.datumGenerisanja.toString());
            this.prikaz.innerHTML +=
                `
                <tr>
                    <th scope="col">${f.pibPreduzeceProdaje}</th>
                    <th scope="col">${f.pibPreduzeceKupuje}</th>
                    <th scope="col">${datumGenerisanja}</th>
                    <th scope="col">${datumValute}</th>
                    <th scope="col"><button id="${f.idFakture}" data-toggle="modal" data-target="#modal" class="btn btn-info btn-sm prikazStavki">Prikazi stavke</button></th>
                    <th scope="col">${f.ukupno}</th>
                    <th scope="col">${f.tipFakture}</th>
                    <th scope="col"><a href='izmeniFakturu.html?${f.idFakture}'class="btn btn-info">Izmeni</a></th>
                    <th scope="col"><a id="${f.idFakture}" href="prikazFaktura.html" class='btn btn-danger obrisiFakturu'>Obriši</a></th>
                </tr>
                `;
        });
    }
    // Moguce ponavljanje koda radSaStavkama.prikazStavki
    static prikazStavkiFakture(idFakture) {
        ajaxSettings.url = "http://localhost:5050/faktura/stavke/" + idFakture;
        ajaxSettings.method = "GET";
        $.ajax(ajaxSettings)
            .done((response) => {
            $("#prikazStavki").html("");
            response.forEach(s => {
                $("#prikazStavki").append(`
                        <tr id="stavka">
                            <th scope="col">${s.naziv}</th>
                            <th scope="col">${s.cena}</th>
                            <th scope="col">${s.jedinicaMere}</th>
                            <th scope="col">${s.kolicina}</th>
                        </tr>
                    `);
            });
        })
            .fail(err => {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        });
    }
    static obrisiFakturu(idFakture) {
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/" + idFakture,
            "method": "DELETE",
        }).done((response) => {
            $("#uspesnoBrisanjeFaktureAlert").removeAttr("hidden");
            $("#uspesnoBrisanjeFaktureAlert").text("Faktura je uspesno obrisana");
            this.fakture = response;
        })
            .fail((err) => {
            $(".alert-warning").removeAttr("hidden");
            $(".alert-warning").text(err.responseText);
        });
    }
    static izmeniFakturu(idFakture, pibPreduzecaKupuje, pibPreduzecaProdaje, datumValute, datumGenerisanja, elementi, tipFakture) {
        let listaStavki = [];
        let ukupno = Number($("#ukupno").val());
        elementi.forEach(e => {
            let deca = e.children;
            var id = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka = {
                "idStavke": id,
                "naziv": naziv,
                "cena": cena,
                "jedinicaMere": jedinicaMere,
                "kolicina": kolicina
            };
            listaStavki.push(novaStavka);
        });
        let novaFaktura = {
            idFakture: idFakture,
            pibPreduzeceKupuje: pibPreduzecaKupuje,
            pibPreduzeceProdaje: pibPreduzecaProdaje,
            datumGenerisanja: new Date(datumGenerisanja),
            datumValute: new Date(datumValute),
            stavkeFakture: listaStavki,
            ukupno: ukupno,
            tipFakture: tipFakture
        };
        console.log(novaFaktura);
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/izmeni/" + idFakture,
            "method": "PUT",
            "data": JSON.stringify(novaFaktura),
            "headers": {
                "Content-Type": "application/json"
            }
        }).done((response) => {
            console.log(response);
            $("#obavestenjeDodavanjeFaktureUspesno").removeAttr("hidden");
            $("#obavestenjeDodavanjeFaktureUspesno").text("Faktura je uspesno izmenjena");
        })
            .fail((jqXHR) => {
            $("#obavestenjeDodavanjeFaktureGreska").removeAttr("hidden");
            $("#obavestenjeDodavanjeFaktureGreska").text(jqXHR.responseText);
        });
    }
    static getFakturaById(id) {
        var pronadjenaFaktura;
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/" + id,
            "method": "GET",
        }).done((response) => {
            pronadjenaFaktura = response;
        })
            .fail((jqXHR, responseText) => {
            alert("Faktura ne postoji" + responseText);
        });
        return pronadjenaFaktura;
    }
    static dodajFakturu(pibPreduzecaKupuje, pibPreduzecaProdaje, datumValute, datumGenerisanja, elementi, tipFakture) {
        let listaStavki = [];
        let formatiranDatumValute = Validacija.stringToDate(datumValute);
        let formatiranDatumGenerisanja = Validacija.stringToDate(datumGenerisanja);
        let proveraPibPreduzecaKupuje = Validacija.proveraPib(pibPreduzecaKupuje);
        let proveraPibPreduzecaProdaje = Validacija.proveraPib(pibPreduzecaProdaje);
        console.log(proveraPibPreduzecaKupuje);
        console.log(proveraPibPreduzecaProdaje);
        let ukupno = Number($("#ukupno").val());
        elementi.forEach(e => {
            let deca = e.children;
            var id = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka = {
                "idStavke": id,
                "naziv": naziv,
                "cena": cena,
                "jedinicaMere": jedinicaMere,
                "kolicina": kolicina
            };
            listaStavki.push(novaStavka);
        });
        if (proveraPibPreduzecaKupuje && proveraPibPreduzecaProdaje) {
            let novaFaktura = {
                idFakture: 1,
                pibPreduzeceKupuje: pibPreduzecaProdaje,
                pibPreduzeceProdaje: pibPreduzecaKupuje,
                datumGenerisanja: formatiranDatumGenerisanja,
                datumValute: formatiranDatumValute,
                stavkeFakture: listaStavki,
                ukupno: ukupno,
                tipFakture: tipFakture
            };
            console.log(novaFaktura);
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/faktura/dodaj",
                "method": "POST",
                "data": JSON.stringify(novaFaktura),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).done((jqXHR) => {
                $("#obavestenjeDodavanjeFaktureUspesno").removeAttr('hidden').text(jqXHR);
            })
                .fail((jqXHR) => {
                console.log(jqXHR);
                $("#obavestenjeDodavanjeFaktureGreska").removeAttr('hidden').text(jqXHR.responseText);
            });
        }
        else {
            $("#pib_neuspesno").removeAttr('hidden');
            $("#pib_uspesno").attr('hidden', 'true');
        }
    }
    static filtrirajFakture(unos) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/filtriraj/" + unos.toString(),
            "method": "GET"
        }).done((response) => {
            _a.filtriraneFakture = response;
            _a.prikazFaktura(_a.filtriraneFakture);
        })
            .fail((jqXHR) => {
            console.log(jqXHR);
        });
    }
}
_a = radSaFakturama;
radSaFakturama.fakture = [];
radSaFakturama.filtriraneFakture = [];
radSaFakturama.dostaviFakture = () => {
    ajaxSettings.url = "http://localhost:5050/faktura";
    $.ajax(ajaxSettings)
        .done((response) => {
        console.log(response);
        _a.prikazFaktura(response);
    })
        .fail((err) => {
        $(".alert").removeAttr("hidden");
        $(".alert").text(err.responseText);
    });
};
