var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var settingsGET = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5050",
    "method": "GET"
};
var radSaPreduzecima = /** @class */ (function () {
    function radSaPreduzecima() {
    }
    radSaPreduzecima.obrisiPreduzece = function (pib) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/preduzece/" + pib,
            "method": "DELETE"
        }).done(function (response) {
            $(".alert").removeAttr("hidden");
            $(".alert").text(response);
            console.log(response);
            radSaPreduzecima.dostaviPreduzeca();
        })
            .fail(function (err) {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
            console.log(err);
        });
    };
    radSaPreduzecima.getPreduzeceByPib = function (pib, pibPolje, naziv, ime, prezime, mail, ulica, broj, telefon) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/preduzece/" + pib,
            "method": "GET"
        }).done(function (response) {
            console.log(response);
            pibPolje.value = response.pib;
            naziv.value = response.nazivPreduzeca;
            ime.value = response.odgovornoLice.ime;
            prezime.value = response.odgovornoLice.prezime;
            telefon.value = response.telefon;
            mail.value = response.email;
            ulica.value = response.adresa.ulica;
            broj.value = response.adresa.broj;
        })
            .fail(function (err) {
            console.log(err);
        });
    };
    radSaPreduzecima.izmeniPreduzece = function (pib, noviPib, naziv, ime, prezime, ulica, broj, mejl, telefon) {
        var odgovornoLice = {
            ime: ime,
            prezime: prezime
        };
        var adresa = {
            ulica: ulica,
            broj: broj
        };
        var novoPreduzece = {
            pib: noviPib,
            nazivPreduzeca: naziv,
            odgovornoLice: odgovornoLice,
            adresa: adresa,
            email: mejl,
            telefon: telefon
        };
        console.log(novoPreduzece);
        if (Validacija.proveraPib(pib) == true && Validacija.proveraPib(noviPib) == true && Validacija.proveraImena(ime) && Validacija.proveraImena(prezime)) {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece/" + pib,
                "method": "PUT",
                "data": JSON.stringify(novoPreduzece),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).done(function (response) {
                $(".alert-success").removeAttr("hidden").text(response);
            })
                .fail(function (jqXHR, responseText) {
                $(".alert-danger").removeAttr("hidden").text(jqXHR.responseText);
            });
        }
        else {
            $(".alert-danger").removeAttr("hidden").text("Proverite unete podatke");
        }
    };
    radSaPreduzecima.filtrirajPreduzeca = function (unos) {
        var _this = this;
        if (unos.trim().length == 0) {
            $(".alert-info").removeAttr('hidden');
            $(".alert-info").text('Unesite parametre za pretragu');
            radSaPreduzecima.dostaviPreduzeca();
        }
        else {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece/filtriraj/" + unos.toString(),
                "method": "GET"
            }).done(function (response) {
                _this.prikazPreduzeca(response);
                console.log(response);
            })
                .fail(function (jqXHR) {
                $(".alert-info").removeAttr('hidden');
                console.log(jqXHR);
                $(".alert-info").text(jqXHR.responseText);
            });
        }
    };
    radSaPreduzecima.prikaziBilans = function (pib, datum_od, datum_do, prikaz) {
        if (datum_do == "" || datum_od == "") {
            $(".alert-info").removeAttr("hidden");
            $(".alert-info").text("Unesite datum");
        }
        else {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/faktura/bilans/" + pib + "/" + datum_od + "/" + datum_do,
                "method": "GET"
            }).done(function (response) {
                prikaz.innerHTML = "Bilans za zeljeni period je:" + response;
            })
                .fail(function (jqXHR) {
                $(".alert-info").removeAttr('hidden');
                console.log(jqXHR);
                alert(jqXHR.responseText);
                $(".alert-info").text(jqXHR.responseText);
            });
        }
    };
    var _a;
    _a = radSaPreduzecima;
    radSaPreduzecima.prikazPreduzeca = function (preduzeca) {
        _a.prikaz.innerHTML = "";
        preduzeca.forEach(function (p) {
            _a.prikaz.innerHTML +=
                "\n                <tr>\n                    <th id='pib' scope=\"col\">".concat(p.pib, "</th>\n                    <th scope=\"col\">").concat(p.nazivPreduzeca, "</th>\n                    <th scope=\"col\">").concat(p.odgovornoLice.ime + " " + p.odgovornoLice.prezime, "</th>\n                    <th scope=\"col\">").concat(p.adresa.ulica + " " + p.adresa.broj, "</th>\n                    <th scope=\"col\">").concat(p.email, "</th>\n                    <th scope=\"col\">").concat(p.telefon, "</th>\n                    <th scope=\"col\"><a href='./prikazFakturaZaPreduzece.html?").concat(p.pib, "' class=\"btn btn-info\">Prikaz faktura</button></th>\n                    <th scope=\"col\"><button data-toggle=\"modal\" data-target=\"#prikazi_bilans\" class='btn btn-info'>Bilans</button></th>\n                    <th scope=\"col\"><a href='./izmeniPreduzece.html?").concat(p.pib, "' class='btn btn-info'>Izmeni</a></th>\n                    <th scope=\"col\"><button id=\"obrisiPreduzece\" onclick='radSaPreduzecima.obrisiPreduzece(").concat(p.pib, ")' class='btn btn-danger'>Obrisi</button></th>\n                </tr>\n                ");
        });
    };
    radSaPreduzecima.dostaviPreduzeca = function () {
        _a.prikaz.innerHTML = "";
        settingsGET.url = "http://localhost:5050/preduzece";
        $.ajax(settingsGET)
            .done(function (response) {
            _a.prikazPreduzeca(response);
        })
            .fail(function (err) {
            alert('Greska');
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        });
    };
    radSaPreduzecima.dodajPreduzece = function (naziv, pib, ime, prezime, ulica, broj, mejl, telefon) {
        var odgovornoLice = {
            ime: ime,
            prezime: prezime
        };
        var adresa = {
            ulica: ulica,
            broj: broj
        };
        var novoPreduzece = {
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
        }).done(function (response) {
            console.log(response);
            console.log('sve je u redu');
            $(".alert-success").removeAttr("hidden").text('Preduzece je uspesno dodato');
        })
            .fail(function (jqXHR, responseText) {
            console.log('Doslo je do greske' + responseText);
            $("#proveraForme").removeAttr("hidden").text(jqXHR.responseText);
        });
    };
    return radSaPreduzecima;
}());
var izlistavanjeFaktura = /** @class */ (function () {
    function izlistavanjeFaktura() {
    }
    //static brojStrana:number = 0;
    izlistavanjeFaktura.postojeStrane = function () {
        if (izlistavanjeFaktura.fakture.length == 0) {
            return false;
        }
        return true;
    };
    ;
    izlistavanjeFaktura.sledecaStrana = function () {
        if (izlistavanjeFaktura.postojeStrane() == true) {
            if (izlistavanjeFaktura.trenutnaStrana + 1 > izlistavanjeFaktura.fakture.length - 1) {
                izlistavanjeFaktura.trenutnaStrana = 0;
            }
            else {
                izlistavanjeFaktura.trenutnaStrana += 1;
            }
            izlistavanjeFaktura.prikazFakture();
        }
    };
    izlistavanjeFaktura.prethodnaStrana = function () {
        if (izlistavanjeFaktura.postojeStrane() == true) {
            if (izlistavanjeFaktura.trenutnaStrana - 1 < 0) {
                izlistavanjeFaktura.trenutnaStrana = izlistavanjeFaktura.fakture.length - 1;
            }
            else {
                izlistavanjeFaktura.trenutnaStrana -= 1;
            }
            izlistavanjeFaktura.prikazFakture();
        }
    };
    izlistavanjeFaktura.rezultatPretrage = function () {
        this.rezultatiPretrage.innerHTML = "Rezultati pretrage:";
        var text = document.createTextNode("".concat(this.fakture.length));
        this.rezultatiPretrage.appendChild(text);
    };
    izlistavanjeFaktura.prikazFakture = function () {
        this.rezultatPretrage();
        if (this.fakture.length == 0) {
            this.brojStrane.innerHTML = "";
            this.prikaz.innerHTML = "";
        }
        else {
            this.brojStrane.innerHTML = "".concat(this.trenutnaStrana + 1);
            this.prikaz.innerHTML = "";
            this.prikaz.innerHTML +=
                "\n            <tr>\n                <th scope=\"col\">".concat(this.fakture[this.trenutnaStrana].pibPreduzeceKupuje, "</th>\n                <th scope=\"col\">").concat(this.fakture[this.trenutnaStrana].pibPreduzeceProdaje, "</th>\n                <th scope=\"col\">").concat(this.fakture[this.trenutnaStrana].datumGenerisanja, "</th>\n                <th scope=\"col\">").concat(this.fakture[this.trenutnaStrana].datumValute, "</th>\n                <th scope=\"col\"><button data-toggle=\"modal\" data-target=\"#modal\" onclick=\"radSaFakturama.prikazStavkiFakture(").concat(this.fakture[this.trenutnaStrana].idFakture, ")\" class=\"btn btn-info btn-sm\">Prikazi stavke</button></th>\n                <th scope=\"col\">").concat(this.fakture[this.trenutnaStrana].ukupno, "</th>\n                <th scope=\"col\">").concat(this.fakture[this.trenutnaStrana].tipFakture, "</th>\n                <th scope=\"col\"><a href='./izmeniFakturu.html?").concat(this.fakture[this.trenutnaStrana].idFakture, "' id = 'prikazFakture' class=\"btn btn-info\">Izmeni</a></th>\n                <th scope=\"col\"><button onclick='radSaFakturama.obrisiFakturu(").concat(this.fakture[this.trenutnaStrana].idFakture, ",radSaFakturama.vratiSveFakturePreduzeca)' class=\"btn btn-danger\">Obrisi</button></th>\n            </tr>\n            ");
        }
    };
    izlistavanjeFaktura.postojiLiStavka = function (stavka, listaStavki) {
        var postoji = false;
        stavka.toLowerCase();
        for (var i = 0; i < listaStavki.length; i++) {
            if (listaStavki[i].naziv.toLowerCase().includes(stavka)) {
                postoji = true;
                break;
            }
        }
        return postoji;
    };
    izlistavanjeFaktura.pretragaPoParametrima = function (unos) {
        var _this = this;
        izlistavanjeFaktura.fakture = izlistavanjeFaktura.neFiltriraneFakture;
        izlistavanjeFaktura.trenutnaStrana = 0;
        var pronadjeneFakture = [];
        if (unos == '') {
            radSaFakturama.vratiSveFakturePreduzeca();
        }
        else {
            this.fakture.forEach(function (f) {
                if (unos.toString() == f.ukupno.toString() || _this.postojiLiStavka(unos, f.stavkeFakture)) {
                    pronadjeneFakture.push(f);
                }
            });
            izlistavanjeFaktura.fakture = pronadjeneFakture;
            izlistavanjeFaktura.prikazFakture();
        }
    };
    izlistavanjeFaktura.neFiltriraneFakture = [];
    izlistavanjeFaktura.fakture = [];
    izlistavanjeFaktura.trenutnaStrana = 0;
    return izlistavanjeFaktura;
}());
var radSaFakturama = /** @class */ (function () {
    function radSaFakturama() {
    }
    // Potrebno je prikazati fakture po strani (jedna faktura jedna strana) kao i pretrazivanje po 
    // iznosu fakture i po stavkama fakture
    radSaFakturama.vratiSveFakturePreduzeca = function () {
        //let fakture:Faktura[] = [];
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/preduzece/" + radSaFakturama.PIB,
            "method": "GET"
        }).done(function (response) {
            // response.datumGenerisanja = Validacija.kraciZapisDatuma(response.datumGenerisanja);
            // response.datumValute = Validacija.kraciZapisDatuma(response.datumValute);
            izlistavanjeFaktura.fakture = response;
            izlistavanjeFaktura.neFiltriraneFakture = response;
            izlistavanjeFaktura.prikazFakture();
        })
            .fail(function (jqXHR) {
            izlistavanjeFaktura.prikaz.innerHTML = "";
            izlistavanjeFaktura.fakture = [];
            izlistavanjeFaktura.prikazFakture();
            $(".alert-warning").removeAttr('hidden');
            $(".alert-warning").text(jqXHR.responseText);
        });
    };
    // Moguce ponavljanje koda radSaStavkama.prikazStavki
    radSaFakturama.prikazStavkiFakture = function (idFakture) {
        settingsGET.url = "http://localhost:5050/faktura/stavke/" + idFakture;
        $.ajax(settingsGET)
            .done(function (response) {
            $("#prikazStavki").html("");
            response.forEach(function (s) {
                $("#prikazStavki").append("\n                    <tr id=\"stavka\">\n                        <th scope=\"col\">".concat(s.naziv, "</th>\n                        <th scope=\"col\">").concat(s.cena, "</th>\n                        <th scope=\"col\">").concat(s.jedinicaMere, "</th>\n                        <th scope=\"col\">").concat(s.kolicina, "</th>\n                    </tr>\n                    "));
            });
        })
            .fail(function (err) {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        });
    };
    radSaFakturama.obrisiFakturu = function (idFakture, callback) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/" + idFakture,
            "method": "DELETE"
        }).done(function (response) {
            $(".alert-info").removeAttr("hidden");
            $(".alert-info").text(response);
            callback();
        })
            .fail(function (err) {
            $(".alert-warning").removeAttr("hidden");
            $(".alert-warning").text(err.responseText);
            callback();
        });
    };
    radSaFakturama.izmeniFakturu = function (id, pibPreduzecaKupuje, pibPreduzecaProdaje, datumValute, datumGenerisanja, elementi, tipFakture) {
        var listaStavki = [];
        var formatiranDatumValute = Validacija.stringToDate(datumValute);
        var formatiranDatumGenerisanja = Validacija.stringToDate(datumGenerisanja);
        var proveraPibPreduzecaKupuje = Validacija.proveraPib(pibPreduzecaKupuje);
        var proveraPibPreduzecaProdaje = Validacija.proveraPib(pibPreduzecaProdaje);
        var ukupno = Number($("#ukupno").val());
        elementi.forEach(function (e) {
            var deca = e.children;
            var id = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka = {
                "id_stavke": id,
                "naziv": naziv,
                "cena": cena,
                "jedinicaMere": jedinicaMere,
                "kolicina": kolicina
            };
            listaStavki.push(novaStavka);
        });
        if (proveraPibPreduzecaKupuje && proveraPibPreduzecaProdaje) {
            $("#pib_uspesno").removeAttr("hidden");
            var novaFaktura = {
                idFakture: id,
                pibPreduzeceKupuje: pibPreduzecaProdaje,
                pibPreduzeceProdaje: pibPreduzecaKupuje,
                datumGenerisanja: formatiranDatumGenerisanja,
                datumValute: formatiranDatumValute,
                stavkeFakture: listaStavki,
                ukupno: ukupno,
                tipFakture: tipFakture
            };
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/faktura/izmeni/" + id,
                "method": "PUT",
                "data": JSON.stringify(novaFaktura),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).done(function (response) {
                $("#uspesna_izmena").removeAttr("hidden");
                $("#uspesna_izmena").text(response);
            })
                .fail(function (jqXHR) {
                $("#neuspesna_izmena").removeAttr("hidden");
                $("#neuspesna_izmena").text(jqXHR.responseText);
            });
        }
        // Problem pri slanju post zahteva, izgleda da ajax salje get zahtev(podaci su poslati preko zaglavlja) umesto post zahteva . . . 
        else {
            $("#pib_neuspesno").removeAttr("hidden");
        }
    };
    radSaFakturama.getFakturaById = function (id, pibKupuje, pibProdaje, datumGenerisanja, datumValute, ispisStavki, tipFakture, ukupno) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/" + id,
            "method": "GET"
        }).done(function (response) {
            console.log(response);
            pibKupuje.value = response.pibPreduzeceKupuje;
            pibProdaje.value = response.pibPreduzeceProdaje;
            datumGenerisanja.value = response.datumGenerisanja.split("T")[0];
            datumValute.value = response.datumValute.split("T")[0];
            ukupno.value = response.ukupno;
            tipFakture.value = response.tipFakture;
            radSaStavkamaFakture.prikaz = ispisStavki;
            radSaStavkamaFakture.stavke = response.stavkeFakture;
            radSaStavkamaFakture.prikazStavki();
        })
            .fail(function (jqXHR, responseText) {
            alert("Greska pri dodavanju preduzeca" + responseText);
        });
    };
    radSaFakturama.dodajFakturu = function (pibPreduzecaKupuje, pibPreduzecaProdaje, datumValute, datumGenerisanja, elementi, tipFakture) {
        var listaStavki = [];
        var formatiranDatumValute = Validacija.stringToDate(datumValute);
        var formatiranDatumGenerisanja = Validacija.stringToDate(datumGenerisanja);
        var proveraPibPreduzecaKupuje = Validacija.proveraPib(pibPreduzecaKupuje);
        var proveraPibPreduzecaProdaje = Validacija.proveraPib(pibPreduzecaProdaje);
        var ukupno = Number($("#ukupno").val());
        elementi.forEach(function (e) {
            var deca = e.children;
            var id = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka = {
                "id_stavke": id,
                "naziv": naziv,
                "cena": cena,
                "jedinicaMere": jedinicaMere,
                "kolicina": kolicina
            };
            listaStavki.push(novaStavka);
        });
        if (proveraPibPreduzecaKupuje && proveraPibPreduzecaProdaje) {
            var novaFaktura = {
                idFakture: 1,
                pibPreduzeceKupuje: pibPreduzecaProdaje,
                pibPreduzeceProdaje: pibPreduzecaKupuje,
                datumGenerisanja: formatiranDatumGenerisanja,
                datumValute: formatiranDatumValute,
                stavkeFakture: listaStavki,
                ukupno: ukupno,
                tipFakture: tipFakture
            };
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/faktura/dodaj",
                "method": "POST",
                "data": JSON.stringify(novaFaktura),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).done(function (jqXHR) {
                alert(jqXHR.responseText);
                $("#uspesno_dodavanje_fakture").removeAttr('hidden');
                $("#uspesno_dodavanje_fakture").text(jqXHR.responseText);
            })
                .fail(function (jqXHR) {
                alert("Greska pri dodavanju preduzeca" + jqXHR.responseText);
            });
        }
        else {
            $("#pib_neuspesno").removeAttr('hidden');
            $("#pib_uspesno").attr('hidden', 'true');
        }
    };
    var _b;
    _b = radSaFakturama;
    radSaFakturama.dostaviFakture = function () {
        _b.prikaz.innerHTML = "";
        settingsGET.url = "http://localhost:5050/faktura";
        $.ajax(settingsGET)
            .done(function (response) {
            response.forEach(function (f) {
                // f.datumValute = Validacija.kraciZapisDatuma(f.datumValute);
                // f.datumGenerisanja = Validacija.kraciZapisDatuma(f.datumGenerisanja);
                _b.prikaz.innerHTML +=
                    "\n                <tr>\n                    <th scope=\"col\">".concat(f.pibPreduzeceKupuje, "</th>\n                    <th scope=\"col\">").concat(f.pibPreduzeceProdaje, "</th>\n                    <th scope=\"col\">").concat(f.datumGenerisanja, "</th>\n                    <th scope=\"col\">").concat(f.datumValute, "</th>\n                    <th scope=\"col\"><button data-toggle=\"modal\" data-target=\"#modal\" onclick='radSaFakturama.prikazStavkiFakture(").concat(f.idFakture, ")'  class=\"btn btn-info btn-sm\">Prikazi stavke</button></th>\n                    <th scope=\"col\">").concat(f.ukupno, "</th>\n                    <th scope=\"col\">").concat(f.tipFakture, "</th>\n                    <th scope=\"col\"><a href='izmeniFakturu.html?").concat(f.idFakture, "'class=\"btn btn-info\">Izmeni</a></th>\n                    <th scope=\"col\"><button class='btn btn-danger' onclick='radSaFakturama.obrisiFakturu(").concat(f.idFakture, ",radSaFakturama.dostaviFakture)' >Obri\u0161i</button></th>\n                </tr>\n                ");
            });
        })
            .fail(function (err) {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        });
    };
    return radSaFakturama;
}());
var radSaStavkamaFakture = /** @class */ (function () {
    function radSaStavkamaFakture() {
    }
    radSaStavkamaFakture.ukloniStavku = function (id_stavke) {
        var noveStavke = this.stavke.filter(function (s) { return s.id_stavke != id_stavke; });
        this.stavke = __spreadArray([], noveStavke, true);
        this.prikazStavki();
    };
    radSaStavkamaFakture.postojiLiStavka = function (stavka) {
        var postoji = false;
        for (var i = 0; i < this.stavke.length; i++) {
            if (this.stavke[i].cena == stavka.cena && this.stavke[i].jedinicaMere == stavka.jedinicaMere && this.stavke[i].naziv == stavka.naziv) {
                this.stavke[i].kolicina += stavka.kolicina;
                postoji = true;
                break;
            }
        }
        return postoji;
    };
    var _c;
    _c = radSaStavkamaFakture;
    radSaStavkamaFakture.stavke = [];
    radSaStavkamaFakture.prikazStavki = function () {
        _c.prikaz.innerHTML = "";
        console.log(_c.stavke);
        var ukupno = 0;
        _c.stavke.forEach(function (s) {
            _c.prikaz.innerHTML +=
                "\n                    <tr id=\"stavka\">\n                        <th scope=\"col\">".concat(s.naziv, "</th>\n                        <th scope=\"col\">").concat(s.cena, "</th>\n                        <th scope=\"col\">").concat(s.jedinicaMere, "</th>\n                        <th scope=\"col\">").concat(s.kolicina, "</th>\n                        <th scope=\"col\"><button onclick='radSaStavkamaFakture.ukloniStavku(").concat(s.id_stavke, ")' class='btn btn-danger' >Ukloni</button></th>\n                        <th scope=\"col\" hidden>").concat(s.id_stavke, "</th>\n                    </tr>\n                ");
            ukupno += s.kolicina * s.cena;
        });
        _c.prikazUkupno.value = ukupno.toString();
    };
    radSaStavkamaFakture.sacuvajStavkeFakture = function () {
    };
    radSaStavkamaFakture.dodeliID = function () {
        var id;
        if (_c.stavke.length < 1) {
            return id = 1;
        }
        return id = _c.stavke[_c.stavke.length - 1].id_stavke + 1;
    };
    radSaStavkamaFakture.dodajStavku = function (naziv, cena, kolicina, jedinica_mere) {
        var id = radSaStavkamaFakture.dodeliID();
        var novaStavka = { "id_stavke": id, "naziv": naziv, "cena": cena, "kolicina": kolicina, "jedinicaMere": jedinica_mere };
        console.log(_c.postojiLiStavka(novaStavka));
        if (_c.postojiLiStavka(novaStavka) == false) {
            _c.stavke.push(novaStavka);
        }
        _c.prikazStavki();
    };
    return radSaStavkamaFakture;
}());
var Validacija = /** @class */ (function () {
    function Validacija() {
    }
    Validacija.proveraPib = function (pib) {
        var provera = false;
        if (pib.toString().length == 9) {
            provera = true;
        }
        return provera;
    };
    Validacija.proveraImena = function (ime) {
        var ispravno = false;
        var patern = new RegExp(/[a-zA-Z][a-zA-Z ]{3,}/);
        ispravno = patern.test(ime);
        return ispravno;
    };
    Validacija.stringToDate = function (datum) {
        var godinaMesecDan = datum.split("-");
        var formatiranDatum = new Date(Number(godinaMesecDan[0]), Number(godinaMesecDan[1]) - 1, Number(godinaMesecDan[2]), new Date().getHours(), new Date().getMinutes());
        return formatiranDatum;
    };
    Validacija.kraciZapisDatuma = function (response) {
        // response.forEach(element => {
        //     element.datumGenerisanja = element.datumdatumGenerisanja.split("T")[0].split("-");
        //     element.datumValute = element.datumValute.split("T")[0].split("-");
        // });
        // let godinaMesecDan = datum.split("T")[0].split("-");
        // let formatiranDatum = `${godinaMesecDan[2]}-${godinaMesecDan[1]}-${godinaMesecDan[0]}`
        // return formatiranDatum;
    };
    return Validacija;
}());
//Prikaz faktura za zeljeno preduzece
