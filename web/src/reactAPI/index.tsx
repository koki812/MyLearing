import { createContext, lazy, startTransition, useRef, useState } from "react";
import { ForwardRefDemo } from "./forwardRef";
import { Memoized } from "./memoized";

const Lazy = lazy(() => import("../todo-list/index"));

const ContextDemo = createContext<string>("value");

export const BuiltReactApi = () => {
    const [count, setCount] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        startTransition(() => {
            setCount(count + 1);
        });
    };

    return (
        <div>
            <ContextDemo.Provider value="context value">
                <Lazy />
            </ContextDemo.Provider>

            <ForwardRefDemo text="Ref Demo" ref={ref} />

            <Memoized count={count} />

            <button onClick={handleClick}> Count++ </button>
        </div>
    );
};
