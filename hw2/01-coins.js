/** Exercise 01 - Coins **/
const makeCoin = (singular, plural, value) => ({
    singular,
    plural,
    value,
});

//array of tuples of name and value of coins
const coins = [
    makeCoin('dollar', 'dollars', 100),
    makeCoin('quarter', 'quarters', 25),
    makeCoin('dime', 'dimes', 10),
    makeCoin('nickel', 'nickels', 5),
    makeCoin('penny', 'pennies', 1),
];

const calculateChange = (input) => {
    const cents = Math.floor(input * 100);
    if (Number.isNaN(cents) || cents < 0 || cents > 1000) {
        return 'Error: invalid input';
    } else {
        const { counts } = coins.reduce(outputReducer, {
            centsRemaining: cents,
            counts: [],
        });
        return `$${input} ==> ${counts.join(', ')}`;
    }
};

// calculate coin counts
const outputReducer = (acc, coin) => {
    const quantity = Math.floor(acc.centsRemaining / coin.value);

    let counts = acc.counts;
    if (quantity > 0) {
        counts = counts.concat(`${quantity} ${quantity === 1 ? coin.singular : coin.plural}`);
    }

    return {
        centsRemaining: acc.centsRemaining % coin.value,
        counts,
    };
};

module.exports = calculateChange;

function main() {
    console.log(calculateChange(process.argv[2]));
}

main();
