import React from "react";
import { render } from "react-dom";
import ReactTable from "./ReactTable/ReactTable";

import BootstrapSwitchButton from "bootstrap-switch-button-react";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="container">
        <button onClick={() => setCount()}>Нажми на меня</button>
        <button onClick={() => clearCount()}>очистить счетчик</button>
        <label>Режим редактирования</label>
        <BootstrapSwitchButton
          checked={false}
          onlabel="On"
          offlabel="Off"
          // onChange={(checked: boolean) => setEditTable()}
          width={50}
        />
        <button>Удалить</button>
        <button onClick={() => saveData()}>Сохранить</button>

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
function saveData() {
  localStorage.setItem(
    "items",
    JSON.stringify([
      {
        id: "1",
        name: "BAC",
        surname: "dsad",
        lastname: "dsad",
        position: "director",
        bdate: "05-02-1993",
        sex: "male",
        fdate: "01-12-2021",
        hdate: "02/12/2021",
        drive_l: "yes"
      },
      {
        id: "2",
        name: "BAC",
        surname: "dsad",
        lastname: "dsad",
        position: "director",
        bdate: "05-02-1993",
        sex: "male",
        fdate: "01-12-2021",
        hdate: "02/12/2021",
        drive_l: "yes"
      }
    ])
  );
}

render(<App />, document.getElementById("root"));

render(<App />, document.getElementById("root"));
