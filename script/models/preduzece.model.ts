import { OdgovornoLice } from "./odgovornoLice.model"
import { Adresa } from "./adresa.model"

export interface Preduzece {
    pib: number,
    nazivPreduzeca: string,
    odgovornoLice: OdgovornoLice,
    adresa: Adresa,
    email: string
    telefon: string

}







