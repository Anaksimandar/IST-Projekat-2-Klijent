import { StavkeFakture } from './models/stavkeFakture.model.js'

export class radSaStavkamaFakture {

    static stavke: Array<StavkeFakture> = [];
    static prikaz: JQuery;
    static prikazUkupno: JQuery;

    static prikazStavki = () => {
        this.prikaz.html("");
        console.log(this.stavke);

        let ukupno = 0;
        this.stavke.forEach(s => {
            this.prikaz.append(
                `
                    <tr class="stavka">
                        <th scope="col">${s.naziv}</th>
                        <th scope="col">${s.cena}</th>
                        <th scope="col">${s.jedinicaMere}</th>
                        <th scope="col">${s.kolicina}</th>
                        <th scope="col"><button id=${s.idStavke} class='btn btn-danger obrisiStavku'>Ukloni</button></th>
                    </tr>
                `
            );
            ukupno += s.kolicina * s.cena;
        });

        console.log(ukupno);

        this.prikazUkupno.val(ukupno);

    }

    static sacuvajStavkeFakture = () => {

    }

    static dodeliID = () => {
        let id: number;
        if (this.stavke.length < 1) {
            return id = 1;
        }
        return id = this.stavke[this.stavke.length - 1].idStavke + 1;
    }

    static dodajStavku = (naziv: string, cena: number, kolicina: number, jedinica_mere: string) => {
        let id: number = radSaStavkamaFakture.dodeliID();
        const novaStavka: StavkeFakture = { "idStavke": id, "naziv": naziv, "cena": cena, "kolicina": kolicina, "jedinicaMere": jedinica_mere };

        this.stavke.push(novaStavka);
        this.prikazStavki();

    }

    static ukloniStavku(idStavke: number) {

        const noveStavke = this.stavke.filter(s => s.idStavke != idStavke);

        this.stavke = [...noveStavke];

        console.log(this.stavke, "stavke update");
        this.prikazStavki();
    }

}