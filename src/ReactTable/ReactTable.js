import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import { data } from "../data.js";

const columns = [
  {
    dataField: "id",
    text: "id",
    sort: true,
    isKey: true,
    Cell: ({ original }) => {
      return <input type="checkbox"></input>;
    }
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
    // validator: (newValue, row, column) => {
    //   if (isNaN(newValue)) {
    //     return {
    //       valid: false,
    //       message: "Price should be numeric"
    //     };
    //   }
    //   if (newValue > 5) {
    //     return {
    //       valid: false,
    //       message: "Price should less than 6"
    //     };
    //   }
    //   return true;
    // }
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
    hidden: false
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
  let allstrokes = localStorage.getItem("selected");
  let allitems = JSON.parse(localStorage.getItem("items"));
  if (isChecked) {
    allitems.forEach((element) => {
      if (element.id == row.id) {
        element.selected = true;
      }
    });

    let stroke = JSON.stringify(row);
    //alert(`You just selected '${JSON.stringify(row)}'`);
    stroke = allstrokes + stroke;
    stroke = stroke.replace("}{", "},{");
    localStorage.setItem("selected", stroke);
  } else {
    allitems.forEach((element) => {
      if (element.id == row.id) {
        element.selected = false;
      }
    });
  }
  localStorage.setItem("items", JSON.stringify(allitems));
}

function onSelectAllRows(isChecked, row, e) {
  let stroke = JSON.stringify(row);
  let allstrokes = localStorage.getItem("selected");
  if (isChecked) {
    //alert(`You just selected '${JSON.stringify(row)}'`);

    stroke = allstrokes + stroke;
    stroke = stroke.substring(1);
    stroke = stroke.replace("}{", "},{");
    localStorage.setItem("selected", stroke);
  } else {
    //alert(`You just unselected '${JSON.stringify(row)}'`);
    localStorage.setItem("selected", "");
  }
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
        bootstrap4
        keyField="id"
        data={JSON.parse(localStorage.getItem("items"))}
        selectRow={selectRowProp}
        //
        hover={true}
        columns={columns}
        defaultSorted={defaultSorted}
        // cellEdit={cellEditFactory({ mode: "click" })}
        selectableRows // add for checkbox selection
        Clicked
        selectableRowsComponentProps={{ inkDisabled: true }} // optionally, pass Material Ui supported props down to our custom checkbox
      />
    );
  }
}
