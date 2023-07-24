import styles from "./styles.module.scss";
import { TodoList } from "./todo-list";
import { TryCallBack } from "./useCallback";
import { Counter } from "./useReducer";

function App() {
    return (
        <div className={styles.App}>
            {/* <TryCallBack />
            <Counter /> */}
            <TodoList />
        </div>
    );
}

export default App;
