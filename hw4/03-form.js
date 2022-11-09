const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/submit', (req, res) => {
    const searchParams = new URLSearchParams(req.body);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<p>Name: ${searchParams.get('nameInput')}</p>`);
    res.write(`<p>Email: ${searchParams.get('emailInput')}</p>`);
    res.write(`<p>Comments: ${searchParams.get('commentInput') || 'n/a'}</p>`);
    res.write(
        `<p>Newsletter: ${
            searchParams.has('newsletter')
                ? 'Yes, sign me up for the newsletter.'
                : 'No, thank you.'
        }</p>`
    );
    res.end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
