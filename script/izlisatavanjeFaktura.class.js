import { Validacija } from "./validacija.class.js";
export class izlistavanjeFaktura {
    //static brojStrana:number = 0;
    // return all 
    static dostaviFakture() {
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": `http://localhost:5050/faktura/preduzece/${this.PIB}/stranica/?strane=${this.brojStrane}&limit=${this.limit}`,
            "method": "GET",
        }).done((response) => {
            this.fakture = response.requestedElements;
            this.rezultatiPretrage = response.totalSizeOfList;
            this.prikazFakture();
        })
            .fail((jqXHR) => {
            this.navigationMenu.classList.add("d-none"); // ne zelimo da prikazujemo rezultate pretrage kao ni UI za navigaciju ukoliko ne postoje fakture za dato preduzece
            console.log(jqXHR.responseText);
            $("#obavestenje").attr("hidden", false).text(jqXHR.responseText);
        });
    }
    // Ucitavanje dumica za navigaciju koji ce pretstavljati stranice za izlistavanje rezulatata pretrage 
    static ucitajDugmiceZaNavigaciju() {
        this.prikazStranica.innerHTML = "";
        this.brojStrana = Validacija.izracunajBrojStranica(this.rezultatiPretrage);
        for (let i = 0; i < this.brojStrana; i++) {
            var li = document.createElement('li');
            var link = document.createElement('a');
            li.className = 'page-item';
            link.className = 'page-link';
            link.setAttribute("id", `${i + 1}`);
            link.innerText = `${i + 1}`;
            link.addEventListener('click', function () {
                izlistavanjeFaktura.brojStrane = parseInt(this.getAttribute("id"));
                izlistavanjeFaktura.dostaviFakture();
                izlistavanjeFaktura.prikazFakture();
            });
            li.appendChild(link);
            console.log(li);
            this.prikazStranica.appendChild(li);
        }
        Validacija.postavljanjeAktivneStrane(this.brojStrane);
    }
    static prikazFakture() {
        this.prikaz.innerHTML = "";
        this.fakture.forEach(f => {
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
                    <th scope="col"><a id="${f.idFakture}" class='btn btn-danger obrisiFakturu'>Obriši</a></th>
                </tr>
                `;
        });
        console.log('prikaz');
        this.ucitajDugmiceZaNavigaciju();
        this.rezultatiPretragePrikaz.innerText = `Rezultati pretrage: ${this.rezultatiPretrage}`;
    }
    // filtriranje faktura (paganizacija)
    static filtrirajFakture(unos) {
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": `http://localhost:5050/faktura/preduzece/${this.PIB}/filtriraj/stranica/?strane=${this.brojStrane}&limit=${this.limit}&unos=${encodeURIComponent(unos)}`,
            "method": "GET",
        }).done((response) => {
            this.fakture = response.requestedElements;
            this.rezultatiPretrage = response.totalSizeOfList;
            this.prikazFakture();
        })
            .fail((jqXHR) => {
            console.log(jqXHR.responseText);
            $("#faktura-search-alert").attr("hidden", false).text(jqXHR.responseText);
            setTimeout(() => {
                $("#faktura-search-alert").attr("hidden", true).text(jqXHR.responseText);
            }, 3000);
        });
    }
    static sledecaStrana() {
    }
    static prethodnaStrana() {
    }
}
izlistavanjeFaktura.limit = 5;
izlistavanjeFaktura.fakture = [];
izlistavanjeFaktura.brojStrane = 1; // pracenje trenutne strane 
