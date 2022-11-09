const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

// Add your code here
app.get('/', (_, res) => {
    // render pug template for the index.html file
    res.render('index', {
        heading: 'Countries of the World',
        main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
    });
});

app.get('/capitals', (_, res) => {
    // map the output array to create an array with country names and capitals
    // check for empty data in the output array

    fetch(url)
        .then((response) => response.json())
        .then((countries) => countries.map((c) => `${c.name.common} - ${c.capital?.[0] || 'none'}`))
        .then((countryStrings) => countryStrings.sort((a, b) => a.localeCompare(b)))
        .then((sortedCountryStrings) =>
            res.render('page', {
                heading: 'Countries and Capitals',
                results: sortedCountryStrings,
            })
        );
});

app.get('/populous', (_, res) => {
    // filter the output array for the countries with population of 50 million or more
    // sort the resulting array to show the results in order of population
    // map the resulting array into a new array with the country name and formatted population

    fetch(url)
        .then((response) => response.json())
        .then((countries) => countries.filter((c) => c.population > 50000000))
        .then((countries) => countries.sort((a, b) => b.population - a.population))
        .then((countries) =>
            countries.map((c) => `${c.name.common} - ${c.population.toLocaleString()}`)
        )
        .then((populous) =>
            res.render('page', {
                heading: 'Most Populous Countries',
                results: populous,
            })
        );
});

app.get('/regions', (_, res) => {
    // reduce the output array in a resulting object that will feature the numbers of countries in each region
    // disregard empty data from the output array

    fetch(url)
        .then((response) => response.json())
        .then((countries) =>
            countries.reduce(
                (prev, curr) => ({
                    ...prev,
                    [curr.region]: prev?.[curr.region] + 1 || 1,
                }),
                {}
            )
        )
        .then((regionCountsObj) =>
            Object.entries(regionCountsObj).map(([region, count]) => `${region} - ${count}`)
        )
        .then((regionCountsStrings) => {
            res.render('page', {
                heading: 'Regions of the World',
                results: regionCountsStrings,
            });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
