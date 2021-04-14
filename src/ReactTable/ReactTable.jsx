import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { columns, defaultSorted } from "./constants";
import Swal from "sweetalert2";

function afterSaveCell(oldValue, newValue, row, column) {
  let allitems = JSON.parse(localStorage.getItem("items"));
  let stroke = row;
  for (i = 0; i < allitems.length; i++) {
    if (allitems[i].id == stroke.id) {
      allitems[i] = stroke;
    }
  }
  let allitems2 = JSON.stringify(allitems);
  localStorage.setItem("items", allitems2);
}

function beforeSaveCell(oldValue, newValue, row, column, done) {
  setTimeout(() => {
    Swal.fire({
      title: "Вы уверены что хотите внести изменения?",
      text: "Запись будет изменена",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Да, изменить запись!"
    }).then((result) => {
      if (result.isConfirmed) {
        done(true);
      } else {
        done(false);
      }
    });
  }, 0);
  Swal.fire({
    icon: "success",
    title: "Успешно!",
    text: "Вы изменили запись!"
  });
  return { async: true };
}
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
        cellEdit={cellEditFactory({
          mode: "dbclick",
          beforeSaveCell,
          afterSaveCell
        })}
        blurToSave={true}
        selectableRows // add for checkbox selection
        Clicked
        selectableRowsComponentProps={{ inkDisabled: true }} // optionally, pass Material Ui supported props down to our custom checkbox
      />
    );
  }
}
