import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { saveNewMember } from "../services/memberService";
import { getAllCountryList } from "../utils/importants";
import { useAuthState } from '../Context';
import "./addMemberForm.css";

const AddMemberForm = ({hideModal, parentId}) => {
  const [memberInfo, setMemberInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthDate: new Date().toLocaleDateString(),
    deathDate: null,
    country: ""
  });
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthState();

  console.log(memberInfo);

  useEffect(() => {
    setCountries(getAllCountryList());
    console.log(countries);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setMemberInfo({ ...memberInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(parentId);

    await saveNewMember(memberInfo, parentId, user.id)
      .then((res) => {
        console.log(res);
        hideModal();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Row>
          <Col md="6">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                maxLength="55"
                minLength="5"
                placeholder="Enter first name"
                value={memberInfo.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                maxLength="55"
                minLength="5"
                placeholder="Enter last name"
                value={memberInfo.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              maxLength="55"
              minLength="5"
              placeholder="Enter email"
              value={memberInfo.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group key="inline-radio" controlId="memberInfo">
            <Form.Label>Gender:&ensp;</Form.Label>
            <Form.Check
              inline
              label="Male"
              value="male"
              name="gender"
              type="radio"
              id="inline-radio-1"
              onChange={handleChange}
              checked={memberInfo.gender === "male"}
            />
            <Form.Check
              inline
              label="Female"
              value="female"
              name="gender"
              type="radio"
              id="inline-radio-2"
              onChange={handleChange}
              checked={memberInfo.gender === "female"}
            />
            <Form.Check
              inline
              label="Others"
              value="others"
              name="gender"
              type="radio"
              id="inline-radio-3"
              onChange={handleChange}
              checked={memberInfo.gender === "others"}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Birthdate</Form.Label>

            <Form.Control
              name="birthDate"
              type="date"
              value={memberInfo.birthDate}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Deathdate</Form.Label>
            <Form.Control
              name="deathDate"
              type="date"
              value={memberInfo.deathDate}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Form.Select name="country" onChange={handleChange} className="mb-3">
            <option>Select Country</option>
            {countries.length > 0 &&
              countries.map((coun, id) => (
                <option value={coun.value} key={id}>
                  {coun.name}
                </option>
              ))}
          </Form.Select>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Button className="memberFormSubmit" variant="primary" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddMemberForm;
