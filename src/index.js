import React, { Component } from "react";
import { render } from "react-dom";
import ReactTable from "./ReactTable/ReactTable";
import Modal from "react-modal";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

class App extends Component {
  state = {
    modalIsOpen: false,
    secondModalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  openSecondModal = () => {
    this.setState({ secondModalIsOpen: true });
  };

  closeSecondModal = () => {
    this.setState({ secondModalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <div className="container">
          <Button onClick={() => setCount()}>Нажми на меня</Button>
          <Button onClick={() => clearCount()}>очистить счетчик</Button>
          <Button onClick={this.openModal}>Редактировать</Button>
          <Button onClick={this.openSecondModal}>Добавить запись</Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            <div>Режим редактирования записи</div>
            <Form></Form>
            <Button onClick={this.closeModal}>close</Button>
          </Modal>
          <Modal
            isOpen={this.state.secondModalIsOpen}
            onRequestClose={this.closeSecondModal}
          >
            <div>Режим добавления записи</div>
            <Button onClick={this.closeSecondModal}>close</Button>
            
          </Modal>
          <Button>Удалить</Button>
          <Button onClick={() => saveData()}>Сохранить</Button>

          <ReactTable />
        </div>
      </div>
    );
  }
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
        name: "zBAC",
        surname: "zsasd",
        lastname: "asd",
        position: "director2",
        bdate: "01-02-1993",
        sex: "male",
        fdate: "01-12-2021",
        hdate: "02/12/2021",
        drive_l: "no"
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
