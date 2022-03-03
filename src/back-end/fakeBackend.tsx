
export interface Todo {
    data: {
        id: number
        state: State
        title: string
        description: string
    }
}
export enum State {
    TODO = "à faire",
    INPROGRESS = 'En cours',
    DONE = "terminée"
}
var objectKey = 0;
export var incrementKey = () => {
    objectKey++;
    return objectKey;
}

let todos: Todo[] = []


export function configureFakeBackend() {
    let realFetch: any = window.fetch;
    window.fetch = function (url: any, opts: any) {
        const { method, }: any = opts;

        const body: any = opts && opts.body && JSON.parse(opts.body)

        return new Promise((resolve: any, reject: any) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/add') && method === 'POST':
                        return addTodo();
                    case url.endsWith('/update') && method === 'UPDATE':
                        return updateTodo();
                    case url.endsWith('/todos') && method === 'GET':
                        return getTodos();
                    case url.endsWith('/todo') && method === 'GET':
                        return getTodo();
                    case url.endsWith('/remove') && method === 'DELETE':
                        return deleteTodo();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then((response: any) => resolve(response))
                            .catch((error: any) => reject(error));
                }
            }

            function addTodo() {

                todos.push(body)
                let filteredArraybyDoneStatus = todos.filter((todo: Todo) => todo.data.state === State.DONE);
                let filteredArraybyInProgressStatus = todos.filter((todo: Todo) => todo.data.state === State.INPROGRESS);
                let filteredArraybyToDoStatus = todos.filter((todo: Todo) => todo.data.state === State.TODO);
                todos = filteredArraybyInProgressStatus.concat(filteredArraybyToDoStatus, filteredArraybyDoneStatus)
                if (!todos) return error('error');
                return ok(todos);
            }

            function updateTodo() {
                todos = todos.map((todo: Todo) => {

                    if (todo.data.id === body.data.id) {
                        todo.data.state = body.data.state;
                        todo.data.description = body.data.description;
                        todo.data.title = body.data.title;
                    }
                    return todo
                }
                )
                if (!todos) return error("");

                let filteredArraybyDoneStatus = todos.filter((todo: Todo) => todo.data.state === State.DONE);
                let filteredArraybyInProgressStatus = todos.filter((todo: Todo) => todo.data.state === State.INPROGRESS);
                let filteredArraybyToDoStatus = todos.filter((todo: Todo) => todo.data.state === State.TODO);
                todos = filteredArraybyInProgressStatus.concat(filteredArraybyToDoStatus, filteredArraybyDoneStatus)

                return ok(todos);
            }

            function getTodos() {
                if (!todos) return error("");
                return ok(todos);
            }
            function getTodo() {
                const data: any = body
                let todo: Todo[] = todos.filter((todo: any) => todo.data.id === Number(data.id));
                if (!todos) return error("");
                return ok(todo[0]);
            }

            function deleteTodo() {
                const data: any = body;
                todos = todos.filter((todo: Todo) => todo.data.id !== Number(data.id));

                if (!todos) return error("");
                return ok(todos);
            }

            function ok(body: any) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message: any): any {
                resolve({ status: 404, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

        });
    }
}