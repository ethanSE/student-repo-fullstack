const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(function (req, _, next) {
    if (!req.session.visitedPaths) {
        req.session.visitedPaths = [];
    }

    // recorded previously unvisited paths
    if (!req.session.visitedPaths.some((path) => path === req.path) && req.path != '/favicon.ico') {
        req.session.visitedPaths = req.session.visitedPaths.concat(req.path);
    }

    next();
});

app.get('*', (req, res) => {
    res.write(`<h1>Currently on  route: ${req.path}</h1>`);

    if (req.session.visitedPaths.length === 1) {
        res.write(`<h1>Welcome to http://localhost:${port}</h1>`);
    } else {
        res.write('<h1>Previously visited: </h1>');
        res.write(`<ul>${req.session.visitedPaths.map((p) => `<li>${p}</li>`).join('')}</ul>`);
    }
    res.end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
