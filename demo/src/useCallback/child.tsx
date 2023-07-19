import React, { useContext } from "react";
import { useAction } from "./hook";
import styles from "./styles.module.scss";

export const Child = React.memo(() => {
  const props = useAction();
  const child = useContext(props.ChildContext);
  return (
    <div>
      <span className={styles.default}>出生年份为：{child}</span>
    </div>
  );
});
