const data = require('./data');

class Controller {
    async getTodos() {  // accessing all the data
        // promise represents either completion or failure of a user task.
        return new Promise((resolve, _) => {
            resolve(data);
        });
    }
    
    // create
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo,
            };
            resolve(newTodo);   // returns the new created todo
        });
    }

    // read 
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));

            if (todo) {
                resolve(todo);
            }
            else {
                reject(`Todo with id ${id} unavailable`);
            }
        });
    }

    // update
    async updateTodo(id) {
        return new Promise((resolve, _) => {
            let todo = data.find((todo) => todo.id === parseInt(id));

            if (!todo) {    // if no todo
                reject(`Todo with id ${id} unavailable`);
            }
            todo['completed'] = true;    // updates in here
            resolve(todo);  // returns the updated todo
        });
    }

    // delete
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            
            if (!todo) {
                reject(`Todo with id ${id} unavailable`);
            }
            resolve('Todo deleted succesfully')
        });
    }
}
module.exports = Controller;