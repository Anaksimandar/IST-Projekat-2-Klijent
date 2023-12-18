export class Validacija {
    static proveraPib(pib) {
        let provera = false;
        if (pib.toString().length == 9) {
            provera = true;
        }
        return provera;
    }
    static proveraImena(ime) {
        let ispravno = false;
        let patern = new RegExp(/[a-zA-Z][a-zA-Z ]{3,}/);
        ispravno = patern.test(ime);
        return ispravno;
    }
    static stringToDate(datum) {
        let godinaMesecDan = datum.split("-");
        let formatiranDatum = new Date(Number(godinaMesecDan[0]), Number(godinaMesecDan[1]) - 1, Number(godinaMesecDan[2]), new Date().getHours(), new Date().getMinutes());
        return formatiranDatum;
    }
    static kraciZapisDatuma(neobradjenDatum) {
        console.log(neobradjenDatum);
        let formatiranDatum = neobradjenDatum.split("T")[0];
        return formatiranDatum;
    }
}
Validacija.izracunajBrojStranica = (brojElemenata) => {
    // ukupno = 5 brojStrana = 1 / ukupno 12 brojStrana 3
    // brojElemenata = 0; return 0;
    // brojStrana = brojElemenata / 3; if (brojStrana%5!--0){brojStrana++}
    let ukupno = Math.floor(brojElemenata / 5);
    if (brojElemenata % 5 != 0) {
        ukupno++;
    }
    return ukupno;
};
Validacija.postavljanjeAktivneStrane = (brojStrane) => {
    // pamticemo poslednju aktivnu i trenuto aktivnu stranicu 
    var stranice = document.getElementsByClassName("page-link");
    console.log(stranice + "stranica");
    for (let i = 0; i < stranice.length; i++) {
        if (parseInt(stranice[i].getAttribute("id")) == brojStrane) { //izlistavanjeFaktura.brojStrane
            stranice[i].classList.add('active');
        }
        else {
            stranice[i].classList.remove('active');
        }
    }
};
