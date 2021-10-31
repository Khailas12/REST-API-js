const http = require('http');
const todos = require('./data');
const todos = require('./data');
const hostname = 'localhost';
const PORT = process.env.PORT || 5000;
const { getReqData } = require('./utils');


const server = http.createServer(async (request, res) => {
    //  /api/todos : GET
    if (request.url === '/api/todos' && request.method === 'GET') {
        // read
        const todos = await new todos().getTodos();
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify(todos));     // send data
    }

    else if (request.url.match(/\/api\/([0-9]+)/) && request.method==='GET') {
        try {
            const id = request.url.split('/')[3];               // get id from url 
            const todo = await new Todo().getTodos(id);
            request.writeHead(200, {
                'Content-type': 'application/json'
            });
        }
        catch(error) {
            request.writeHead(404, {
                'Content-type': 'application/json'
            });
            request.end(JSON.stringify({ message: error }));
        }
    }

    // delete
    else if (request.url.match(/\/api\/todos\/([0-9]+)/) && request.method==='DELETE');
    try {9
        const id = request.url.split('/')[3];
        let message = await new Todo().deleteTodo(id);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        req.end(JSON.stringify({ message}));    // send message
    } 
    catch (error) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });     // send status code and content-type

        res.end(JSON.stringify({ message: error }));    // send the error
    }
    
});




// this indicates when the server is up and running
server.listen(PORT, () => {
    console.log(`Server running on PORT: http://${hostname}:${PORT}`);
});