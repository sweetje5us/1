import React, { Component } from "react";
import { render } from "react-dom";
import ReactTable from "./ReactTable/ReactTable";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "./Form/Form";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    items: []
  };

  getItems = () => {
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

  componentDidMount(props) {
    unselectData();
    this.getItems();
  }

  handleSubmit = (person) => (event) => {
    // let rowArray = {
    //   id: getNewId(),
    //   name: this.state.name,
    //   surname: this.state.surname,
    //   lastname: this.state.lastname,
    //   position: this.state.position,
    //   bdate: this.state.bdate,
    //   sex: String(this.state.sex),
    //   fdate: this.state.fdate,
    //   hdate: this.state.hdate,
    //   drive_l: Boolean(this.state.drive_l),
    //   selected: Boolean(this.state.selected)
    // };

    let rowArray = {
      ...person,
      drive_l: Boolean(person.drive_l),
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
    event.preventDefault();
  };

  handleSaveTable = (event) => {
    console.log(table.textContent);
    // this.setState({ SaveTable: true });
    // Swal.fire({
    //   icon: "success",
    //   title: "Успешно!",
    //   text: "Вы сохранили изменения!"
    // });
  };

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
        <div>
          <h1 className="container" style={{ paddingLeft: "5em" }}></h1>
        </div>
        <div className="container">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="primary" onClick={this.openSecondModal}>
              Добавить запись
            </Button>{" "}
            <Button variant="danger" onClick={this.handleDelete}>
              Удалить
            </Button>{" "}
          </ButtonGroup>

          <Modal
            class="modal-dialog modal-lg"
            style={customStyles}
            isOpen={this.state.secondModalIsOpen}
            onRequestClose={this.closeSecondModal}
            ariaHideApp={false}
          >
            <Form
              onSubmit={this.handleSubmit}
              onCancel={this.closeSecondModal}
            />
          </Modal>

          <ReactTable data={this.state.items} updateItems={this.getItems} />
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
