import React, { useState, useEffect } from "react";

interface State {
    count?: number;
}

const initialState: State = {
    count: 0,
};

const handler: ProxyHandler<State> = {
    set(target: State, property: keyof State, value) {
        console.log(` property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    },
};

const stateProxy = new Proxy(initialState, handler);

export const ProxyDemo: React.FC = () => {
    const [state, setState] = useState<any>(stateProxy);

    useEffect(() => {
        const handleChange = () => setState({ ...stateProxy });
        Object.keys(state).forEach((key) =>
            Object.defineProperty(stateProxy, key, {
                get: () => state[key as keyof State],
                set: (value) => {
                    state[key as keyof State] = value;
                    handleChange();
                },
            })
        );

        return () => {
            Object.keys(state).forEach(
                (key) => delete stateProxy[key as keyof State]
            );
        };
    }, [state]);

    const handleIncrement = () => {
        if (stateProxy.count !== undefined) {
            stateProxy.count += 1;
        }
    };

    const handleDecrement = () => {
        if (stateProxy.count !== undefined) {
            stateProxy.count -= 1;
        }
    };

    return (
        <div>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
};
