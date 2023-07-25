import styles from "./styles.module.scss";
import { TodoList } from "./todo-list";
import { TryCallBack } from "./useCallback";
import { DebugValueDemo } from "./useDebugValue";
import { Counter } from "./useReducer";

function App() {
    return (
        <div className={styles.App}>
            {/* <TryCallBack />
            <Counter /> */}
            {/* <TodoList /> */}
            <DebugValueDemo />
        </div>
    );
}

export default App;
