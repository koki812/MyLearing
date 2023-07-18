import { useEffect, useState } from "react";

export const Child = ({callback}) =>{
  const [count,setCount] = useState<number>(0);
  
  useEffect(()=>{
    setCount(callback())
  },[callback]) 
  return <>
    child count:{count}
  </>
}
