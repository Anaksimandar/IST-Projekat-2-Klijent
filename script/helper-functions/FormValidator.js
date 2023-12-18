export class FormValidator {
    static validatePib(element) {
        return element.toString().length == 8;
    }
    static validateName(name) {
        return /^[A-Z][a-z]{2,}$/.test(name);
    }
    static validateStreet(street) {
        return /^[A-Za-z0-9.][A-Za-z0-9. ]{1,}$/.test(street);
    }
    static validateStreetNumber(number) {
        return /^\d{1,}[A-Za-z]?$/.test(number); // broj ulice moze biti broj ali i kombinacija broj/tekst npr. 22a 
    }
    static validateMail(mail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    }
    static validatePhone(telefon) {
        return /^\+381\d{6,}$/.test(telefon);
    }
    static validateDate(date1, date2) {
        let formatiranDatum1 = new Date(date1);
        let formatiranDatum2 = new Date(date2);
        return formatiranDatum1 < formatiranDatum2;
    }
    static validateItemName(itemName) {
        return /^[A-Za-z0-9. -]*$/.test(itemName) && itemName.length > 1;
    }
    static validateItemAmount(itemAmount) {
        return itemAmount > 0;
    }
}
// validation rules
// PreduzeceValidation      
// naziv: JQuery, min 2 chars 
// pib: JQuery, exacly 9 digits + just digits
// ime: JQuery, min 3 chars + just chars
// prezime: JQuery, min 3 chars + just chars
// ulica: JQuery, min 3 chars
// broj: JQuery, min 1 char (number || string)
// mejl: JQuery, mailValidation
// telefon: JQuery +381 min 9 digits
// FakturaValidation
// pibProdaje: boolean, exacly 9 digits
// pibKupuje: boolean, exacly 9 digits
// datumGenerisanja: boolean, automatic
// datumValute: boolean, automatic
// naziv: boolean, min 2 chars (string || number)
// cena: boolean, min 1 digit 
// kolicina: boolean, min 1 digit
// jedinicaMere: boolean min 1 char / digit
