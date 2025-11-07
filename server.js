const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;


function serveFile(res, filePath, contentType = 'text/html', statusCode = 200) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 -Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}


const server = http.createServer((req, res) => {
    const url = req.url;

    
    switch (url) {
        case '/':
        case '/home':
            serveFile(res, path.join( 'pages', 'home.html'));
            break;
        case '/about':
            serveFile(res, path.join( 'pages', 'about.html'));
            break;
        case '/contact':
            serveFile(res, path.join( 'pages', 'contact.html'));
            break;
        default:
            serveFile(res, path.join( 'pages', '404.html'), 'text/html', 404);
    }
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
