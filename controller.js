const data = require('./data');

class Controller {
    async getTodos() {  // accessing all todos
        return new Promise((resolve, _) => {
            resolve(data);
        });
    }

    // accesing single todo
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => {
                todo.id === parseInt(id)
            });

            if (todo) {
                resolve(todo);
            }
            else {
                reject(`Todo with id ${id} unavailable`);
            }
        });
    }

    // creating
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            let newTodo = {
                id: Math.floot(4 + Math.random() * 10),
                ...todo,
            };
            resolve(newTodo);   // returns the new created todo

        });
    }

    // updating
    async updateTodo(id) {
        return new Promise((resolve, _) => {
            let todo = data.find((todo) => todo.id === parseInt(id));

            if (!todo) {    // if no todo
                reject(`Todo with id ${id} unavailable`);
            }
            todo['competed'] = true;    // updates in here
            resolve(todo);  // returns the updated todo
        });
    }

    // deleting
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            
            if (!todo) {
                return(`Todo with id ${id} unavailable`);
            }
            resolve('Todo deleted succesfully')
        });
    }
}
module.exports = Controller;