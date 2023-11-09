import { StavkeFakture } from "./stavkeFakture.model"

export interface Faktura {
    idFakture: number,
    pibPreduzeceKupuje: number,
    pibPreduzeceProdaje: number,
    datumGenerisanja: Date,
    datumValute: Date, //do kad treba da se plati
    stavkeFakture: Array<StavkeFakture>,
    ukupno: number,
    tipFakture: string
}
