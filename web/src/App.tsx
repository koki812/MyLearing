import { ProxyDemo } from "./proxy";
import { BuiltReactApi } from "./reactAPI";
import styles from "./styles.module.scss";
import { TodoList } from "./todo-list";
import { TryCallBack } from "./useCallback";
import { DebugValueDemo } from "./useDebugValue";
import { Counter } from "./useReducer";
import { DemoTrasition } from "./useTransition";

function App() {
    return (
        <div className={styles.App}>
            {/* <TryCallBack />
            <Counter /> */}
            {/* <TodoList /> */}
            {/* <DebugValueDemo /> */}
            {/* <DemoTrasition /> */}
            {/* <BuiltReactApi /> */}
            <ProxyDemo />
        </div>
    );
}

export default App;
