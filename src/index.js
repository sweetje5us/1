import React, { Component } from "react";
import { render } from "react-dom";
import ReactTable from "./ReactTable/ReactTable";
import Modal from "react-modal";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import BootstrapTable from "react-bootstrap-table-next";
import { useTable } from "react-table";

class App extends Component {
  state = {
    modalIsOpen: false,
    secondModalIsOpen: false,
    toggledClearRows: false
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
    randomData();
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <div className="container">
          <Button onClick={() => consolelogitems()}>Нажми на меня</Button>
          <Button onClick={() => removestrokeitems()}>очистить счетчик</Button>
          <Button onClick={() => saveData()}>Сохранить</Button>
          <Button onClick={this.openSecondModal}>Добавить запись</Button>
          <Button onClick={this.openModal}>Редактировать</Button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            <div>Режим редактирования записи</div>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicSurName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Отчество</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicPosition">
                <Form.Label>Должность</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicBirthDate">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="formBasicSex">
                <Form.Label>Пол</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicFDate">
                <Form.Label>Дата приема на работу</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="formBasicHDate">
                <Form.Label>Дата увольнения</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="formBasicDriverLicence">
                <Form.Check type="checkbox" label="Driver Licence" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button onClick={this.closeModal}>Закрыть</Button>
            </Form>
          </Modal>
          <Modal
            isOpen={this.state.secondModalIsOpen}
            onRequestClose={this.closeSecondModal}
          >
            <div>Режим добавления записи</div>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicSurName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Отчество</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicPosition">
                <Form.Label>Должность</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicBirthDate">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="formBasicSex">
                <Form.Label>Пол</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formBasicFDate">
                <Form.Label>Дата приема на работу</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="formBasicHDate">
                <Form.Label>Дата увольнения</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group controlId="formBasicDriverLicence">
                <Form.Check type="checkbox" label="Driver Licence" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Добавить
              </Button>
              <Button onClick={this.closeSecondModal}>Закрыть</Button>
            </Form>
          </Modal>
          <Button onClick={(e) => this.delete(this.state.posts)}>
            Удалить
          </Button>
          <ReactTable columns={this.state.columns} data={this.state.posts} />
        </div>
      </div>
    );
  }
}
var count_rows = "";
var stroke;
function removestrokeitems() {
  // Объявление новой переменной состояния «count»
  localStorage.removeItem("count_rows");
}
function consolelogitems() {
  // Объявление новой переменной состояния «count»
  stroke = localStorage.getItem("items");
  localStorage.setItem("count-rows", stroke);
  console.log(stroke);
  console.log(count_rows);
}
function randomData() {
  localStorage.setItem(
    "items",
    JSON.stringify([
      {
        id: "1",
        name: "zBAC",
        surname: "zsasd",
        lastname: "asd",
        position: "director2",
        bdate: "08.04.2021",
        sex: "male",
        fdate: "08.04.2021",
        hdate: "08.04.2021",
        drive_l: "no"
      },
      {
        id: "2",
        name: "BAC",
        surname: "dsad",
        lastname: "dsad",
        position: "director",
        bdate: "08.04.2021",
        sex: "male",
        fdate: "08.04.2021",
        hdate: "08.04.2021",
        drive_l: "yes"
      }
    ])
  );
}

render(<App />, document.getElementById("root"));
