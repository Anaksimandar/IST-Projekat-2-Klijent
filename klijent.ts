interface Faktura{
    idFakture:number,
    pibPreduzeceKupuje:number,
    pibPreduzeceProdaje:number,
    datumGenerisanja:Date,
    datumValute:Date, //do kad treba da se plati
    stavkeFakture:Array<StavkeFakture>,
    ukupno:number,
    tipFakture:string
}

interface Preduzece{
    pib:number,
    nazivPreduzeca:string,
    odgovornoLice:OdgovornoLice,
    adresa:Adresa,
    email:string
    telefon:string

}

interface OdgovornoLice{
    ime:string,
    prezime:string

}

interface StavkeFakture{
    id_stavke:number,
    naziv:string,
    cena:number,
    jedinicaMere:string,
    kolicina:number
}
interface Adresa{
    ulica:string,
    broj:number
}

const settingsGET = {
    "async":true,
    "crossDomain":true,
    "url":"http://localhost:5050",
    "method":"GET"
}


class radSaPreduzecima{
    static prikaz:HTMLElement;
    static prikazPreduzeca = (preduzeca:Array<Preduzece>)=>{
        this.prikaz.innerHTML = "";
        preduzeca.forEach(p => {
            this.prikaz.innerHTML+=
                `
                <tr>
                    <th id='pib' scope="col">${p.pib}</th>
                    <th scope="col">${p.nazivPreduzeca}</th>
                    <th scope="col">${p.odgovornoLice.ime + " "+ p.odgovornoLice.prezime}</th>
                    <th scope="col">${p.adresa.ulica +" "+ p.adresa.broj}</th>
                    <th scope="col">${p.email}</th>
                    <th scope="col">${p.telefon}</th>
                    <th scope="col"><a href='./prikazFakturaZaPreduzece.html?${p.pib}' class="btn btn-info">Prikaz faktura</button></th>
                    <th scope="col"><button data-toggle="modal" data-target="#prikazi_bilans" class='btn btn-info'>Bilans</button></th>
                    <th scope="col"><a href='./izmeniPreduzece.html?${p.pib}' class='btn btn-info'>Izmeni</a></th>
                    <th scope="col"><button id="obrisiPreduzece" onclick='radSaPreduzecima.obrisiPreduzece(${p.pib})' class='btn btn-danger'>Obrisi</button></th>
                </tr>
                `;
            });
    }
    static dostaviPreduzeca = ()=>{
        this.prikaz.innerHTML = "";
        settingsGET.url = "http://localhost:5050/preduzece" ;
        $.ajax(settingsGET)
        .done((response)=>{
            this.prikazPreduzeca(response);
        })
        .fail(err=>{
            alert('Greska')
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        })
        
    
    }
    static obrisiPreduzece(pib:number){
        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/preduzece/"+pib,
            "method":"DELETE",
            
        }).done((response)=>{
            $(".alert").removeAttr("hidden");
            $(".alert").text(response);
            console.log(response);
            
            radSaPreduzecima.dostaviPreduzeca();
            
            
        })
        .fail((err)=>{
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
            console.log(err);
            
        })
    }
    static getPreduzeceByPib(pib:string,pibPolje:HTMLInputElement, naziv:HTMLInputElement, ime:HTMLInputElement, prezime:HTMLInputElement,mail:HTMLInputElement,ulica:HTMLInputElement,broj:HTMLInputElement,telefon){
        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/preduzece/"+pib,
            "method":"GET",
            
        }).done((response)=>{
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
        .fail((err)=>{
            
            console.log(err);
            
        })
    }
    static izmeniPreduzece(pib:number,noviPib:number,naziv:string,ime:string,prezime:string,ulica:string,broj:number,mejl:string,telefon:string){
        let odgovornoLice:OdgovornoLice = {
            ime:ime,
            prezime:prezime
        }
        let adresa:Adresa = {
            ulica:ulica,
            broj:broj,
        }
        let novoPreduzece:Preduzece = {
            pib:noviPib,
            nazivPreduzeca:naziv,
            odgovornoLice:odgovornoLice,
            adresa:adresa,
            email:mejl,
            telefon:telefon
        }
        console.log(novoPreduzece);
        
        
        
        
        if(Validacija.proveraPib(pib) == true && Validacija.proveraPib(noviPib) == true && Validacija.proveraImena(ime)&& Validacija.proveraImena(prezime)){
            
            $.ajax({
                "async":true,
                "crossDomain":true,
                "url":"http://localhost:5050/preduzece/"+pib,
                "method":"PUT",
                "data":JSON.stringify(novoPreduzece),
                "headers":{
                    "Content-Type":"application/json"
                }
            }).done((response)=>{
                $(".alert-success").removeAttr("hidden").text(response);
                
                
            })
            .fail((jqXHR,responseText)=>{
                $(".alert-danger").removeAttr("hidden").text(jqXHR.responseText);
                
            })
        }
        else{
            $(".alert-danger").removeAttr("hidden").text("Proverite unete podatke");
            
        }
    }
   
    static dodajPreduzece = ( naziv:string,pib:number,ime:string,prezime:string,ulica:string,broj:number,mejl:string,telefon:string)=>{
        let odgovornoLice:OdgovornoLice = {
            ime:ime,
            prezime:prezime
        }
        let adresa:Adresa = {
            ulica:ulica,
            broj:broj
        }
        let novoPreduzece:Preduzece = {
            pib:pib,
            nazivPreduzeca:naziv,
            odgovornoLice:odgovornoLice,
            adresa:adresa,
            email:mejl,
            telefon:telefon
        }
        console.log(novoPreduzece);
    
        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/preduzece/dodaj",
            "method":"POST",
            "data":JSON.stringify(novoPreduzece),
            "headers":{
                "Content-Type":"application/json"
            }
        }).done((response)=>{
            console.log(response);
            console.log('sve je u redu');
            
            $(".alert-success").removeAttr("hidden").text('Preduzece je uspesno dodato');
            
        })
        .fail((jqXHR,responseText)=>{
            console.log('Doslo je do greske' + jqXHR);
            
            $("#proveraForme").removeAttr("hidden").text(jqXHR.responseText);
            
        })
        
        
        
            
    }

    static filtrirajPreduzeca(unos:string){
        if(unos.trim().length == 0){
            $(".alert-info").removeAttr('hidden');
            $(".alert-info").text('Unesite parametre za pretragu');
            radSaPreduzecima.dostaviPreduzeca();
        }
        else{
            $.ajax({
                "async":true,
                "crossDomain":true,
                "url":"http://localhost:5050/preduzece/filtriraj/"+unos.toString(),
                "method":"GET",
                
            }).done((response)=>{
                this.prikazPreduzeca(response);
                console.log(response);
                
            })
            .fail((jqXHR)=>{
                $(".alert-info").removeAttr('hidden');
                console.log(jqXHR);
                
                $(".alert-info").text(jqXHR.responseText);
    
            })
        }
        

    }
    static prikaziBilans(pib:number,datum_od:string,datum_do:string,prikaz:HTMLElement){
        if(datum_do == "" || datum_od == ""){
            $(".alert-info").removeAttr("hidden");
            $(".alert-info").text("Unesite datum");
        }
        else{
            $.ajax({
                "async":true,
                "crossDomain":true,
                "url":"http://localhost:5050/faktura/bilans/"+pib+"/"+datum_od+"/"+datum_do,
                "method":"GET",
                
            }).done((response)=>{
                prikaz.innerHTML = "Bilans za zeljeni period je:" +response;
                
            })
            .fail((jqXHR)=>{
                $(".alert-info").removeAttr('hidden');
                console.log(jqXHR);
                alert(jqXHR.responseText);
                $(".alert-info").text(jqXHR.responseText);
    
            })
        }
        
    }
    

}
class izlistavanjeFaktura{
    static neFiltriraneFakture:Faktura[] = [];
    static fakture:Faktura[] = [];
    static trenutnaStrana:number = 0;
    static prikaz:HTMLElement;
    static brojStrane:HTMLElement;
    static rezultatiPretrage:HTMLElement;
    //static brojStrana:number = 0;
    
    
    
