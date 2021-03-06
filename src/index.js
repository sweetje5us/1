import React, { Component } from "react";
import { render } from "react-dom";
import ReactTable from "./ReactTable/ReactTable";
import BootstrapTable from "react-bootstrap-table-next";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import * as BS from "react-bootstrap";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "./Form/Form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUserPlus,
  faUserMinus,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fab, faUserPlus, faUserMinus, faUserEdit);

class App extends Component {
  state = {
    items: []
  };
  // начитывание элементов в таблицу
  getItems = (props) => {
    let items;
    try {
      items = JSON.parse(localStorage.getItem("items"));
    } catch (e) {
      console.error(e.message);
    }

    if (!Array.isArray(items)) {
      items = [];
      localStorage.setItem("items", JSON.stringify(items));
    }
    this.setState({ items });
  };
  //начитывание элементов в таблицу при первой загрузке\перезагрузке
  componentDidMount(props) {
    unselectData();
    this.getItems();
  }
  //Занесение данных из формы
  handleSubmit = (person) => (event) => {
    let rowArray = {
      ...person,
      drive_l: Boolean(person.drive_l) === true ? "Да" : "Нет",
      selected: Boolean(person.selected),
      id: person.id ? person.id : getNewId()
    };

    let stroke = JSON.stringify(rowArray) + `]`;
    console.log(stroke);
    stroke =
      localStorage
        .getItem("items")
        .substring(0, localStorage.getItem("items").length - 1) + stroke;
    stroke = stroke.replace("}{", "},{");
    localStorage.setItem("items", stroke);
    unselectData();

    this.closeSecondModal();
    this.getItems();
    event.preventDefault(); //отмена действия браузера, т.е. обновления страницы
  };

  //удаление выбранных строк
  handleDelete = (event) => {
    Swal.fire({
      title: "Вы уверены?",
      text: "Записи будут удалены из таблицы!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Да, удалить запись!"
    }).then((result) => {
      if (result.isConfirmed) {
        let allitems = JSON.parse(localStorage.getItem("items"));
        var count = 0;
        allitems.slice(0).forEach((item, index, array) => {
          if (item.selected === true) {
            ++count;
            allitems.splice(allitems.indexOf(item), 1);
          }

          localStorage.setItem("items", JSON.stringify(allitems));
        });

        if (!allitems?.length) {
          // localStorage.setItem("items", allitems);
          this.setState({ deletedStroke: true });
          Swal.fire({
            icon: "success",
            title: "Успешно!",
            text: "Вы удалили все записи!"
          });
        } else {
          // localStorage.setItem("items", allitems);
          this.setState({ deletedStroke: true });
          Swal.fire(
            "Готово!",
            count + " строк были успешно удалены",
            "success"
          );
        }

        if (!count) {
          this.setState({ deletedStroke: false });
          Swal.fire({
            icon: "error",
            title: "Ошибка!",
            text: "Вы не выбрали строку для удаления!"
          });
        }
      }
      this.getItems();
    });
  };
  //вызов и закрытие модального окна
  openSecondModal = () => {
    this.setState({ secondModalIsOpen: true });
  };
  closeSecondModal = () => {
    this.setState({ secondModalIsOpen: false });
    unselectData();
  };

  testGetValue = (value) => () => {
    this.setState({
      sex: value
    });
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Тестовое задание для GreenData</h1>

        <div></div>
        <div className="container">
          <ButtonGroup className="pull-left">
            <Button
              variant="primary"
              onClick={this.openSecondModal}
              style={custombuttons}
            >
              <FontAwesomeIcon icon="user-plus" /> Добавить запись
            </Button>
            <Button
              variant="danger"
              onClick={this.handleDelete}
              style={custombuttons}
            >
              <FontAwesomeIcon icon="user-minus" /> Удалить
            </Button>
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled" style={{ margin: "0" }}>
                  Щелкните на ячейке таблицы. Для сохранения нажмите Enter.
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button variant="primary" style={custombuttons} disabled>
                  <FontAwesomeIcon icon="user-edit" /> Редактировать
                </Button>
              </span>
            </OverlayTrigger>
          </ButtonGroup>
          <Modal
            class="modal-dialog modal-lg"
            style={customStyles}
            isOpen={this.state.secondModalIsOpen}
            onRequestClose={this.closeSecondModal}
            ariaHideApp={false}
          >
            <div className="scrollbar scrollbar-primary">
              <Form
                onSubmit={this.handleSubmit}
                onCancel={this.closeSecondModal}
              />
            </div>
          </Modal>

          <ReactTable data={this.state.items} updateItems={this.getItems} />
        </div>
      </div>
    );
  }
}
//назначение id строки
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
// изменение selected=false при снятии выделения строки
function unselectData() {
  const storageItems = localStorage.getItem("items");

  if (storageItems) {
    try {
      let allitems = JSON.parse(storageItems);
      if (Array.isArray(allitems)) {
        allitems.forEach((element) => {
          element.selected = false;
        });
        localStorage.setItem("items", JSON.stringify(allitems));
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}
const custombuttons = {
  marginLeft: "0",
  marginBottom: "5px",
  marginRight: "5px",
  display: "flex"
};

const customStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center"
  },
  content: {
    width: "300px",
    background: "white",
    border: "1px solid #ccc",
    transition: "2.1s ease-out",
    boxshadow: "-2rem 2rem 2rem rgba(black, 0.2)",
    filter: "blur(2)",
    transform: "scale(1)",
    opacity: "1",
    visibility: "visible",
    maxHeight: "90%",
    inset: "5% auto auto"
  }
};

render(<App />, document.getElementById("root"));
