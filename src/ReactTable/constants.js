import { Type } from "react-bootstrap-table2-editor";
var today = new Date();
var firstday = "1900-01-01";

var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

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
    text: "Имя",
    sort: true
  },
  {
    dataField: "surname",
    text: "Фамилия",
    sort: true
  },
  {
    dataField: "lastname",
    text: "Отчество",
    sort: true
  },
  {
    dataField: "position",
    text: "Должность",
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
    text: "Дата рождения",
    sort: true,
    value: Date,
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
    dataField: "sex",
    text: "Пол",
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
    text: "Дата приема на работу",
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
    text: "Дата увольнения",
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
    text: "Наличие прав",
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
