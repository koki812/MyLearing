import { ProxyDemo } from "./proxy";
import Counter from "./redux/counter";

import styles from "./styles.module.scss";
import { TodoList } from "./todo-list";
import { TryCallBack } from "./useCallback";
import { DebugValueDemo } from "./useDebugValue";

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
            {/* <ProxyDemo /> */}
            {/* <CounterDemo /> */}
            <Counter />
        </div>
    );
}

export default App;
