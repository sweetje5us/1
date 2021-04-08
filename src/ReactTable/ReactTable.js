import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { data } from "../data.js";

const columns = [
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
    sort: true
  },
  {
    dataField: "sex",
    text: "Sex",
    sort: true
  },
  {
    dataField: "fdate",
    text: "FDate",
    sort: true,
    validator: (newValue, row, column) => {
      if (isNaN(newValue)) {
        return {
          valid: false,
          message: "Price should be numeric"
        };
      }
      if (newValue > 5) {
        return {
          valid: false,
          message: "Price should less than 6"
        };
      }
      return true;
    }
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
    dataField: "name",
    order: "desc"
  }
];

export default class Table extends React.Component {
  render() {
    return (
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        defaultSorted={defaultSorted}
      />
    );
  }
}
