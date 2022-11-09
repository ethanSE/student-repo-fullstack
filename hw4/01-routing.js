const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const getRoutes = require('../hw3/getRoutes');

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = ['welcome', 'redirect', 'redirected', 'cache', 'cookie', 'other'];
const routeResults = getRoutes(routes);

app.get('/', (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 04</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
});

app.get('/welcome', (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 04</h1>`);
    res.write(`<h1>Welcome Page!</h1>`);
    res.end();
});

app.get('/redirect', (_, res) => {
    res.writeHead(302, { Location: '/redirected' });
    res.end();
});

app.get('/redirected', (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Redirected</h1>`);
    res.end();
});

app.get('/cache', (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'max-age=86400' });
    res.write('This resource was cached');
    res.end();
});

app.get('/cookie', (_, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Set-Cookie': 'hello=world',
    });
    res.write('cookies... yummm');
    res.end();
});

app.get('*', (_, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>404 - page not found</h1>`);
    res.end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
