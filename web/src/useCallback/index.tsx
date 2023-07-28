import { Child } from "./child";
import { useAction } from "./hook";

export const TryCallBack = () => {
  const {
    name,
    handleAgeAdd,
    handleYearAdd,
    handleYearIncrease,
    AgeResult,
    YearResult,
    ChildContext,
    nameId,
  } = useAction();

  return (
    <div>
      <input type="text" defaultValue={name} id={nameId} />
      <input type="submit" id={nameId} />
      <button onClick={handleAgeAdd}>{AgeResult} 岁了</button>
      <button onClick={handleYearAdd}>如果不绑定依赖项 {YearResult} 年</button>
      <button onClick={handleYearIncrease}>
        如果绑定依赖项 {YearResult} 年
      </button>
      <ChildContext.Provider value={YearResult}>
        <Child />
      </ChildContext.Provider>
    </div>
  );
};
