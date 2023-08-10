import React from "react";
import { connect } from "react-redux";
import { counterSlice } from "./counterSlice";
import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;

const { increment, decrement } = counterSlice.actions;

const mapDispatchToProps = {
    increment,
    decrement,
};
interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, increment, decrement }) => {
    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={increment}>加一</button>
            <button onClick={decrement}>减一</button>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    count: state.counter.count,
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
