const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
    const routes = [
        'welcome',
        'redirect',
        'redirected',
        'cache',
        'cookie',
        'check-cookies',
        'other',
    ];

    const getRoutes = () => {
        return routes.reduce(
            (acc = '', elem) => acc.concat(`<li><a href="/${elem}">${elem}</a></li>`),
            ''
        );
    };

    const routeResults = getRoutes();

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
            res.write(`<h1>Error: 404 Invalid route, ${req.url} does not exist</h1>`);
            res.write(`<ul> ${routeResults} </ul>`);
    }
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
