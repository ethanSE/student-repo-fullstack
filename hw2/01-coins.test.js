const calculateChange = require('./01-coins.js');

describe('coins', () => {
    test('4.62', () => {
        expect(calculateChange(4.62)).toBe('$4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies');
    });

    test('9.74', () => {
        expect(calculateChange(9.74)).toBe('$9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies');
    });

    test('0.16', () => {
        expect(calculateChange(0.16)).toBe('$0.16 ==> 1 dime, 1 nickel, 1 penny');
    });

    test('too large 15.11', () => {
        expect(calculateChange(15.11)).toMatch('Error');
    });
});
