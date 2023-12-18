import { FormValidator } from "../script/helper-functions/FormValidator.js";
// Validacija imena i prezimena
describe("Provera ispravnosti validacije imena", () => {
    test("Ime mora da pocinje velikim slovom", () => {
        expect(FormValidator.validateName("ana"))
            .toBe(false);
    });
    test("Ime mora da ima minimalno 3 karaktera", () => {
        expect(FormValidator.validateName("An"))
            .toBe(false);
    });
    test("Ime mora da sadrzi samo slova", () => {
        expect(FormValidator.validateName("Aleksandar23..21?"))
            .toBe(false);
    });
});
// Validacija naziva ulice
describe("Validacija imena ulice", () => {
    test("Ulica moze da sadrzi slova i brojeve ali ne i specijalne karaktere(osim '.')", () => {
        expect(FormValidator.validateStreet("26. septembra!"))
            .toBe(false);
    });
    test("Ispravna ulica", () => {
        expect(FormValidator.validateStreet("1233 Cara Dusana"))
            .toBe(true);
    });
});
// Validacija naziva ulice
describe("Validacija broja ulice", () => {
    test("Broj ulice ne moze ciniti specijalni karakter", () => {
        expect(FormValidator.validateStreetNumber("2!"))
            .toBe(false);
    });
    test("Posle broja ulice moze da stoji samo jedno slovo", () => {
        expect(FormValidator.validateStreetNumber("2FF"))
            .toBe(false);
    });
});
// Validacija mejla
describe("Validacija email adrese", () => {
    test('Valid email', () => {
        const email = 'user@example.com';
        expect(FormValidator.validateMail(email)).toBe(true);
    });
    test('Valid email with subdomain', () => {
        const email = 'user@sub.example.com';
        expect(FormValidator.validateMail(email)).toBe(true);
    });
    test('Valid email with hyphen in domain', () => {
        const email = 'user@my-domain.com';
        expect(FormValidator.validateMail(email)).toBe(true);
    });
    test('Invalid email missing @ symbol', () => {
        const email = 'userexample.com';
        expect(FormValidator.validateMail(email)).toBe(false);
    });
    test('Invalid email with space', () => {
        const email = 'user @example.com';
        expect(FormValidator.validateMail(email)).toBe(false);
    });
    test('Invalid email with multiple @ symbols', () => {
        const email = 'user@domain@example.com';
        expect(FormValidator.validateMail(email)).toBe(false);
    });
    test('Invalid email with missing domain', () => {
        const email = 'user@.com';
        expect(FormValidator.validateMail(email)).toBe(false);
    });
    test('Invalid email with missing top-level domain', () => {
        const email = 'user@example';
        expect(FormValidator.validateMail(email)).toBe(false);
    });
});
// Validacija telefona
describe("Validacija broja telefoba", () => {
    test('Valid phone number with minimum digits', () => {
        const phoneNumber = '+381123456';
        expect(FormValidator.validatePhone(phoneNumber)).toBe(true);
    });
    test('Valid phone number with more than 6 digits', () => {
        const phoneNumber = '+381123456789';
        expect(FormValidator.validatePhone(phoneNumber)).toBe(true);
    });
    test('Invalid phone number with missing + sign', () => {
        const phoneNumber = '381123456';
        expect(FormValidator.validatePhone(phoneNumber)).toBe(false);
    });
    test('Invalid phone number with non-digit characters', () => {
        const phoneNumber = '+381abc123';
        expect(FormValidator.validatePhone(phoneNumber)).toBe(false);
    });
    test('Invalid phone number with space', () => {
        const phoneNumber = '+381 123456';
        expect(FormValidator.validatePhone(phoneNumber)).toBe(false);
    });
    test('Invalid phone number with less than 6 digits', () => {
        const phoneNumber = '+38112345';
        expect(FormValidator.validatePhone(phoneNumber)).toBe(false);
    });
});
// Validacija datum
describe("Validacija datuma", () => {
    test("Datum kreiranja fakture ne moze biti posle datuma valute (isplate)", () => {
        // yyyy-dd-mm - podrazumevan format input forme tipa date
        const datumKreiranjaFakture = "2023-12-09";
        const datumValute = "2023-12-02";
        expect(FormValidator.validateDate(datumKreiranjaFakture, datumValute))
            .toBe(false);
    });
    test("Datum kreiranja fakture ne moze biti posle datuma valute (isplate)", () => {
        // yyyy-dd-mm - podrazumevan format input forme tipa date
        const datumKreiranjaFakture = "2023-12-09";
        const datumValute = "2023-12-11";
        expect(FormValidator.validateDate(datumKreiranjaFakture, datumValute))
            .toBe(true);
    });
});
// Validacije naziva stavke 
describe("Validacija naziva stavke", () => {
    test("Naziv stavke ne moze da sadrzi specijalne karaktere osim '.' i '-' ", () => {
        expect(FormValidator.validateItemName('iphone6!2//'))
            .toBe(false);
    });
    test("Naziv stavke ne moze da ima manje od 2 karaktera", () => {
        expect(FormValidator.validateItemName('a'))
            .toBe(false);
    });
    test("Naziv stavke moze da sadrzi '.' i '-' ", () => {
        expect(FormValidator.validateItemName('bosh 80.2 version-1.3'))
            .toBe(true);
    });
});
