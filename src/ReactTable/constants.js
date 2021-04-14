import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
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
    }
  },
  {
    dataField: "hdate",
    text: "Hdate",
    sort: true,
    editor: {
      type: Type.DATE
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
