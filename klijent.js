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
    "async": false,
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
            "method": "DELETE",
        }).done(function (response) {
            $(".alert").removeAttr("hidden");
            $(".alert").text(response);
            console.log(response);
            _a.dostaviPreduzeca();
        })
            .fail(function (err) {
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
            console.log(err);
        });
    };
    radSaPreduzecima.getPreduzeceByPib = function (pib) {
        var pronadjenoPreduzece;
        console.log(pib);
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:5050/preduzece/" + pib,
            "method": "GET",
        }).done(function (response) {
            pronadjenoPreduzece = response;
        })
            .fail(function (jqXHR) {
            console.log(jqXHR);
            alert(jqXHR.responseText);
        });
        return pronadjenoPreduzece;
    };
    radSaPreduzecima.izmeniPreduzece = function (pib, naziv, ime, prezime, ulica, broj, mejl, telefon) {
        var naziv = naziv.val();
        var ime = ime.val();
        var prezime = prezime.val();
        var telefon = telefon.val();
        var mejl = mejl.val();
        var ulica = ulica.val();
        var broj = broj.val();
        var odgovornoLice = {
            ime: ime,
            prezime: prezime
        };
        var adresa = {
            ulica: ulica,
            broj: broj,
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
            _a.dostaviPreduzeca();
        }
        else {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5050/preduzece/filtriraj/" + unos.toString(),
                "method": "GET",
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
                "method": "GET",
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
            .fail(function (jqXHR) {
            $("#proveraForme").removeAttr("hidden").text(jqXHR.responseText);
        });
    };
    return radSaPreduzecima;
}());
var izlistavanjeFaktura = /** @class */ (function () {
    function izlistavanjeFaktura() {
    }
    izlistavanjeFaktura.postojeStrane = function () {
        if (izlistavanjeFaktura.fakture.length == 0) {
            return false;
        }
        return true;
    };
    ;
    izlistavanjeFaktura.sledecaStrana = function () {
        if (izlistavanjeFaktura.postojeStrane() == true) {
            if (izlistavanjeFaktura.trenutnaStrana + 2 <= izlistavanjeFaktura.maxNumberOfPages) { // +1 za pocetak od 1 (def. 0) +2 jer je pocetna strana vec na 1 i provera onda krece od 2
                console.log('trenutna:', izlistavanjeFaktura.trenutnaStrana);
                console.log('max', izlistavanjeFaktura.maxNumberOfPages);
                izlistavanjeFaktura.trenutnaStrana++;
            }
            console.log(izlistavanjeFaktura.maxNumberOfPages);
            izlistavanjeFaktura.prikazFakture();
        }
    };
    izlistavanjeFaktura.prethodnaStrana = function () {
        if (izlistavanjeFaktura.postojeStrane() == true) {
            if (izlistavanjeFaktura.trenutnaStrana > 0) {
                izlistavanjeFaktura.trenutnaStrana--;
            }
            console.log(this.trenutnaStrana);
            izlistavanjeFaktura.prikazFakture();
        }
    };
    izlistavanjeFaktura.rezultatPretrage = function () {
        this.rezultatiPretrage.innerHTML = "Rezultati pretrage:";
        var text = document.createTextNode("".concat(this.fakture.length));
        this.rezultatiPretrage.appendChild(text);
    };
    izlistavanjeFaktura.prikazFakture = function () {
        izlistavanjeFaktura.maxNumberOfPages = izlistavanjeFaktura.maxPageFunction(izlistavanjeFaktura.fakture.length);
        this.rezultatPretrage();
        if (this.fakture.length == 0) {
            this.brojStrane.innerHTML = "";
            this.prikaz.innerHTML = "";
        }
        else {
            this.brojStrane.innerHTML = "".concat(this.trenutnaStrana + 1);
            this.prikaz.innerHTML = "";
            for (var i = 0; i < 5; i++) {
                if (i + this.trenutnaStrana * 5 == this.fakture.length) {
                    return;
                }
                var formatiranDatumValute = Validacija.kraciZapisDatuma(this.fakture[i + this.trenutnaStrana * 5].datumValute.toString());
                var formatiranDatumGenerisanja = Validacija.kraciZapisDatuma(this.fakture[i + this.trenutnaStrana * 5].datumGenerisanja.toString());
                this.prikaz.innerHTML +=
                    "\n                        <tr>\n                            <th scope=\"col\">".concat(this.fakture[i + this.trenutnaStrana * 5].pibPreduzeceKupuje, "</th>\n                            <th scope=\"col\">").concat(this.fakture[i + this.trenutnaStrana * 5].pibPreduzeceProdaje, "</th>\n                            <th scope=\"col\">").concat(formatiranDatumGenerisanja, "</th>\n                            <th scope=\"col\">").concat(formatiranDatumValute, "</th>\n                            <th scope=\"col\"><button data-toggle=\"modal\" data-target=\"#modal\" onclick=\"radSaFakturama.prikazStavkiFakture(").concat(this.fakture[i].idFakture, ")\" class=\"btn btn-info btn-sm\">Prikazi stavke</button></th>\n                            <th scope=\"col\">").concat(this.fakture[i + this.trenutnaStrana * 5].ukupno, "</th>\n                            <th scope=\"col\">").concat(this.fakture[i + this.trenutnaStrana * 5].tipFakture, "</th>\n                            <th scope=\"col\"><a href='./izmeniFakturu.html?").concat(this.fakture[i].idFakture, "' id = 'prikazFakture' class=\"btn btn-info\">Izmeni</a></th>\n                            <th scope=\"col\"><button onclick='radSaFakturama.obrisiFakturu(").concat(this.fakture[i + this.trenutnaStrana * 5].idFakture, ")' class=\"btn btn-danger\">Obrisi</button></th>\n                        </tr>\n                    ");
            }
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
    izlistavanjeFaktura.fakture = [];
    izlistavanjeFaktura.trenutnaStrana = 0;
    izlistavanjeFaktura.maxNumberOfPages = 0;
    //static brojStrana:number = 0;
    izlistavanjeFaktura.maxPageFunction = function (brojElemenata) {
        var brojStranica = Math.floor(brojElemenata / 5);
        if (brojStranica % 5 != 0) {
            brojStranica++;
        }
        return brojStranica;
    };
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
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/preduzece/" + _b.PIB,
            "method": "GET",
        }).done(function (response) {
            izlistavanjeFaktura.fakture = response;
        })
            .fail(function (jqXHR) {
            izlistavanjeFaktura.prikaz.innerHTML = "";
            izlistavanjeFaktura.fakture = [];
            izlistavanjeFaktura.prikazFakture();
            $(".alert-warning").removeAttr('hidden');
            $(".alert-warning").text(jqXHR.responseText);
        });
    };
    radSaFakturama.prikazFaktura = function (fakture) {
        var _this = this;
        this.prikaz.innerHTML = "";
        console.log("prikaz", fakture);
        fakture.forEach(function (f) {
            var datumValute = Validacija.kraciZapisDatuma(f.datumValute.toString());
            var datumGenerisanja = Validacija.kraciZapisDatuma(f.datumGenerisanja.toString());
            _this.prikaz.innerHTML +=
                "\n                <tr>\n                    <th scope=\"col\">".concat(f.pibPreduzeceKupuje, "</th>\n                    <th scope=\"col\">").concat(f.pibPreduzeceProdaje, "</th>\n                    <th scope=\"col\">").concat(datumGenerisanja, "</th>\n                    <th scope=\"col\">").concat(datumValute, "</th>\n                    <th scope=\"col\"><button data-toggle=\"modal\" data-target=\"#modal\" onclick='radSaFakturama.prikazStavkiFakture(").concat(f.idFakture, ")'  class=\"btn btn-info btn-sm\">Prikazi stavke</button></th>\n                    <th scope=\"col\">").concat(f.ukupno, "</th>\n                    <th scope=\"col\">").concat(f.tipFakture, "</th>\n                    <th scope=\"col\"><a href='izmeniFakturu.html?").concat(f.idFakture, "'class=\"btn btn-info\">Izmeni</a></th>\n                    <th scope=\"col\"><button class='btn btn-danger' onclick='radSaFakturama.obrisiFakturu(").concat(f.idFakture, ")' >Obri\u0161i</button></th>\n                </tr>\n                ");
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
    radSaFakturama.obrisiFakturu = function (idFakture) {
        var _this = this;
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/" + idFakture,
            "method": "DELETE",
        }).done(function (response) {
            $("#uspesnoBrisanjeFaktureAlert").removeAttr("hidden");
            $("#uspesnoBrisanjeFaktureAlert").text("Faktura je uspesno obrisana");
            _this.fakture = response;
            _b.prikazFaktura(_b.fakture);
        })
            .fail(function (err) {
            $(".alert-warning").removeAttr("hidden");
            $(".alert-warning").text(err.responseText);
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
            "method": "GET",
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
        console.log(proveraPibPreduzecaKupuje);
        console.log(proveraPibPreduzecaProdaje);
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
            }).done(function (jqXHR) {
                $("#obavestenjeDodavanjeFaktureUspesno").removeAttr('hidden').text(jqXHR);
            })
                .fail(function (jqXHR) {
                console.log(jqXHR);
                $("#obavestenjeDodavanjeFaktureGreska").removeAttr('hidden').text(jqXHR.responseText);
            });
        }
        else {
            $("#pib_neuspesno").removeAttr('hidden');
            $("#pib_uspesno").attr('hidden', 'true');
        }
    };
    radSaFakturama.filtrirajFakture = function (unos) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/filtriraj/" + unos.toString(),
            "method": "GET"
        }).done(function (response) {
            _b.filtriraneFakture = response;
            _b.prikazFaktura(_b.filtriraneFakture);
        })
            .fail(function (jqXHR) {
            console.log(jqXHR);
        });
    };
    var _b;
    _b = radSaFakturama;
    radSaFakturama.fakture = [];
    radSaFakturama.filtriraneFakture = [];
    radSaFakturama.dostaviFakture = function () {
        settingsGET.url = "http://localhost:5050/faktura";
        $.ajax(settingsGET)
            .done(function (response) {
            _b.fakture = response;
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
    var _c;
    _c = radSaStavkamaFakture;
    radSaStavkamaFakture.stavke = [];
    radSaStavkamaFakture.prikazStavki = function () {
        _c.prikaz.innerHTML = "";
        console.log(_c.stavke);
        var ukupno = 0;
        console.log(_c.stavke);
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
        var id = _c.dodeliID();
        var novaStavka = { "id_stavke": id, "naziv": naziv, "cena": cena, "kolicina": kolicina, "jedinicaMere": jedinica_mere };
        _c.stavke.push(novaStavka);
        _c.prikazStavki();
        // if(this.postojiLiStavka(novaStavka) == false){
        // }
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
    Validacija.kraciZapisDatuma = function (neobradjenDatum) {
        console.log(neobradjenDatum);
        var formatiranDatum = neobradjenDatum.split("T")[0];
        return formatiranDatum;
    };
    return Validacija;
}());
//Prikaz faktura za zeljeno preduzece
