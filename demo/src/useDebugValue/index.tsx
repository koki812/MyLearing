import { useState, useDebugValue, useDeferredValue } from "react";

export const DebugValueDemo = () => {
    const [count, setCount] = useState<number>(0);
    const deferredCount = useDeferredValue(count);

    useDebugValue(deferredCount, (value) => `Deferred Count: ${value}`);

    return (
        <div>
            <p>Count: {count}</p>
            <p>Deferred Count: {deferredCount}</p>
            <button onClick={() => setCount((num) => num + 1)}>
                Count + 1
            </button>
        </div>
    );
};
