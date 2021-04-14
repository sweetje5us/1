import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MDBContainer, MDBInput } from "mdbreact";

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
        <Form.Group controlId="formBasicName" style={{ width: "200px" }}>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            name="name"
            type="text"
            required={true}
            value={person.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSurName" style={{ width: "200px" }}>
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            name="surname"
            type="text"
            value={person.surname}
            onChange={handleChange}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName" style={{ width: "200px" }}>
          <Form.Label>Отчество</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={person.lastname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPosition" style={{ width: "200px" }}>
          <Form.Label>Должность</Form.Label>
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
        <Form.Group controlId="formBasicBirthDate" style={{ width: "200px" }}>
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            name="bdate"
            type="date"
            value={person.bdate}
            onChange={handleChange}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDriverSex" required={true}>
          <MDBContainer
            style={{
              width: "200px",
              display: "flex",
              marginLeft: "0",
              paddingLeft: "0"
            }}
          >
            <MDBInput
              key={person.sex}
              label="Male"
              type="radio"
              id="male"
              checked={person.sex === "Мужчина" ? true : false}
              onChange={handleSex}
              style={{
                width: "12px",
                height: "12px",
                marginLeft: "-13px"
              }}
            />
            <div
              style={{
                marginLeft: "10px"
              }}
            >
              <MDBInput
                key={person.sex}
                label="Female"
                type="radio"
                id="female"
                checked={person.sex === "Женщина" ? true : false}
                onChange={handleSex}
                style={{ width: "12px", height: "12px", marginLeft: "-13px" }}
              />
            </div>
          </MDBContainer>
        </Form.Group>

        <Form.Group controlId="formBasicFDate" style={{ width: "200px" }}>
          <Form.Label>Дата приема на работу</Form.Label>
          <Form.Control
            type="date"
            name="fdate"
            value={person.fdate}
            onChange={handleChange}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicHDate" style={{ width: "200px" }}>
          <Form.Label>Дата увольнения</Form.Label>
          <Form.Control
            type="date"
            name="hdate"
            value={person.hdate}
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
