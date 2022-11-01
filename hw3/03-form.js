const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// http://localhost:5001/submit should return all the data the user entered

const server = http.createServer((req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        switch (url.pathname) {
            case '/':
                res.writeHead(302, { Location: '/form' });
                break;
            case '/form':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(formText);
                break;
            case '/submit':
                const searchParams = new URLSearchParams(body);
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
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(`<h1>404 - page not found</h1>`);
        }
        res.end();
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const formText = `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>03 - Form</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
</head>

<body class="bg-dark">
    <form method="post" action="/submit" class="bg-light border rounded w-50 mx-auto mt-5 p-3">
        <h1 class="mt-2 mb-4">Contact Form</h1>
        <div class="form-group w-auto mb-4">
            <label for="nameInput">Name * </label>
            <input name="nameInput" type="text" class="form-control" id="nameInput" required autofocus />
        </div>
        <div class="form-group w-auto mb-4">
            <label for="emailInput">Email * </label>
            <input name="emailInput" type="email" class="form-control" id="emailInput" required />
        </div>
        <div class="form-group w-auto mb-4">
            <label for="input">Submit your message: </label>
            <textarea name="commentInput" class="form-control" id="textarea"></textarea>
        </div>
        <div class="form-check m-2">
            <input name="newsletter" class="form-check-input" type="checkbox" value="" id="newsletter">
            <label class="form-check-label" for="newsletter">
                Sign up for the newsletter
            </label>
        </div>
        <div class="d-flex justify-content-between">
            <input type="submit" class="btn btn-primary flex-fill m-2" value="Submit" id="reverse" />
            <input type="reset" class="btn btn-secondary flex-fill m-2" value="Reset" id="reverse" />
        </div>
    </form>
</body>`;
