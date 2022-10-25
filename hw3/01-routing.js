const http = require('http');
const port = process.env.PORT || 5001;
const getRoutes = require('./getRoutes');

const routes = ['welcome', 'redirect', 'redirected', 'cache', 'cookie', 'check-cookies', 'other'];
const routeResults = getRoutes(routes);

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>Exercise 01</h1>`);
            res.write(`<ul> ${routeResults} </ul>`);
            break;
        case '/welcome':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>Welcome Page!</h1>`);
            break;
        case '/redirect':
            res.writeHead(302, { Location: '/redirected' });
            break;
        case '/redirected':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>Redirected</h1>`);
            break;
        case '/cache':
            res.writeHead(200, { 'Content-Type': 'plaintext', 'Cache-Control': 'max-age=86400' });
            res.write('This resource was cached');
            break;
        case '/cookie':
            res.writeHead(200, {
                'Content-Type': 'plaintext',
                'Set-Cookie': 'hello=world',
            });
            res.write('cookies... yummm');
            break;
        case '/check-cookies':
            res.writeHead(200, { 'Content-Type': 'plaintext' });
            res.write(`${!!req.headers.cookie?.includes('hello=world')}`);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(`<h1>404 - page not found</h1>`);
            res.write(`<ul> ${routeResults} </ul>`);
    }
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
