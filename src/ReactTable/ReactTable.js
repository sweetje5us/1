import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

const columns = [
  {
    dataField: "id",
    text: "id",
    sort: true,
    isKey: true,
    cellEdit: false
  },
  {
    dataField: "name",
    text: "Name",
    sort: true
  },
  {
    dataField: "surname",
    text: "SurName",
    sort: true
  },
  {
    dataField: "lastname",
    text: "Last Name",
    sort: true
  },
  {
    dataField: "position",
    text: "Position",
    sort: true
  },
  {
    dataField: "bdate",
    text: "Birth Date",
    sort: true,
    value: Date
  },
  {
    dataField: "sex",
    text: "Sex",
    sort: true
  },
  {
    dataField: "fdate",
    text: "FDate",
    sort: true
  },
  {
    dataField: "hdate",
    text: "Hdate",
    sort: true
  },
  {
    dataField: "drive_l",
    text: "Driver Licence",
    sort: true
  },
  {
    dataField: "selected",
    text: "Selected",
    sort: true,
    hidden: true
  }
];
const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];

//Выделение строк и запись в localStorage.getItem("selected");
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
        data={JSON.parse(localStorage.getItem("items"))}
        selectRow={selectRowProp}
        //
        hover={true}
        columns={columns}
        defaultSorted={defaultSorted}
        cellEdit={cellEditFactory({ mode: "dbclick" })}
        blurToSave={true}
        selectableRows // add for checkbox selection
        Clicked
        selectableRowsComponentProps={{ inkDisabled: true }} // optionally, pass Material Ui supported props down to our custom checkbox
      />
    );
  }
}
