import React, { Component } from "react";
import { render } from "react-dom";
import ReactTable from "./ReactTable/ReactTable";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Provider } from "mobx-react";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    modalIsOpen: false,
    secondModalIsOpen: false
  };
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      surname: "",
      lastname: "",
      position: "",
      bdate: "",
      sex: "",
      fdate: "",
      hdate: "",
      drive_l: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }
  handleChangeCheckbox(event) {
    this.setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked
    }));
  }

  handleSubmit(event) {
    let rowArray = {
      id: getNewId(),
      name: this.state.name,
      surname: this.state.surname,
      lastname: this.state.lastname,
      position: this.state.position,
      bdate: this.state.bdate,
      sex: this.state.sex,
      fdate: this.state.fdate,
      hdate: this.state.hdate,
      drive_l: Boolean(this.state.drive_l)

      // isSelected: Boolean(this.state.checkbox)
    };
    let stroke = `, ` + JSON.stringify(rowArray) + `]`;
    stroke =
      localStorage
        .getItem("items")
        .substring(0, localStorage.getItem("items").length - 1) + stroke;
    localStorage.setItem("items", stroke);
  }
  handleOpenEditModal(event) {
    let editStroke = localStorage.getItem("selected");
    let allstrokes = localStorage.getItem("items");
    if (editStroke !== "") {
      // открытие модального окна
      // присвоение ипутам значения из selected
    } else {
      this.setState({ changeRow: false });
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Вы не выбрали строку для редактирования!"
      });
    }
    localStorage.setItem("selected", "");
  }

  handleChangeRow(event) {
    let resultRow = allstrokes.replace(editStroke, newStroke);
    localStorage.setItem("items", String(resultRow));
    this.setState({ changeRow: true });
    Swal.fire({
      icon: "success",
      title: "Успешно!",
      text: "Вы изменили запись!"
    });
  }

  handleDelete(event) {
    Swal.fire({
      title: "Вы уверены?",
      text: "Запись будет удалена из таблицы!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Да, удалить запись!"
    }).then((result) => {
      if (result.isConfirmed) {
        let deleteStroke = localStorage.getItem("selected");
        let allstrokes = localStorage.getItem("items");
        if (deleteStroke !== "") {
          let resultRow = allstrokes.replace(deleteStroke, "");
          localStorage.setItem("items", String(resultRow));
          this.setState({ deletedStroke: true });
          Swal.fire("Готово!", "Строка была успешно удалена", "success");
        } else {
          this.setState({ deletedStroke: false });
          Swal.fire({
            icon: "error",
            title: "Ошибка!",
            text: "Вы не выбрали строку для удаления!"
          });
        }
        localStorage.setItem("selected", "");
      }
    });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  openModal3 = () => {
    this.setState({ modalIsOpen3: true });
  };

  closeModal3 = () => {
    this.setState({ modalIsOpen3: false });
  };
  openSecondModal = () => {
    this.setState({ secondModalIsOpen: true });
  };

  closeSecondModal = () => {
    this.setState({ secondModalIsOpen: false });
  };

  render() {
    //randomData();
    //если поломаются данные в localstorage

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <div className="container">
          <Button onClick={this.openSecondModal}>Добавить запись</Button>
          <Button onClick={this.openModal}>Редактировать</Button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
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
                <Form.Control />
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
            ariaHideApp={false}
          >
            <div>Режим добавления записи</div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  // required="true"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSurName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  name="surname"
                  type="text"
                  value={this.state.surname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPosition">
                <Form.Label>Должность</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={this.state.position}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicBirthDate">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                  name="bdate"
                  type="date"
                  value={this.state.bdate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSex">
                <Form.Label>Пол</Form.Label>
                <Form.Control
                  type="text"
                  name="sex"
                  value={this.state.sex}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicFDate">
                <Form.Label>Дата приема на работу</Form.Label>
                <Form.Control
                  type="date"
                  name="fdate"
                  value={this.state.fdate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicHDate">
                <Form.Label>Дата увольнения</Form.Label>
                <Form.Control
                  type="date"
                  name="hdate"
                  value={this.state.hdate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicDriverLicence">
                <Form.Check
                  type="checkbox"
                  name="drive_l"
                  label="Driver Licence"
                  checked={this.state.drive_l}
                  onChange={this.handleChangeCheckbox}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Добавить
              </Button>
              <Button onClick={this.closeSecondModal}>Закрыть</Button>
            </Form>
          </Modal>
          <Button onClick={this.handleDelete}>Удалить</Button>

          <ReactTable
            id="tableQ"
            columns={this.state.columns}
            data={this.state.posts}
          />
        </div>
      </div>
    );
  }
}

function getNewId() {
  let allItemsString = JSON.parse(localStorage.getItem("items"));
  let maxId = 0;
  allItemsString.forEach((element) => {
    if (element.id > maxId) {
      maxId = element.id;
    }
  });
  return ++maxId;
}

function randomData() {
  localStorage.setItem(
    "items",
    JSON.stringify([
      {
        id: "1",
        name: "test",
        surname: "test",
        lastname: "test",
        position: "tester",
        bdate: "01.01.1234",
        sex: "male",
        fdate: "01.01.2000",
        hdate: "01.01.2021",
        drive_l: "false"
      }
    ])
  );
}

render(<App />, document.getElementById("root"));
