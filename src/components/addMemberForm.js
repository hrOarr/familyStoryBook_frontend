import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { saveNewMember } from "../services/memberService";
import { getAllCountryList, validateEmail } from "../utils/importants";
import { useAuthState } from "../Context/AuthContext";
import { useAlert } from "react-alert";
import * as styles from "./addMemberForm.module.css";

const AddMemberForm = ({ hideModal, parentId }) => {
  const [memberInfo, setMemberInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthDate: null,
    deathDate: null,
    country: "",
  });
  const [errors, setErrors] = useState([]);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthState();
  const alert = useAlert();

  useEffect(() => {
    setCountries(getAllCountryList());
    console.log(countries);
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMemberInfo({ ...memberInfo, [name]: value });
  };

  const validationCheck = () => {
    let err = false;
    setErrors([]);
    if (memberInfo.firstName.length < 5 || memberInfo.firstName.length > 15) {
      err = true;
      setErrors((prv) => [
        ...prv,
        "FirstName is invalid(length must be between 5 and 15)",
      ]);
    }
    if (memberInfo.lastName.length < 5 || memberInfo.lastName.length > 15) {
      err = true;
      setErrors((prv) => [
        ...prv,
        "LastName is invalid(length must be between 5 and 15)",
      ]);
    }
    if (validateEmail(memberInfo.email) == false) {
      err = true;
      setErrors((prv) => [...prv, "Email is invalid"]);
    }
    if (memberInfo.gender == "") {
      err = true;
      setErrors((prv) => [...prv, "Gender must be selected"]);
    }
    if (memberInfo.birthDate == null) {
      err = true;
      setErrors((prv) => [...prv, "Birthdate is invalid"]);
    }
    if (memberInfo.country == "") {
      err = true;
      setErrors((prv) => [...prv, "Country must be selected"]);
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      return;
    }
    alert.info("Request Processing...");
    await saveNewMember(memberInfo, parentId, user.id)
      .then((res) => {
        console.log(res);
        hideModal();
        alert.success("Member is added successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert.removeAll();
        alert.error("Something Went Wrong. Try again later");
        console.log(err);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "5px" }}>
        {errors.length > 0 && (
          <Row
            style={{
              padding: "6px",
              marginBottom: "10px",
              background: "#e1e8ef",
              borderRadius: "5px",
            }}
          >
            {errors.map((err, idx) => (
              <div style={{ color: "red", letterSpacing: "0.04rem" }}>
                {err}
              </div>
            ))}
          </Row>
        )}
        <Row>
          <Col md="6">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label className={styles["form-label"]}>
                First Name
              </Form.Label>
              <Form.Control
                className={styles["form-control"]}
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
              <Form.Label className={styles["form-label"]}>
                Last Name
              </Form.Label>
              <Form.Control
                className={styles["form-control"]}
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
            <Form.Label className={styles["form-label"]}>Email</Form.Label>
            <Form.Control
              className={styles["form-control"]}
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
            <Form.Label className={styles["form-label"]}>
              Gender:&ensp;
            </Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Male"
              value="male"
              name="gender"
              onChange={handleChange}
              checked={memberInfo.gender === "male"}
            />
            <Form.Check
              inline
              type="radio"
              label="Female"
              value="female"
              name="gender"
              onChange={handleChange}
              checked={memberInfo.gender === "female"}
            />
            <Form.Check
              inline
              type="radio"
              label="Others"
              value="others"
              name="gender"
              onChange={handleChange}
              checked={memberInfo.gender === "others"}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={styles["form-label"]}>Birthdate</Form.Label>

            <Form.Control
              className={styles["form-control"]}
              name="birthDate"
              type="date"
              value={memberInfo.birthDate}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label className={styles["form-label"]}>Deathdate</Form.Label>
            <Form.Control
              className={styles["form-control"]}
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
        <div style={{ textAlign: "center" }}>
          <Button
            className={styles.memberFormSubmit}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddMemberForm;
