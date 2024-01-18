// app.js
const http = require('http');
const fs = require('fs');
const os = require('os');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Read the HTML template file
        fs.readFile('index_template.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                // Get the hostname
                const hostname = os.hostname();

                // Replace placeholder with the actual hostname
                const htmlContent = data.replace('{{hostname}}', hostname);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlContent);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
