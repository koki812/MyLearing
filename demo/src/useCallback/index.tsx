import React, { useState, useCallback } from "react";
import { Child } from "./child";

const set = new Set();

export default function Parent() {
  const [count, setCount] = useState<number>(1);
  const [val, setVal] = useState("input name");

  const callback = useCallback(() => {
    console.log(count);
    return count;
  }, [count]);
  set.add(callback);
  console.log(set);

  return (
    <div>
      <h4>parent count:{count}</h4>
      <h4>set size:{set.size}</h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={(event) => setVal(event.target.value)} />
      </div>

      <Child callback={callback} />
    </div>
  );
}
