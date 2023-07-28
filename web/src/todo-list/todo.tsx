import {
    AddTodoAction,
    DeleteTodoAction,
    Todo,
    StateTodoAction,
} from "./props";

type Action = AddTodoAction | StateTodoAction | DeleteTodoAction;

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case "add":
            const newTodo: Todo = {
                id: Date.now(),
                text: action.variety,
                completed: false,
            };
            return [...state, newTodo];
        case "state":
            return state.map((todo) =>
                todo.id === action.variety
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case "delete":
            return state.filter((todo) => todo.id !== action.variety);
        default:
            return state;
    }
};
