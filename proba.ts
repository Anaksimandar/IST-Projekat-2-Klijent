const sum = (...array: number[]) => {
    return array.reduce((sum, next) => sum + next, 0);
}


module.exports = sum;

