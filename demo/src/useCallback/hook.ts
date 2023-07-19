import { useCallback, useMemo, useState } from "react";

export const useAction = () => {
  const [age, setAge] = useState<number>(0);
  const [year, setYear] = useState<number>(2000);
  const [name] = useState<string>("jack");

  const handleAgeAdd = useCallback(() => {
    setAge(age + 1);
  }, [age]);

  const handleYearAdd = useCallback(() => {
    setYear(year + age);
  }, []);

  const handleYearIncrease = useCallback(() => {
    setYear(year + age);
  }, [year, age]);

  const AgeResult = useMemo(() => {
    return age;
  }, [age]);

  const YearResult = useMemo(() => {
    return year;
  }, [year]);

  return {
    name,
    handleAgeAdd,
    handleYearAdd,
    handleYearIncrease,
    AgeResult,
    YearResult,
  };
};
