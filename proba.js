"use strict";
const listaPreduzeca = [
    { naziv: 'preduzece1', datum: new Date(2023, 6, 13) },
    { naziv: 'preduzece2', datum: new Date(2023, 7, 13) },
    { naziv: 'preduzece3', datum: new Date(2022, 2, 13) },
    { naziv: 'preduzece4', datum: new Date(2023, 6, 13) },
    { naziv: 'preduzece5', datum: new Date(2024, 7, 12) },
    { naziv: 'preduzece6', datum: new Date(2025, 2, 13) }
];
const sortirajDatume = (listaPreduzeca) => {
    const sortirani = [];
    for (let i = 0; i < listaPreduzeca.length - 1; i++) {
        for (let j = i + 1; i < listaPreduzeca.length; j++) {
            if (listaPreduzeca[i].datum > listaPreduzeca[j].datum) {
                console.log(listaPreduzeca[i].datum + " je veci od " + listaPreduzeca[j].datum);
            }
        }
    }
};
sortirajDatume(listaPreduzeca);
