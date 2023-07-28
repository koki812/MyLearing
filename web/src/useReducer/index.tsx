import { useReducer } from "react";

interface State {
    count: number;
}

const reducer = (state: State, action: "increase" | "decrease"): State => {
    switch (action) {
        case "increase":
            return { count: state.count + 1 };
        case "decrease":
            return { count: state.count - 1 };
        default:
            throw new Error("err");
    }
};

export const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    const handleIncrease = () => {
        dispatch("increase");
    };

    const handleDecrease = () => {
        dispatch("decrease");
    };

    return (
        <div>
            <div>Count: {state.count}</div>
            <button onClick={handleIncrease}>Increment</button>
            <button onClick={handleDecrease}>Decrement</button>
        </div>
    );
};
