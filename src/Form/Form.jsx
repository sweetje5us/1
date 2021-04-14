import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MDBInput } from "mdbreact";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUserEdit,
  faUserTie,
  faUserTimes,
  faUserCheck,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fab, faUserEdit, faUserTie, faUserCheck, faUserTimes, faVenusMars);

var today = new Date();
var firstday = "1900-01-01";

var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

const PersonForm = (props) => {
  const { onSubmit, onCancel } = props;
  const [person, setPerson] = useState({
    id: "",
    name: "",
    surname: "",
    lastname: "",
    position: "",
    bdate: "",
    sex: "",
    fdate: "",
    hdate: "",
    drive_l: ""
  });

  const handleChange = useCallback((event) => {
    setPerson((person) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      return {
        ...person,
        [name]: value
      };
    });
  }, []);

  const handleSex = useCallback((event) => {
    setPerson((person) => {
      return {
        ...person,
        sex: event.target.id === "male" ? "Мужчина" : "Женщина"
      };
    });
  }, []);

  return (
    <>
      <h4>Режим добавления записи</h4>

      <Form onSubmit={onSubmit(person)}>
        <Form.Group
          className="was-validated"
          noValidate
          controlId="formBasicName"
          style={{ width: "200px" }}
        >
          <Form.Label>
            <FontAwesomeIcon icon="user-edit" /> Имя
          </Form.Label>
          <Form.Control
            name="name"
            type="text"
            required={true}
            value={person.name}
            onChange={handleChange}
            pattern="[A-Za-zА-Яа-яЁё]{2,20}"
          />
        </Form.Group>
        <Form.Group
          className="was-validated"
          noValidate
          controlId="formBasicSurName"
          style={{ width: "200px" }}
        >
          <Form.Label>
            <FontAwesomeIcon icon="user-edit" /> Фамилия
          </Form.Label>
          <Form.Control
            name="surname"
            type="text"
            value={person.surname}
            onChange={handleChange}
            required={true}
            pattern="[A-Za-zА-Яа-яЁё]{2,30}"
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName" style={{ width: "200px" }}>
          <Form.Label>
            <FontAwesomeIcon icon="user-edit" /> Отчество
          </Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={person.lastname}
            onChange={handleChange}
            pattern="[A-Za-zА-Яа-яЁё]{2,30}"
          />
        </Form.Group>
        <Form.Group
          className="was-validated"
          noValidate
          controlId="formBasicPosition"
          style={{ width: "200px" }}
        >
          <Form.Label>
            <FontAwesomeIcon icon="user-tie" /> Должность
          </Form.Label>
          <Form.Control
            as="select"
            name="position"
            value={person.position}
            onChange={handleChange}
            required={true}
          >
            <option defaultValue={true} hidden={true}></option>
            <option>Младший дворник</option>
            <option>Старший охранник</option>
            <option>Дизайнер</option>
            <option>Ведущий специалист</option>
            <option>Тамада</option>
          </Form.Control>
        </Form.Group>
        <Form.Group
          className="was-validated"
          noValidate
          controlId="formBasicBirthDate"
          style={{ width: "200px" }}
        >
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            name="bdate"
            type="date"
            min={firstday}
            max={today}
            value={person.bdate}
            onChange={handleChange}
            required={true}
          />
        </Form.Group>
        <Form.Group
          controlId="formBasicDriverSex"
          className="was-validated"
          noValidate
        >
          <Form.Label>
            <FontAwesomeIcon icon="venus-mars" /> Пол
          </Form.Label>
          <MDBInput
            type="radio"
            id="female"
            name="radio-stacked"
            selected={person.sex === "Мужчина" ? true : false}
            onChange={handleSex}
            required
            label="Женщина"
            autoComplete="nope"
            style={{
              width: "12px",
              height: "12px",
              marginLeft: "-13px"
            }}
          />
          <MDBInput
            type="radio"
            id="male"
            name="radio-stacked"
            selected={person.sex === "Женщина" ? true : false}
            onChange={handleSex}
            required
            label="Мужчина"
            autoComplete="nope"
            style={{
              width: "12px",
              height: "12px",
              marginLeft: "-13px"
            }}
          />
        </Form.Group>

        <Form.Group
          className="was-validated"
          noValidate
          controlId="formBasicFDate"
          style={{ width: "200px" }}
        >
          <Form.Label>
            <FontAwesomeIcon icon="user-check" /> Дата приема на работу
          </Form.Label>
          <Form.Control
            type="date"
            name="fdate"
            min={firstday}
            max={today}
            value={person.fdate}
            onChange={handleChange}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicHDate" style={{ width: "200px" }}>
          <Form.Label>
            <FontAwesomeIcon icon="user-times" /> Дата увольнения
          </Form.Label>
          <Form.Control
            type="date"
            name="hdate"
            min={person.fdate}
            max={today}
            value={person.hdate}
            disabled={!person.fdate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDriverLicence">
          <Form.Check
            type="checkbox"
            name="drive_l"
            label="Driver Licence"
            checked={person.drive_l}
            onChange={handleChange}
            inline
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
        <Button type="button" onClick={onCancel}>
          Закрыть
        </Button>
      </Form>
    </>
  );
};

export default PersonForm;
