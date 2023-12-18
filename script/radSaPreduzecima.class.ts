import { Preduzece} from "./models/preduzece.model";
import { OdgovornoLice } from "./models/odgovornoLice.model";
import { Validacija } from "./validacija.class.js";
import { Adresa } from "./models/adresa.model";
import { changeClass } from "./helper-functions/alert.js";

export class radSaPreduzecima {
    static prikaz: HTMLElement;
    private static prikazPreduzeca = (preduzeca: Array<Preduzece>) => {
        this.prikaz.innerHTML = "";
        preduzeca.forEach(p => {
            this.prikaz.innerHTML +=
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
    }

    static dostaviPreduzeca = () => {
        this.prikaz.innerHTML = "";
        
        $.ajax(
            {
                "async": false,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece",
                "method": "GET"
            }
        )
            .done((response) => {
                this.prikazPreduzeca(response);
            })
            .fail(err => {
                alert('Greska')
                $(".alert").removeAttr("hidden");
                $(".alert").text(err.responseText);
            })
    }
    
    static obrisiPreduzece(pib: number) {

        $.ajax(
            {
                "async": false,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece/"+pib,
                "method": "DELETE"
            }
        ).done((response) => {
            $(".alert").removeAttr("hidden").text(response);
            setTimeout(()=>{
                $(".alert").attr("hidden","true");
            },3000)
            console.log(response);

            radSaPreduzecima.dostaviPreduzeca();
        })
        .fail((err) => {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
            console.log(err);
        })
    }

    static getPreduzeceByPib(pib: string): Preduzece {
        var pronadjenoPreduzece: Preduzece;
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
            })
        return pronadjenoPreduzece;
    }


    static izmeniPreduzece(pib: number, naziv: JQuery, ime: JQuery, prezime: JQuery, ulica: JQuery, broj: JQuery, mejl: JQuery, telefon: JQuery) {

        var naziv = naziv.val();
        var ime = ime.val();
        var prezime = prezime.val();
        var telefon = telefon.val();
        var mejl = mejl.val();
        var ulica = ulica.val();
        var broj = broj.val();
        let odgovornoLice: OdgovornoLice = {
            ime: ime,
            prezime: prezime
        }
        let adresa: Adresa = {
            ulica: ulica,
            broj: broj,
        }
        let novoPreduzece: Preduzece = {
            pib: pib,
            nazivPreduzeca: naziv,
            odgovornoLice: odgovornoLice,
            adresa: adresa,
            email: mejl,
            telefon: telefon
        }
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

                })

        }
        else {
            $(".alert-danger").removeAttr("hidden").text("Proverite unete podatke");

        }
    }

    static dodajPreduzece = (alertElement:JQuery,naziv: string, pib: number, ime: string, prezime: string, ulica: string, broj: number, mejl: string, telefon: string) => {
        let odgovornoLice: OdgovornoLice = {
            ime: ime,
            prezime: prezime
        }
        let adresa: Adresa = {
            ulica: ulica,
            broj: broj
        }
        let novoPreduzece: Preduzece = {
            pib: pib,
            nazivPreduzeca: naziv,
            odgovornoLice: odgovornoLice,
            adresa: adresa,
            email: mejl,
            telefon: telefon
        }
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
        })
        .done((response) => {
            console.log(response);
            console.log('sve je u redu');
            changeClass(alertElement,'alert-success','Preduzece je uspesno dodato',true);

        })
        .fail((jqXHR) => {
            changeClass(alertElement, 'alert-danger', jqXHR.responseText,true);
        })
    }

    static filtrirajPreduzeca(unos: string) {
        if (unos.trim().length == 0) {
            $(".alert-info").removeAttr('hidden').text('Unesite parametre za pretragu');;
            setTimeout(()=>{
                $(".alert-info").attr("hidden",true);
            },3000)
            radSaPreduzecima.dostaviPreduzeca();
        }
        else {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `http://localhost:5050/preduzece/filtriraj?unos=${encodeURIComponent(unos)}`,
                "method": "GET",

            }).done((response) => {
                this.prikazPreduzeca(response);
                console.log(response);

            })
            .fail((jqXHR) => {
                alert('radil')
                $(".alert-info").removeAttr('hidden');
                $(".alert-info").text(jqXHR.responseText);
            })
        }


    }
    static prikaziBilans(pib: number, datum_od: string, datum_do: string, prikaz: JQuery) {
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
            prikaz.html(jqXHR.responseText)
        })
    }


}