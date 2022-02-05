import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signupUser, useAuthState, useAuthDispatch } from "../../Context/AuthContext";
import * as styles from "./styles/signupForm.module.css";
import { useAlert } from 'react-alert';

const SignupForm = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const dispatch = useAuthDispatch();
  const { loading, signupError } = useAuthState();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await signupUser(dispatch, state);
    console.log(res);
    if (res !== undefined && res !== null) {
      console.log("Success");
      alert.success("You are registered successfully");
      alert.success("Logged in successfully");
      navigate("/family");
    }
  };

  return (
    <div>
      <h3 className={styles["h3-form-header"]}>
        <span className="fa-1x">
          <i className="fa fa-user-plus" />
        </span>
        &nbsp;Signup new account
      </h3>
      {signupError ? <p style={{ color: "red" }}>{signupError}</p> : null}
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label className={styles["form-label"]}>Username</Form.Label>
          <Form.Control
            className={styles['form-control']}
            name="username"
            type="text"
            maxLength="55"
            minLength="8"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className={styles["form-label"]}>Email</Form.Label>
          <Form.Control
            className={styles['form-control']}
            name="email"
            type="text"
            maxLength="55"
            minLength="8"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className={styles["form-label"]}>Password</Form.Label>
          <Form.Control
            className={styles['form-control']}
            name="password"
            type="text"
            placeholder="Enter password"
            value={state.password}
            onChange={handleChange}
            maxLength="55"
            minLength="8"
            required
          />
        </Form.Group>

        <div style={{ float: "right" }}>
          <Button
            className={styles["submit-button"]}
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

export default SignupForm;
