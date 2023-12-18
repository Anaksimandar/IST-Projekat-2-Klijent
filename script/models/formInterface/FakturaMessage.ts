export const fakturaMessage = (nazivElementa:string, isValid:boolean)=>{
    switch(nazivElementa){
        case "pibKupuje":
        case "pibProdaje":
            return isValid ? "":"PIB koji ste uneli je nevalidan";
        case "datumValute":
        case "datumGenerisanja":
            return isValid ? "" : "Datum valute ne moze da bude pre datuma generisanja"
        case "kolicinaStavke":
            return isValid ? "" : "Kolicina mora biti veca od 0";
        case "nazivStavke":
            return isValid ? "" : "Naziv stavke mora da sadrzi bar 2 karaktera i ne moze da sadrzi specijalne karaktere osim ('.' i '-')"
        case "cenaStavke":
            return isValid ? "" : "Cena stavke mora biti veca od 0"
        default:
            return isValid ? "" : "Neispravni podaci"
    }
}
