import { useReducer, useState } from "react";
import { todoReducer } from "./todo";
import styles from "./styles.module.scss";

export const TodoList = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const [text, setText] = useState<string>("");

    const handleAddTodo = () => {
        if (text.trim() !== "") {
            dispatch({ type: "add", variety: text });
        }
    };

    const handleStateTodo = (id: number) => {
        dispatch({ type: "state", variety: id });
    };

    const handleDeleteTodo = (id: number) => {
        dispatch({ type: "delete", variety: id });
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleAddTodo}>新增</button>
            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className={styles.default}>
                        <div
                            className={
                                todo.completed
                                    ? `${styles.undone}`
                                    : `${styles.completed}`
                            }
                        >
                            {todo.text}
                        </div>
                        <button onClick={() => handleStateTodo(todo.id)}>
                            {todo.completed ? "未完成" : "已完成"}
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>
                            删除
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TodoList;
