import { useEffect } from "react";
import { Child } from "./child";
import { useAction } from "./hook";

export const TryCallBack = () => {
  const props = useAction();
  useEffect(() => {
    document.title = `${props.name} ${props.YearResult} 的档案`;
  }, [props.name, props.YearResult]);
  console.log(props.nameId);  
  return (
    <div>
      <input type="text" defaultValue={props.name} id={props.nameId} />
      <input type="submit" id={props.nameId} />
      <button onClick={props.handleAgeAdd}>{props.AgeResult} 岁了</button>
      <button onClick={props.handleYearAdd}>
        如果不绑定依赖项 {props.YearResult} 年
      </button>
      <button onClick={props.handleYearIncrease}>
        如果绑定依赖项 {props.YearResult} 年
      </button>
      <props.ChildContext.Provider value={props.YearResult}>
        <Child />
      </props.ChildContext.Provider>
    </div>
  );
};
