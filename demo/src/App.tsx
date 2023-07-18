import React from "react";
import logo from "./logo.svg";
import styles from "./styles.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
