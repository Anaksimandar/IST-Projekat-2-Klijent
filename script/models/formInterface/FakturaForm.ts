export interface FakturaForm {
    pibProdaje: JQuery,
    pibKupuje: JQuery,
    datumGenerisanja: JQuery,
    datumValute: JQuery,
    nazivStavke: JQuery,
    cenaStavke: JQuery,
    kolicinaStavke: JQuery,
    jedinicaStavke: JQuery
}

export interface FakturaValidation{
    pibProdaje: boolean,
    pibKupuje: boolean,
    datumGenerisanja: boolean,
    datumValute: boolean,
    nazivStavke: boolean,
    cenaStavke: boolean,
    kolicinaStavke: boolean,
    jedinicaStavke: boolean
}
