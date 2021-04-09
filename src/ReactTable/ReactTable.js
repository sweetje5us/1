import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import Datetime from "react-datetime";
// import { data } from "../data.js";

const handleChange = (state) => {
  // You can use setState or dispatch with something like Redux so we can use the retrieved data
  console.log("Selected Rows: ", state.selectedRows);
};

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
  }
];

const defaultSorted = [
  {
    dataField: "id",
    order: "desc"
  }
];
// function onSelectRow(row, isSelected, e) {
//   if (isSelected) {
//     alert(`You just selected '${row["name"]}'`);
//   }
// }

const selectRowProp = {
  mode: "checkbox",
  clickToSelect: true,
  unselectable: [2],
  selected: [1],
  // onSelect: onSelectRow,
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
        columns={columns}
        defaultSorted={defaultSorted}
        // cellEdit={cellEditFactory({ mode: "click" })} - редактирование элемента таблицы
        selectableRows // add for checkbox selection
        Clicked
        selectableRows
        // Pass the function only
        selectableRowsComponentProps={{ inkDisabled: true }} // optionally, pass Material Ui supported props down to our custom checkbox
        onSelectedRowsChange={handleChange}
      />
    );
  }
}
