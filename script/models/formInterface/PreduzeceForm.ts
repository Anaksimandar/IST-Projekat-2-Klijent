export interface PreduzeceForm {
    naziv: JQuery,
    pib: JQuery,
    ime: JQuery,
    prezime: JQuery,
    ulica: JQuery,
    broj: JQuery,
    mejl: JQuery,
    telefon: JQuery
}

export interface PreduzeceValidation{
    naziv: boolean,
    pib: boolean,
    ime: boolean,
    prezime: boolean,
    ulica: boolean,
    broj: boolean,
    mejl: boolean,
    telefon: boolean
}