    static postojeStrane(){
        if(izlistavanjeFaktura.fakture.length == 0){
            return false;
        }
        return true;
    };
    static sledecaStrana(){
        if(izlistavanjeFaktura.postojeStrane() == true){
            if(izlistavanjeFaktura.trenutnaStrana+1>izlistavanjeFaktura.fakture.length-1){
                izlistavanjeFaktura.trenutnaStrana = 0;
            }
            else{
                izlistavanjeFaktura.trenutnaStrana+=1;
            }
            izlistavanjeFaktura.prikazFakture();
        }
                
        
        
    }
    static prethodnaStrana(){
        if(izlistavanjeFaktura.postojeStrane() == true){
            if(izlistavanjeFaktura.trenutnaStrana-1<0){
                izlistavanjeFaktura.trenutnaStrana = izlistavanjeFaktura.fakture.length-1;
            }
            else{
                izlistavanjeFaktura.trenutnaStrana-=1;
            }
            izlistavanjeFaktura.prikazFakture();
            
        }
         
    }
    static rezultatPretrage(){
        this.rezultatiPretrage.innerHTML = "Rezultati pretrage:";
        let text = document.createTextNode(`${this.fakture.length}`);
        this.rezultatiPretrage.appendChild(text);
    }
    static prikazFakture(){
        this.rezultatPretrage();
        if(this.fakture.length == 0){            
            this.brojStrane.innerHTML = "";
            this.prikaz.innerHTML = "";
        }
        else{
            this.brojStrane.innerHTML = `${this.trenutnaStrana+1}`;
            this.prikaz.innerHTML = "";
            this.prikaz.innerHTML+=
            `
            <tr>
                <th scope="col">${this.fakture[this.trenutnaStrana].pibPreduzeceKupuje}</th>
                <th scope="col">${this.fakture[this.trenutnaStrana].pibPreduzeceProdaje}</th>
                <th scope="col">${this.fakture[this.trenutnaStrana].datumGenerisanja}</th>
                <th scope="col">${this.fakture[this.trenutnaStrana].datumValute}</th>
                <th scope="col"><button data-toggle="modal" data-target="#modal" onclick="radSaFakturama.prikazStavkiFakture(${this.fakture[this.trenutnaStrana].idFakture})" class="btn btn-info btn-sm">Prikazi stavke</button></th>
                <th scope="col">${this.fakture[this.trenutnaStrana].ukupno}</th>
                <th scope="col">${this.fakture[this.trenutnaStrana].tipFakture}</th>
                <th scope="col"><a href='./izmeniFakturu.html?${this.fakture[this.trenutnaStrana].idFakture}' id = 'prikazFakture' class="btn btn-info">Izmeni</a></th>
                <th scope="col"><button onclick='radSaFakturama.obrisiFakturu(${this.fakture[this.trenutnaStrana].idFakture},radSaFakturama.vratiSveFakturePreduzeca)' class="btn btn-danger">Obrisi</button></th>
            </tr>
            `;
        }
        
        
    }
    static postojiLiStavka(stavka:string,listaStavki:Array<StavkeFakture>):boolean{
        let postoji:boolean = false;
        stavka.toLowerCase();
        for(let i = 0;i<listaStavki.length;i++){
            if(listaStavki[i].naziv.toLowerCase().includes(stavka)){
                postoji = true;
                break;
             }
        }
        return postoji;
    }
    static pretragaPoParametrima(unos:string){
        izlistavanjeFaktura.fakture = izlistavanjeFaktura.neFiltriraneFakture;
        izlistavanjeFaktura.trenutnaStrana = 0;
        let pronadjeneFakture:Array<Faktura>  = [];
        
        if(unos == ''){
            radSaFakturama.vratiSveFakturePreduzeca();
        }
        else{
            this.fakture.forEach(f => {
                if(unos.toString() == f.ukupno.toString() || this.postojiLiStavka(unos,f.stavkeFakture) ){
                    pronadjeneFakture.push(f);
                }

            });
            izlistavanjeFaktura.fakture = pronadjeneFakture;
            izlistavanjeFaktura.prikazFakture();
            
            
            
        }
    }
}
class radSaFakturama{
    static prikaz:HTMLElement;
    static PIB:number;
    // Potrebno je prikazati fakture po strani (jedna faktura jedna strana) kao i pretrazivanje po 
    // iznosu fakture i po stavkama fakture
    static vratiSveFakturePreduzeca(){
        //let fakture:Faktura[] = [];
        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/preduzece/"+radSaFakturama.PIB,
            "method":"GET",
            
        }).done((response)=>{
            // response.datumGenerisanja = Validacija.kraciZapisDatuma(response.datumGenerisanja);
            // response.datumValute = Validacija.kraciZapisDatuma(response.datumValute);
            izlistavanjeFaktura.fakture = response;
            izlistavanjeFaktura.neFiltriraneFakture = response;
            izlistavanjeFaktura.prikazFakture();
 
        })
        .fail((jqXHR)=>{
            izlistavanjeFaktura.prikaz.innerHTML = "";
            izlistavanjeFaktura.fakture = [];
            izlistavanjeFaktura.prikazFakture();
            $(".alert-warning").removeAttr('hidden');
            $(".alert-warning").text(jqXHR.responseText);

        })
        
        
    }
    
    static dostaviFakture = ()=>{
        this.prikaz.innerHTML = "";
        settingsGET.url = "http://localhost:5050/faktura";
        $.ajax(settingsGET)
        .done((response)=>{            
            response.forEach(f => {
                // f.datumValute = Validacija.kraciZapisDatuma(f.datumValute);
                // f.datumGenerisanja = Validacija.kraciZapisDatuma(f.datumGenerisanja);
                this.prikaz.innerHTML += 
                    `
                <tr>
                    <th scope="col">${f.pibPreduzeceKupuje}</th>
                    <th scope="col">${f.pibPreduzeceProdaje}</th>
                    <th scope="col">${f.datumGenerisanja}</th>
                    <th scope="col">${f.datumValute}</th>
                    <th scope="col"><button data-toggle="modal" data-target="#modal" onclick='radSaFakturama.prikazStavkiFakture(${f.idFakture})'  class="btn btn-info btn-sm">Prikazi stavke</button></th>
                    <th scope="col">${f.ukupno}</th>
                    <th scope="col">${f.tipFakture}</th>
                    <th scope="col"><a href='izmeniFakturu.html?${f.idFakture}'class="btn btn-info">Izmeni</a></th>
                    <th scope="col"><button class='btn btn-danger' onclick='radSaFakturama.obrisiFakturu(${f.idFakture},radSaFakturama.dostaviFakture)' >Obriši</button></th>
                </tr>
                `;
            });
        })
        .fail((err)=>{
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        })
    
    }
    
    // Moguce ponavljanje koda radSaStavkama.prikazStavki
    static prikazStavkiFakture(idFakture:number){
        settingsGET.url = "http://localhost:5050/faktura/stavke/"+idFakture;
        $.ajax(settingsGET)
        .done((response)=>{
            $("#prikazStavki").html("");
            response.forEach(s => {
                $("#prikazStavki").append(
                    `
                    <tr id="stavka">
                        <th scope="col">${s.naziv}</th>
                        <th scope="col">${s.cena}</th>
                        <th scope="col">${s.jedinicaMere}</th>
                        <th scope="col">${s.kolicina}</th>
                    </tr>
                    `
                )
                
            });
        })
        .fail(err=>{
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        })
    }
    static obrisiFakturu(idFakture:number,callback){
        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/"+idFakture,
            "method":"DELETE",
            
        }).done((response)=>{
            $(".alert-info").removeAttr("hidden");
            $(".alert-info").text(response);
            callback();
            
            
        })
        .fail((err)=>{
            $(".alert-warning").removeAttr("hidden");
            $(".alert-warning").text(err.responseText);
            callback();
            
            
        })
        
        
    }
    static izmeniFakturu(id:number,pibPreduzecaKupuje:number,pibPreduzecaProdaje:number,datumValute:string,datumGenerisanja:string,elementi:NodeListOf<Element>,tipFakture:string){
        let listaStavki:Array<StavkeFakture> = [];

        let formatiranDatumValute:Date = Validacija.stringToDate(datumValute);
        let formatiranDatumGenerisanja:Date = Validacija.stringToDate(datumGenerisanja);
    
        let proveraPibPreduzecaKupuje:boolean = Validacija.proveraPib(pibPreduzecaKupuje);
        let proveraPibPreduzecaProdaje:boolean = Validacija.proveraPib(pibPreduzecaProdaje);
        

        let ukupno:number = Number($("#ukupno").val());
        elementi.forEach(e => {
            let deca = e.children;
            var id:number = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka:StavkeFakture =  {
                "id_stavke":id,
                "naziv":naziv,
                "cena":cena,
                "jedinicaMere":jedinicaMere,
                "kolicina":kolicina
            }
            listaStavki.push(novaStavka);
        });

        if(proveraPibPreduzecaKupuje&& proveraPibPreduzecaProdaje){
            $("#pib_uspesno").removeAttr("hidden");
            let novaFaktura:Faktura = {
                idFakture:id,
                pibPreduzeceKupuje:pibPreduzecaProdaje,
                pibPreduzeceProdaje:pibPreduzecaKupuje,
                datumGenerisanja:formatiranDatumGenerisanja,
                datumValute:formatiranDatumValute,//do kad treba da se plati
                stavkeFakture:listaStavki,
                ukupno:ukupno,
                tipFakture:tipFakture
            }

            $.ajax({
                "async":true,
                "crossDomain":true,
                "url":"http://localhost:5050/faktura/izmeni/"+id,
                "method":"PUT",
                "data":JSON.stringify(novaFaktura),
                "headers":{
                    "Content-Type":"application/json"
                }
            }).done((response)=>{
                $("#uspesna_izmena").removeAttr("hidden");
                $("#uspesna_izmena").text(response);
    
            })
            .fail((jqXHR)=>{
                 $("#neuspesna_izmena").removeAttr("hidden");
                 $("#neuspesna_izmena").text(jqXHR.responseText);
            })
            }
            // Problem pri slanju post zahteva, izgleda da ajax salje get zahtev(podaci su poslati preko zaglavlja) umesto post zahteva . . . 
        else{
            $("#pib_neuspesno").removeAttr("hidden");

        }
            
            
        
    }
    static getFakturaById(id:number,pibKupuje:HTMLInputElement,pibProdaje:HTMLInputElement,datumGenerisanja:HTMLInputElement,datumValute:HTMLInputElement,ispisStavki:HTMLElement,tipFakture:HTMLInputElement,ukupno:HTMLInputElement){
        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/"+id,
            "method":"GET",
        }).done((response)=>{
            console.log(response);
            
            pibKupuje.value = response.pibPreduzeceKupuje;
            pibProdaje.value = response.pibPreduzeceProdaje;
            datumGenerisanja.value= response.datumGenerisanja.split("T")[0];
            datumValute.value= response.datumValute.split("T")[0];
            ukupno.value = response.ukupno;
            tipFakture.value = response.tipFakture;
            radSaStavkamaFakture.prikaz = ispisStavki;
            radSaStavkamaFakture.stavke = response.stavkeFakture;
            radSaStavkamaFakture.prikazStavki();

            
            
        })
        .fail((jqXHR,responseText)=>{
            alert("Greska pri dodavanju preduzeca" + responseText);
        })
            
    }
    static dodajFakturu(pibPreduzecaKupuje:number,pibPreduzecaProdaje:number,datumValute:string,datumGenerisanja:string,elementi:NodeListOf<Element>,tipFakture:string){ 
        let listaStavki:Array<StavkeFakture> = [];

        let formatiranDatumValute:Date = Validacija.stringToDate(datumValute);
        let formatiranDatumGenerisanja:Date = Validacija.stringToDate(datumGenerisanja);
    
        let proveraPibPreduzecaKupuje:boolean = Validacija.proveraPib(pibPreduzecaKupuje);
        let proveraPibPreduzecaProdaje:boolean = Validacija.proveraPib(pibPreduzecaProdaje);
        

        let ukupno:number = Number($("#ukupno").val());
        elementi.forEach(e => {
            let deca = e.children;
            var id:number = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka:StavkeFakture =  {
                "id_stavke":id,
                "naziv":naziv,
                "cena":cena,
                "jedinicaMere":jedinicaMere,
                "kolicina":kolicina
            }
            listaStavki.push(novaStavka);
        });

        if(proveraPibPreduzecaKupuje&& proveraPibPreduzecaProdaje){
            let novaFaktura:Faktura = {
                idFakture:1,
                pibPreduzeceKupuje:pibPreduzecaProdaje,
                pibPreduzeceProdaje:pibPreduzecaKupuje,
                datumGenerisanja:formatiranDatumGenerisanja,
                datumValute:formatiranDatumValute,//do kad treba da se plati
                stavkeFakture:listaStavki,
                ukupno:ukupno,
                tipFakture:tipFakture
            }

            $.ajax({
                "async":true,
                "crossDomain":true,
                "url":"http://localhost:5050/faktura/dodaj",
                "method":"POST",
                "data":JSON.stringify(novaFaktura),
                "headers":{
                    "Content-Type":"application/json"
                }
            }).done((jqXHR)=>{
                alert(jqXHR.responseText);
                $("#uspesno_dodavanje_fakture").removeAttr('hidden');
                $("#uspesno_dodavanje_fakture").text(jqXHR.responseText);
            })
            .fail((jqXHR)=>{
                alert("Greska pri dodavanju preduzeca" + jqXHR.responseText);
            })
            
        }
        else{
            $("#pib_neuspesno").removeAttr('hidden');
            $("#pib_uspesno").attr('hidden','true')
        }
        
        
        
        
    }
    
    
    
}

