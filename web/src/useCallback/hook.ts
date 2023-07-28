import {
  createContext,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

export const useAction = () => {
  const [age, setAge] = useState<number>(0);
  const [year, setYear] = useState<number>(2000);
  const [name, setName] = useState<string>("jack");
  const ref = useRef(0);

  const handleAgeAdd = useCallback(() => {
    ref.current = ref.current + 1;
    setAge(age + 1);
    alert("你已经提交" + ref.current + "次" + name + "的档案");
  }, [age, name]);

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

  const ChildContext = createContext(2000);

  const nameId = useId();

  useEffect(() => {
    document.title = `${name} ${YearResult} 的档案`;
  }, [name, YearResult]);

  return {
    name,
    handleAgeAdd,
    handleYearAdd,
    handleYearIncrease,
    AgeResult,
    YearResult,
    ChildContext,
    nameId,
  };
};
