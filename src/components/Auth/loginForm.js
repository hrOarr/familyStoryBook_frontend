import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context/AuthContext";
import * as styles from "./styles/loginForm.module.css";
import { useAlert } from 'react-alert';

const LoginForm = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const alert = useAlert();

  const dispatch = useAuthDispatch();
  const { loading, loginError } = useAuthState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);

    let res = await loginUser(dispatch, state);
    console.log(res);
    if (res !== undefined && res !== null) {
      console.log("Success");
      alert.success("Logged in successfully");
      navigate("/family");
    }
  };

  return (
    <div>
      <h3 className={styles["h3-form-header"]}>
        <i className="fa fa-sign-in" />&nbsp;Login in your account
      </h3>
      {loginError ? <p style={{ color: "red", letterSpacing: '0.02rem' }}>{loginError}</p> : null}
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className={styles['form-label']}>Email</Form.Label>
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
          <Form.Label className={styles['form-label']}>Password</Form.Label>
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

        <div style={{float: 'right'}}>
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

export default LoginForm;
