var _a;
export class radSaStavkamaFakture {
    static ukloniStavku(idStavke) {
        const noveStavke = this.stavke.filter(s => s.idStavke != idStavke);
        this.stavke = [...noveStavke];
        console.log(this.stavke, "stavke update");
        this.prikazStavki();
    }
}
_a = radSaStavkamaFakture;
radSaStavkamaFakture.stavke = [];
radSaStavkamaFakture.prikazStavki = () => {
    _a.prikaz.html("");
    console.log(_a.stavke);
    let ukupno = 0;
    _a.stavke.forEach(s => {
        _a.prikaz.append(`
                    <tr class="stavka">
                        <th scope="col">${s.naziv}</th>
                        <th scope="col">${s.cena}</th>
                        <th scope="col">${s.jedinicaMere}</th>
                        <th scope="col">${s.kolicina}</th>
                        <th scope="col"><button id=${s.idStavke} class='btn btn-danger obrisiStavku'>Ukloni</button></th>
                    </tr>
                `);
        ukupno += s.kolicina * s.cena;
    });
    console.log(ukupno);
    _a.prikazUkupno.val(ukupno);
};
radSaStavkamaFakture.sacuvajStavkeFakture = () => {
};
radSaStavkamaFakture.dodeliID = () => {
    let id;
    if (_a.stavke.length < 1) {
        return id = 1;
    }
    return id = _a.stavke[_a.stavke.length - 1].idStavke + 1;
};
radSaStavkamaFakture.dodajStavku = (naziv, cena, kolicina, jedinica_mere) => {
    let id = _a.dodeliID();
    const novaStavka = { "idStavke": id, "naziv": naziv, "cena": cena, "kolicina": kolicina, "jedinicaMere": jedinica_mere };
    _a.stavke.push(novaStavka);
    _a.prikazStavki();
};
