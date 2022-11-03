const http = require('http');
const port = process.env.PORT || 5001;
const getRoutes = require('./getRoutes');

const buildTable = (paramTuples) => {
    return `<table>${paramTuples.map((tup) => buildRow(tup)).join('')}</table>`;
};
const buildRow = ([key, value]) => {
    return `<tr><td>${key}</td><td>${value}</td></tr>`;
};

const server = http.createServer((req, res) => {
    const routes = [
        'attributes?hello=world&lorem=ipsum',
        'items?first=1&second=2&third=3&fourth=4',
        'characters?spongebob=squarepants&patrick=star&sandy=cheeks',
    ];

    const routeResults = getRoutes(routes);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = [...url.searchParams.entries()];

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);

    if (params.length) res.write(buildTable(params));

    res.end();
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//test
