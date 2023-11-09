export class Validacija {
    static proveraPib(pib: number): boolean {
        let provera: boolean = false;
        if (pib.toString().length == 9) {
            provera = true;
        }
        return provera;

    }
    static proveraImena(ime: string) {
        let ispravno: boolean = false;
        let patern = new RegExp(/[a-zA-Z][a-zA-Z ]{3,}/);
        ispravno = patern.test(ime);
        return ispravno;



    }
    static stringToDate(datum: string) {
        let godinaMesecDan = datum.split("-");
        let formatiranDatum: Date = new Date(Number(godinaMesecDan[0]), Number(godinaMesecDan[1]) - 1, Number(godinaMesecDan[2]), new Date().getHours(), new Date().getMinutes());

        return formatiranDatum;

    }

    static kraciZapisDatuma(neobradjenDatum: string) {
        console.log(neobradjenDatum);

        let formatiranDatum = neobradjenDatum.split("T")[0];
        return formatiranDatum;

    }

    static izracunajBrojStranica = (brojElemenata: number) => {
        // ukupno = 5 brojStrana = 1 / ukupno 12 brojStrana 3

        // brojElemenata = 0; return 0;
        // brojStrana = brojElemenata / 3; if (brojStrana%5!--0){brojStrana++}
        let ukupno: number = Math.floor(brojElemenata / 5);
        if (brojElemenata % 5 != 0) {
            ukupno++;
        }

        return ukupno;
    }

    static postavljanjeAktivneStrane = (brojStrane:number) => { // izmena
        // pamticemo poslednju aktivnu i trenuto aktivnu stranicu 
        var stranice: HTMLElement[] = document.getElementsByClassName("page-link");
        console.log(stranice + "stranica");

        for (let i = 0; i < stranice.length; i++) {

            if (parseInt(stranice[i].getAttribute("id")) == brojStrane) { //izlistavanjeFaktura.brojStrane
                stranice[i].classList.add('active');
            }
            else {
                stranice[i].classList.remove('active');
            }
        }



    }
}
