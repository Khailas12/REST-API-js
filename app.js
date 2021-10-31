const http = require('http');
const hostname = 'localhost'
const PORT = process.env.PORT || 5000;


const server = http.createServer(async (req, res) => {
    // to set the request route/url
    if (req.url === '/api' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });  //response headers

        res.write('Hello World');   // set response
        res.end();
    } 
    
    // if there's no route
    else {    
        res.writeHead(400, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify({ message: 'Route unavailable'}));
    }
});


// this indicates when the server is up and running
server.listen(PORT, () => {
    console.log(`Server running on PORT: http://${hostname}:${PORT}`);
});