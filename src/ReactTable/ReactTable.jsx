import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { columns, defaultSorted } from "./constants";
import Swal from "sweetalert2";

// сохранение изменений при редактировании
function afterSaveCell(oldValue, newValue, row, column) {
  let allitems = JSON.parse(localStorage.getItem("items"));
  let stroke = row;
  for (let i = 0; i < allitems.length; i++) {
    if (allitems[i].id === stroke.id) {
      allitems[i] = stroke;
    }
  }
  let allitems2 = JSON.stringify(allitems);
  localStorage.setItem("items", allitems2);
  Swal.fire({
    icon: "success",
    title: "Успешно!",
    text: "Запись будет изменена через несколько секунд!"
  });
}
// контроль на внесение изменений перед сохранением
function beforeSaveCell(oldValue, newValue, row, column, done) {
  setTimeout(() => {
    if (confirm("Вы действительно хотите внести изменения?")) {
      done(true);
    } else {
      done(false);
    }
  }, 0);
  return { async: true };
}
// изменение selected = true при выборе чекбокса
function onSelectRow(row, isChecked, e) {
  let allitems = JSON.parse(localStorage.getItem("items"));

  if (isChecked) {
    allitems.forEach((element) => {
      if (element.id === row.id) {
        element.selected = true;
      }
    });
  } else {
    allitems.forEach((element) => {
      if (element.id === row.id) {
        element.selected = false;
      }
    });
  }
  localStorage.setItem("items", JSON.stringify(allitems));
}
// изменение selected = true при выборе ВСЕХ чекбоксов
function onSelectAllRows(isChecked, row, e) {
  let allitems = JSON.parse(localStorage.getItem("items"));
  if (isChecked) {
    allitems.forEach((element) => {
      element.selected = true;
    });
  } else {
    allitems.forEach((element) => {
      element.selected = false;
    });
  }
  localStorage.setItem("items", JSON.stringify(allitems));
}

const selectRowProp = {
  mode: "checkbox",
  clickToSelect: false,
  unselectable: [2],
  selected: [0],
  onSelect: onSelectRow,
  onSelectAll: onSelectAllRows,
  bgColor: "red"
};

export default class Table extends React.Component {
  updateItems = () => {
    this.props.updateItems();
  };
  render() {
    return (
      <BootstrapTable
        id="table"
        bootstrap4
        keyField="id"
        data={this.props.data}
        selectRow={selectRowProp}
        //

        hover={true}
        columns={columns}
        defaultSorted={defaultSorted}
        updateItems={this.updateItems}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          beforeSaveCell,
          afterSaveCell
        })}
        selectableRows // add for checkbox selection
        Clicked
        selectableRowsComponentProps={{ inkDisabled: true }} // optionally, pass Material Ui supported props down to our custom checkbox
      />
    );
  }
}