class radSaStavkamaFakture{
    static stavke:Array<StavkeFakture> = [];
    static prikaz:HTMLElement;
    static prikazUkupno:HTMLInputElement;
    static prikazStavki = ()=>{
        this.prikaz.innerHTML = "";
        console.log(this.stavke);
        
        let ukupno = 0;
        this.stavke.forEach(s => {
            this.prikaz.innerHTML += 
                `
                    <tr id="stavka">
                        <th scope="col">${s.naziv}</th>
                        <th scope="col">${s.cena}</th>
                        <th scope="col">${s.jedinicaMere}</th>
                        <th scope="col">${s.kolicina}</th>
                        <th scope="col"><button onclick='radSaStavkamaFakture.ukloniStavku(${s.id_stavke})' class='btn btn-danger' >Ukloni</button></th>
                        <th scope="col" hidden>${s.id_stavke}</th>
                    </tr>
                `;
            
            ukupno += s.kolicina*s.cena;
        });
        this.prikazUkupno.value = ukupno.toString();
        
    }
    static sacuvajStavkeFakture = ()=>{

    }
    static dodeliID = ()=>{
        let id:number;
        if(this.stavke.length < 1){
            return id = 1;
        }
        return id = this.stavke[this.stavke.length-1].id_stavke+1;
    }
    static dodajStavku = (naziv:string,cena:number,kolicina:number,jedinica_mere:string)=>{
        let id:number = radSaStavkamaFakture.dodeliID();
        const novaStavka:StavkeFakture = {"id_stavke":id,"naziv":naziv,"cena":cena,"kolicina":kolicina,"jedinicaMere":jedinica_mere};
        
        
        console.log(this.postojiLiStavka(novaStavka));
        
        if(this.postojiLiStavka(novaStavka) == false){
            this.stavke.push(novaStavka);
        }
        this.prikazStavki();
        
    }
    static ukloniStavku(id_stavke:number){
        const noveStavke = this.stavke.filter(s=>s.id_stavke != id_stavke);
        this.stavke = [...noveStavke];
        this.prikazStavki();
    }
    static postojiLiStavka(stavka:StavkeFakture):boolean{
        let postoji:boolean = false;
        for(let i = 0;i<this.stavke.length;i++){
            if(this.stavke[i].cena == stavka.cena && this.stavke[i].jedinicaMere == stavka.jedinicaMere && this.stavke[i].naziv == stavka.naziv){
                this.stavke[i].kolicina += stavka.kolicina;
                postoji = true;
                break;

            }
            
        }
        return postoji;
    }
}

