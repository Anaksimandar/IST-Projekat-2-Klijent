var _a;
import { ajaxSettings } from "./models/ajax.model.js";
import { Validacija } from "./validacija.class.js";
export class radSaPreduzecima {
    static obrisiPreduzece(pib) {
        ajaxSettings.url += "/preduzece/" + pib;
        ajaxSettings.method = "DELETE";
        $.ajax(ajaxSettings).done((response) => {
            $(".alert").removeAttr("hidden");
            $(".alert").text(response);
            console.log(response);
            _a.dostaviPreduzeca();
        })
            .fail((err) => {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
            console.log(err);
        });
    }
    static getPreduzeceByPib(pib) {
        var pronadjenoPreduzece;
        console.log(pib);
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:5050/preduzece/" + pib,
            "method": "GET",
        }).done((response) => {
            pronadjenoPreduzece = response;
        })
            .fail((jqXHR) => {
            console.log(jqXHR);
            alert(jqXHR.responseText);
        });
        return pronadjenoPreduzece;
    }
    static izmeniPreduzece(pib, naziv, ime, prezime, ulica, broj, mejl, telefon) {
        var naziv = naziv.val();
        var ime = ime.val();
        var prezime = prezime.val();
        var telefon = telefon.val();
        var mejl = mejl.val();
        var ulica = ulica.val();
        var broj = broj.val();
        let odgovornoLice = {
            ime: ime,
            prezime: prezime
        };
        let adresa = {
            ulica: ulica,
            broj: broj,
        };
        let novoPreduzece = {
            pib: pib,
            nazivPreduzeca: naziv,
            odgovornoLice: odgovornoLice,
            adresa: adresa,
            email: mejl,
            telefon: telefon
        };
        console.log(novoPreduzece);
        if (Validacija.proveraPib(pib) == true && Validacija.proveraImena(ime) && Validacija.proveraImena(prezime)) {
            $.ajax({
                "async": false,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece/izmeni/" + pib,
                "method": "PUT",
                "data": JSON.stringify(novoPreduzece),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).done((response) => {
                $(".alert-success").removeAttr("hidden").text(response);
            })
                .fail((jqXHR, responseText) => {
                $(".alert-danger").removeAttr("hidden").text(jqXHR.responseText);
            });
        }
        else {
            $(".alert-danger").removeAttr("hidden").text("Proverite unete podatke");
        }
    }
    static filtrirajPreduzeca(unos) {
        if (unos.trim().length == 0) {
            $(".alert-info").removeAttr('hidden');
            $(".alert-info").text('Unesite parametre za pretragu');
            _a.dostaviPreduzeca();
        }
        else {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece/filtriraj/" + unos.toString(),
                "method": "GET",
            }).done((response) => {
                this.prikazPreduzeca(response);
                console.log(response);
            })
                .fail((jqXHR) => {
                $(".alert-info").removeAttr('hidden');
                console.log(jqXHR);
                $(".alert-info").text(jqXHR.responseText);
            });
        }
    }
    static prikaziBilans(pib, datum_od, datum_do, prikaz) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/bilans/" + pib + "/" + datum_od + "/" + datum_do,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        }).done((response) => {
            prikaz.html("Bilans: " + response);
            console.log(response);
        })
            .fail((jqXHR) => {
            prikaz.html(jqXHR.responseText);
        });
    }
}
_a = radSaPreduzecima;
radSaPreduzecima.prikazPreduzeca = (preduzeca) => {
    _a.prikaz.innerHTML = "";
    preduzeca.forEach(p => {
        _a.prikaz.innerHTML +=
            `
                <tr class="preduzece">
                    <th id='pib' scope="col">${p.pib}</th>
                    <th scope="col">${p.nazivPreduzeca}</th>
                    <th scope="col">${p.odgovornoLice.ime + " " + p.odgovornoLice.prezime}</th>
                    <th scope="col">${p.adresa.ulica + " " + p.adresa.broj}</th>
                    <th scope="col">${p.email}</th>
                    <th scope="col">${p.telefon}</th>
                    <th scope="col"><a href='./prikazFakturaZaPreduzece.html?${p.pib}' class="btn btn-info">Prikaz faktura</button></th>
                    <th scope="col"><button id="${p.pib}" data-toggle="modal" data-target="#prikazi_bilans" class='btn btn-info prikaziBilans'>Bilans</button></th>
                    <th scope="col"><a href='./izmeniPreduzece.html?${p.pib}' class='btn btn-info'>Izmeni</a></th>
                    <th scope="col"><button id="${p.pib}" class='btn btn-danger obrisiPreduzece'>Obrisi</button></th>
                </tr>
                `;
    });
};
radSaPreduzecima.dostaviPreduzeca = () => {
    _a.prikaz.innerHTML = "";
    ajaxSettings.method = "GET";
    ajaxSettings.url = "http://localhost:5050/preduzece";
    $.ajax(ajaxSettings)
        .done((response) => {
        _a.prikazPreduzeca(response);
    })
        .fail(err => {
        alert('Greska');
        $(".alert").removeAttr("hidden");
        $(".alert").text(err.responseText);
    });
};
radSaPreduzecima.dodajPreduzece = (naziv, pib, ime, prezime, ulica, broj, mejl, telefon) => {
    let odgovornoLice = {
        ime: ime,
        prezime: prezime
    };
    let adresa = {
        ulica: ulica,
        broj: broj
    };
    let novoPreduzece = {
        pib: pib,
        nazivPreduzeca: naziv,
        odgovornoLice: odgovornoLice,
        adresa: adresa,
        email: mejl,
        telefon: telefon
    };
    console.log(novoPreduzece);
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:5050/preduzece/dodaj",
        "method": "POST",
        "data": JSON.stringify(novoPreduzece),
        "headers": {
            "Content-Type": "application/json"
        }
    }).done((response) => {
        console.log(response);
        console.log('sve je u redu');
        $(".alert-success").removeAttr("hidden").text('Preduzece je uspesno dodato');
    })
        .fail((jqXHR) => {
        $("#proveraForme").removeAttr("hidden").text(jqXHR.responseText);
    });
};
