const http = require('http');
const todos = require('./data');
const todos = require('./data');
const hostname = 'localhost';
const PORT = process.env.PORT || 5000;
const { getReqData } = require('./utils');


const server = http.createsServer(async (request, res) => {
    //  /api/todos : GET
    if (request.url === '/api/todos' && request.method === 'GET') {
        // read
        const todo = await new Todo().getTodos();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(todos));     // send data
    }

    //   /api/todos/:id : GET
    else if (request.url.match(/\/api\/todos\/([0-9]+)/) && request.method === 'GET') {
        try {
            const id = request.url.split('/')[3];   // get id from url
            const todo = await new Todo().getTodo(id);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });    
            res.end(JSON.stringify(todo));  // send data
        }
        catch (error) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message: error }));    // send the error
        }
    }

    // delete
    else if (request.url.match(/\/api\/todos\/([0-9]+)/) && request.method === 'DELETE') {
        try {
            const id = request.url.split('/')[3];
            let message = await new Todo().deleteTodo(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message }));   // send msg
        }
        catch (error) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message: error}));     // send error msg
        }
    }

    // update
    else if (request.url.match(/\/api\/todos\/([0-9]+)/) && request.method === 'PATCH') {
        try {
            const id = request.url.split('/')[3];
            let update_todo = await new Todo().updateTodo(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(update_todo));    // send msg
        }
        catch (error) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message: error }));    // send error msg
        }
    }

    // post
    else if (request.url == '/api/todos' && request.method === 'POST') {
        let todoData = await getReqData(request);
        let todo = await new Todo().createTodo(JSON.parse(todoData));
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(todo));
    }

    // no route 
    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ message: 'Route unavailable'}));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

// this indicates when the server is up and running
server.listen(PORT, () => {
    console.log(`Server running on PORT: http://${hostname}:${PORT}`);
});