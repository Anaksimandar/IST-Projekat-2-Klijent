"use strict";
const sum = (...array) => {
    return array.reduce((sum, next) => sum + next, 0);
};
module.exports = sum;
