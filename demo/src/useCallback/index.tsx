import { useCallback, useMemo } from "react";

export const TryCallBack = () => {
  const age = 12;

  const doubleAge = useMemo(() => {
    return age * 2;
  }, [age]);

  const addTen = useCallback((initValue: number) => {
    return initValue + 10;
  }, []);
  return (
    <>
      {doubleAge}
      {addTen}
    </>
  );
};
