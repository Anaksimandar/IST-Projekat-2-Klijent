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
    idStavke:number,
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
    "async":false,
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
                <tr class="preduzece">
                    <th id='pib' scope="col">${p.pib}</th>
                    <th scope="col">${p.nazivPreduzeca}</th>
                    <th scope="col">${p.odgovornoLice.ime + " "+ p.odgovornoLice.prezime}</th>
                    <th scope="col">${p.adresa.ulica +" "+ p.adresa.broj}</th>
                    <th scope="col">${p.email}</th>
                    <th scope="col">${p.telefon}</th>
                    <th scope="col"><a href='./prikazFakturaZaPreduzece.html?${p.pib}' class="btn btn-info">Prikaz faktura</button></th>
                    <th scope="col"><button id="${p.pib}" data-toggle="modal" data-target="#prikazi_bilans" class='btn btn-info prikaziBilans'>Bilans</button></th>
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
    static getPreduzeceByPib(pib:string):Preduzece{
        var pronadjenoPreduzece:Preduzece;
        console.log(pib);
        
        $.ajax({
            "async":false,
            "crossDomain":true,
            "url":"http://localhost:5050/preduzece/"+pib,
            "method":"GET",
            
        }).done((response)=>{
            pronadjenoPreduzece = response;
        })
        .fail((jqXHR)=>{
            console.log(jqXHR);
            
            alert(jqXHR.responseText);
        })
        return pronadjenoPreduzece;
    }
    static izmeniPreduzece(pib:number,naziv:JQuery,ime:JQuery,prezime:JQuery,ulica:JQuery,broj:JQuery,mejl:JQuery,telefon:JQuery){

        var naziv:string = naziv.val();
        var ime = ime.val();
        var prezime = prezime.val();
        var telefon = telefon.val();
        var mejl = mejl.val();
        var ulica = ulica.val();
        var broj = broj.val();
        let odgovornoLice:OdgovornoLice = {
            ime:ime,
            prezime: prezime
        }
        let adresa:Adresa = {
            ulica: ulica,
            broj: broj,
        }
        let novoPreduzece:Preduzece = {
            pib:pib,
            nazivPreduzeca: naziv,
            odgovornoLice:odgovornoLice,
            adresa:adresa,
            email: mejl,
            telefon: telefon
        }
        console.log(novoPreduzece);
        
        
        
        
        if(Validacija.proveraPib(pib) == true && Validacija.proveraImena(ime)&& Validacija.proveraImena(prezime)){
            
            $.ajax({
                "async":false,
                "crossDomain":true,
                "url":"http://localhost:5050/preduzece/izmeni/"+pib,
                "method":"PUT",
                "data":JSON.stringify(novoPreduzece),
                "headers": {
                    "Content-Type": "application/json"
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
        .fail((jqXHR)=>{
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
    static prikaziBilans(pib:number,datum_od:string,datum_do:string,prikaz:JQuery){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/bilans/" + pib + "/" + datum_od + "/" + datum_do,
            "method": "GET",
            "headers":{
                "Content-Type": "application/json"
            }

        }).done((response) => {
            prikaz.html("Bilans: " + response);
        
        })
        .fail((jqXHR) => {
            prikaz.html(jqXHR.responseText)     
        })
    }
    

}
class izlistavanjeFaktura{
    
    
}
class radSaFakturama{
    static prikaz:HTMLElement;
    static fakture:Faktura[] = [];
    static filtriraneFakture:Faktura[] = [];
    static PIB:number;
    // Potrebno je prikazati fakture po strani (jedna faktura jedna strana) kao i pretrazivanje po 
    // iznosu fakture i po stavkama fakture
    static vratiSveFakturePreduzeca(){
        //let fakture:Faktura[] = [];
        $.ajax({
            "async":false,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/preduzece/"+radSaFakturama.PIB,
            "method":"GET",
            
        }).done((response)=>{
            izlistavanjeFaktura.fakture = response;
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
        settingsGET.url = "http://localhost:5050/faktura";
        $.ajax(settingsGET)
        .done((response)=>{            
            this.fakture = response;
            
        })
        .fail((err)=>{
            $(".alert").removeAttr("hidden");
            $(".alert").text(err.responseText);
        })
    
    }

    static prikazFaktura(fakture:Faktura[]){
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
                    <th scope="col"><button data-toggle="modal" data-target="#modal" onclick='radSaFakturama.prikazStavkiFakture(${f.idFakture})'  class="btn btn-info btn-sm">Prikazi stavke</button></th>
                    <th scope="col">${f.ukupno}</th>
                    <th scope="col">${f.tipFakture}</th>
                    <th scope="col"><a href='izmeniFakturu.html?${f.idFakture}'class="btn btn-info">Izmeni</a></th>
                    <th scope="col"><button class='btn btn-danger' onclick='radSaFakturama.obrisiFakturu(${f.idFakture})' >Obriši</button></th>
                </tr>
                `;
        });
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
    static obrisiFakturu(idFakture:number){
        $.ajax({
            "async":false,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/"+idFakture,
            "method":"DELETE",
            
        }).done((response)=>{
            $("#uspesnoBrisanjeFaktureAlert").removeAttr("hidden");
            $("#uspesnoBrisanjeFaktureAlert").text("Faktura je uspesno obrisana");
            this.fakture = response;
            radSaFakturama.prikazFaktura(radSaFakturama.fakture);
            
            
        })
        .fail((err)=>{
            $(".alert-warning").removeAttr("hidden");
            $(".alert-warning").text(err.responseText);
            
            
        })
        
        
    }
    static izmeniFakturu(idFakture:number,pibPreduzecaKupuje:number,pibPreduzecaProdaje:number,datumValute:string,datumGenerisanja:string,elementi:NodeListOf<Element>,tipFakture:string){
        let listaStavki:Array<StavkeFakture> = [];

        let ukupno:number = Number($("#ukupno").val());
        elementi.forEach(e => {
            let deca = e.children;
            var id:number = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka:StavkeFakture =  {
                "idStavke":id,
                "naziv":naziv,
                "cena":cena,
                "jedinicaMere":jedinicaMere,
                "kolicina":kolicina
            }
            listaStavki.push(novaStavka);
        });

        let novaFaktura:Faktura = {
            idFakture:idFakture,
            pibPreduzeceKupuje:pibPreduzecaKupuje,
            pibPreduzeceProdaje:pibPreduzecaProdaje,
            datumGenerisanja: new Date(datumGenerisanja),
            datumValute: new Date(datumValute),
            stavkeFakture:listaStavki,
            ukupno:ukupno,
            tipFakture:tipFakture


        }
        console.log(novaFaktura);
        
        

        $.ajax({
            "async":true,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/izmeni/"+idFakture,
            "method":"PUT",
            "data":JSON.stringify(novaFaktura),
            "headers":{
                "Content-Type":"application/json"
            }
        }).done((response)=>{
            console.log(response);
            $("#obavestenjeDodavanjeFaktureUspesno").removeAttr("hidden");
            $("#obavestenjeDodavanjeFaktureUspesno").text(response);

        })
        .fail((jqXHR)=>{
             $("#obavestenjeDodavanjeFaktureGreska").removeAttr("hidden");
             $("#obavestenjeDodavanjeFaktureGreska").text(jqXHR.responseText);
        })
        
            
        
    }

    static getFakturaById(id:number):Faktura{
        var pronadjenaFaktura:Faktura;
        $.ajax({
            "async":false,
            "crossDomain":true,
            "url":"http://localhost:5050/faktura/"+id,
            "method":"GET",
        }).done((response)=>{
            pronadjenaFaktura = response;  
        })
        .fail((jqXHR,responseText)=>{
            alert("Faktura ne postoji" + responseText);
        })

        return pronadjenaFaktura;
        
    }
    static dodajFakturu(pibPreduzecaKupuje:number,pibPreduzecaProdaje:number,datumValute:string,datumGenerisanja:string,elementi:NodeListOf<Element>,tipFakture:string){ 
        let listaStavki:Array<StavkeFakture> = [];

        let formatiranDatumValute:Date = Validacija.stringToDate(datumValute);
        let formatiranDatumGenerisanja:Date = Validacija.stringToDate(datumGenerisanja);
    
        let proveraPibPreduzecaKupuje:boolean = Validacija.proveraPib(pibPreduzecaKupuje);
        let proveraPibPreduzecaProdaje:boolean = Validacija.proveraPib(pibPreduzecaProdaje);
        console.log(proveraPibPreduzecaKupuje);
        console.log(proveraPibPreduzecaProdaje);
        
        

        let ukupno:number = Number($("#ukupno").val());
        elementi.forEach(e => {
            let deca = e.children;
            var id:number = parseInt(deca[5].innerHTML);
            var naziv = deca[0].innerHTML;
            var cena = parseInt(deca[1].innerHTML);
            var jedinicaMere = deca[2].innerHTML;
            var kolicina = parseInt(deca[3].innerHTML);
            var novaStavka:StavkeFakture =  {
                "idStavke":id,
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
            console.log(novaFaktura);
            

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
                $("#obavestenjeDodavanjeFaktureUspesno").removeAttr('hidden').text(jqXHR);
            })
            .fail((jqXHR)=>{
                console.log(jqXHR);
                $("#obavestenjeDodavanjeFaktureGreska").removeAttr('hidden').text(jqXHR.responseText);
                
            })
            
        }
        else{
            $("#pib_neuspesno").removeAttr('hidden');
            $("#pib_uspesno").attr('hidden','true')
        }
        
        
        
        
    }
    
    static filtrirajFakture(unos:string){       
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:5050/faktura/filtriraj/"+unos.toString(),
            "method": "GET"
        }).done((response) => {
            radSaFakturama.filtriraneFakture = response;
            radSaFakturama.prikazFaktura(radSaFakturama.filtriraneFakture);
        })
        .fail((jqXHR) => {
            console.log(jqXHR);

        })

    }
    
    
}

class radSaStavkamaFakture{
    static stavke:Array<StavkeFakture> = [];
    static prikaz:HTMLElement;
    static prikazUkupno:JQuery;
    static prikazStavki = ()=>{
        this.prikaz.innerHTML = "";
        console.log(this.stavke);
        
        let ukupno = 0;
        console.log(this.stavke);
        
        this.stavke.forEach(s => {
            this.prikaz.innerHTML += 
                `
                    <tr id="stavka">
                        <th scope="col">${s.naziv}</th>
                        <th scope="col">${s.cena}</th>
                        <th scope="col">${s.jedinicaMere}</th>
                        <th scope="col">${s.kolicina}</th>
                        <th scope="col"><button onclick='radSaStavkamaFakture.ukloniStavku(${s.idStavke})' class='btn btn-danger'>Ukloni</button></th>
                        <th scope="col" hidden>${s.idStavke}</th>
                    </tr>
                `;
            
            ukupno += s.kolicina*s.cena;
        });
        console.log(ukupno);
        
        this.prikazUkupno.val(ukupno.toString());
        
    }
    static sacuvajStavkeFakture = ()=>{

    }
    static dodeliID = ()=>{
        let id:number;
        if(this.stavke.length < 1){
            return id = 1;
        }
        return id = this.stavke[this.stavke.length-1].idStavke+1;
    }
    static dodajStavku = (naziv:string,cena:number,kolicina:number,jedinica_mere:string)=>{
        let id:number = radSaStavkamaFakture.dodeliID();
        const novaStavka:StavkeFakture = {"idStavke":id,"naziv":naziv,"cena":cena,"kolicina":kolicina,"jedinicaMere":jedinica_mere};
        
        this.stavke.push(novaStavka);
        this.prikazStavki();
        
    }
    static ukloniStavku(idStavke:number){
        console.log(idStavke);
        
        const noveStavke = this.stavke.filter(s=>s.idStavke != idStavke);
        console.log(noveStavke);
        
        this.stavke = [...noveStavke];
        this.prikazStavki();
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

    static kraciZapisDatuma(neobradjenDatum:string){
        console.log(neobradjenDatum);
        
        let formatiranDatum = neobradjenDatum.split("T")[0];
        return formatiranDatum;

    }
}


//Prikaz faktura za zeljeno preduzece