class Validacija{
    static proveraPib(pib:number):boolean{
        let provera:boolean = false;
        if(pib.toString().length==9){
            provera = true;
        }
        return provera;

    }
    static proveraImena(ime:string){
        let ispravno:boolean = false;
        let patern = new RegExp(/[a-zA-Z][a-zA-Z ]{3,}/);
        ispravno = patern.test(ime);
        return ispravno;



    }
    static stringToDate(datum:string){
        let godinaMesecDan = datum.split("-");
        let formatiranDatum:Date = new Date(Number(godinaMesecDan[0]),Number(godinaMesecDan[1])-1,Number(godinaMesecDan[2]),new Date().getHours(),new Date().getMinutes());
        
        return formatiranDatum;

    }

    static kraciZapisDatuma(response:Faktura[] | Preduzece[]){
        // response.forEach(element => {
        //     element.datumGenerisanja = element.datumdatumGenerisanja.split("T")[0].split("-");
        //     element.datumValute = element.datumValute.split("T")[0].split("-");
        // });
        // let godinaMesecDan = datum.split("T")[0].split("-");
        // let formatiranDatum = `${godinaMesecDan[2]}-${godinaMesecDan[1]}-${godinaMesecDan[0]}`
        
        // return formatiranDatum;

    }
}


//Prikaz faktura za zeljeno preduzece


