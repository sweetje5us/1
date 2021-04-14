import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
var today = new Date();
var firstday = new Date("01.01.1900");
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
firstday = yyyy + "-" + mm + "-" + dd;

export const columns = [
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
    sort: true,
    validator: (newValue, row, column) => {}
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
    sort: true,
    editor: {
      type: Type.SELECT,
      options: [
        {
          value: "Младший дворник",
          label: "Младший дворник"
        },
        {
          value: "Старший охранник",
          label: "Старший охранник"
        },
        {
          value: "Дизайнер",
          label: "Дизайнер"
        },
        {
          value: "Ведущий специалист",
          label: "Ведущий специалист"
        },
        {
          value: "Тамада",
          label: "Тамада"
        }
      ]
    }
  },
  {
    dataField: "bdate",
    text: "Birth Date",
    sort: true,
    value: Date,
    editor: {
      type: Type.DATE
    },
    validator: (newValue, row, column) => {
      if (newValue >= today) {
        if (newValue <= firstday) {
          return true;
        } else {
          return {
            valid: false,
            message: "выбрана слишком ранняя дата"
          };
        }
      } else {
        return {
          valid: false,
          message: "выбранная дата не может быть позже текущей даты"
        };
      }
    }
  },
  {
    dataField: "sex",
    text: "Sex",
    sort: true,
    editor: {
      type: Type.SELECT,
      options: [
        {
          value: "Мужчина",
          label: "Мужчина"
        },
        {
          value: "Женщина",
          label: "Женщина"
        }
      ]
    }
  },
  {
    dataField: "fdate",
    text: "FDate",
    sort: true,
    editor: {
      type: Type.DATE
    },
    validator: (newValue, row, column) => {
      if (newValue <= today) {
        if (newValue >= firstday) {
          return true;
        } else {
          return {
            valid: false,
            message: "выбрана слишком ранняя дата"
          };
        }
      } else {
        return {
          valid: false,
          message: "выбранная дата не может быть позже текущей даты"
        };
      }
    }
  },
  {
    dataField: "hdate",
    text: "Hdate",
    sort: true,
    editor: {
      type: Type.DATE
    },
    validator: (newValue, row, column) => {
      if (newValue >= row.fdate) {
        if (newValue <= today) {
          if (newValue >= firstday) {
            return true;
          } else {
            return {
              valid: false,
              message: "выбрана слишком ранняя дата"
            };
          }
        } else {
          return {
            valid: false,
            message: "выбранная дата не может быть позже текущей даты"
          };
        }
      } else {
        return {
          valid: false,
          message: "дата увольнения не может быть ранее даты приема"
        };
      }
    }
  },
  {
    dataField: "drive_l",
    text: "Driver Licence",
    sort: true,
    editor: {
      type: Type.CHECKBOX,
      value: "true:false"
    }
  },
  {
    dataField: "selected",
    text: "Selected",
    sort: true,
    hidden: true
  }
];

export const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];
