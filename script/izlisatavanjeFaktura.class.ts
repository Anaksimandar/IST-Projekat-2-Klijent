import { Validacija } from "./validacija.class";
import { Faktura } from "./models/faktura.model";

export class izlistavanjeFaktura{
    private static limit:number = 5;
    static fakture:Faktura[] = [];
    static prikaz:HTMLElement; // prikaz svih faktura
    static brojStrane:number = 1; // pracenje trenutne strane 
    static prikazStranica:HTMLElement; // prikaz navigacionog menija (stranica)
    static rezultatiPretragePrikaz:HTMLElement;
    static PIB:number;
    static rezultatiPretrage:number;
    //static brojStrana:number = 0;

    // return all 
    static dostaviFakture(){
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": `http://localhost:5050/faktura/preduzece/${this.PIB}/stranica/?strane=${this.brojStrane}&limit=${this.limit}`,
            "method": "GET",
        }).done((response) => {
            this.fakture = response.requestedElements;
            this.rezultatiPretrage = response.totalSizeOfList;
            console.log(response);
        })
        .fail((jqXHR) => {
            console.log(jqXHR.responseText);
            
        })
    }

    // Ucitavanje dumica za navigaciju koji ce pretstavljati stranice za izlistavanje rezulatata pretrage 
    static ucitajDugmiceZaNavigaciju(){
            this.prikazStranica.innerHTML = "";
            var brojStranica: number = Validacija.izracunajBrojStranica(this.rezultatiPretrage);
            console.log(brojStranica);
            for (let i = 0; i < brojStranica; i++) {
                var li = document.createElement('li');
                var link = document.createElement('a');
                li.className = 'page-item';
                link.className = 'page-link';
                link.setAttribute("id", `${i + 1}`);
                link.innerText = `${i + 1}`
                link.addEventListener('click',function(){
                    izlistavanjeFaktura.brojStrane = parseInt(this.getAttribute("id"));
                    izlistavanjeFaktura.dostaviFakture();
                    izlistavanjeFaktura.prikazFakture();
                })
                li.appendChild(link);
                console.log(li);
                
                this.prikazStranica.appendChild(li);
            }        
            Validacija.postavljanjeAktivneStrane(this.brojStrane);

        
    }

    static prikazFakture(){
        this.prikaz.innerHTML = "";

        if(this.fakture.length ==0){
            this.rezultatiPretragePrikaz.classList.add("d-none");
        }
        else{
            this.fakture.forEach(f => {
                this.prikaz.innerHTML +=
                    `
                <tr>
                    <th scope="col">${f.pibPreduzeceProdaje}</th>
                    <th scope="col">${f.pibPreduzeceKupuje}</th>
                    <th scope="col">${f.datumGenerisanja}</th>
                    <th scope="col">${f.datumValute}</th>
                    <th scope="col"><button data-toggle="modal" data-target="#modal" onclick="radSaFakturama.prikazStavkiFakture(${f.idFakture})" class="btn btn-info btn-sm">Prikazi stavke</button></th>
                    <th scope="col">${f.ukupno}</th>
                    <th scope="col">${f.tipFakture}</th>
                    <th scope="col"><a href='./izmeniFakturu.html?${f.idFakture}' id = 'prikazFakture' class="btn btn-info">Izmeni</a></th>
                    <th scope="col"><button onclick='radSaFakturama.obrisiFakturu(${f.idFakture})' class="btn btn-danger">Obrisi</button></th>
                </tr>
            `;
            })
            console.log('prikaz');
            
            this.ucitajDugmiceZaNavigaciju();
            this.rezultatiPretragePrikaz.innerText = `Rezultati pretrage: ${this.rezultatiPretrage}`;
        }
        
    }

    static sledecaStrana(){
        
    }

    static prethodnaStrana(){
        
    }
}