// Importing required modules from Node.js core
const http = require('http');      // To create the web server
const fs = require('fs');          // To read files from the system
const path = require('path');      // To work with file and folder paths

// Port number where our server will run
const PORT = 3000;


function serveFile(res, filePath, contentType = 'text/html', statusCode = 200) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If something goes wrong while reading file
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Server Error');
        } else {
            // If everything is fine, send back the content
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

// Creating the main server
const server = http.createServer((req, res) => {
    const url = req.url; // This gives the current route requested by the user

    // Based on route, we serve different pages
    switch (url) {
        case '/':
        case '/home':
            // Serve home page
            serveFile(res, path.join('pages', 'home.html'));
            break;

        case '/about':
            // Serve about page
            serveFile(res, path.join('pages', 'about.html'));
            break;

        case '/contact':
            // Serve contact page
            serveFile(res, path.join('pages', 'contact.html'));
            break;

        default:
            // For any invalid route, show 404 page
            serveFile(res, path.join('pages', '404.html'), 'text/html', 404);
    }
});

// Start the server and print a message when it’s ready
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
