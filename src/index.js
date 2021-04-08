import React from "react";
import { render } from "react-dom";
import { useState } from "react";
import ReactTable from "./ReactTable/ReactTable";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="container">
        <button onClick={() => setCount()}>Нажми на меня</button>
        <button onClick={() => clearCount()}>очистить счетчик</button>
        <button>Режим редактирования</button>
        <button>Удалить</button>
        <button>Сохранить</button>
        <ReactTable />
      </div>
    </div>
  );
}

var count_rows = 0;
function setCount() {
  // Объявление новой переменной состояния «count»
  count_rows = Number(localStorage.getItem("count-rows"));
  count_rows = count_rows + 1;
  localStorage.setItem("count-rows", count_rows);
  return alert("Вы кликнули " + count_rows + " раз(а)");
}
function clearCount() {
  // Объявление новой переменной состояния «count»
  localStorage.setItem("count-rows", "0");
}

render(<App />, document.getElementById("root"));
