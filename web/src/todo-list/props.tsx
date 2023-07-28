export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface AddTodoAction {
    type: "add";
    variety: string;
}

export interface StateTodoAction {
    type: "state";
    variety: number;
}

export interface DeleteTodoAction {
    type: "delete";
    variety: number;
}
