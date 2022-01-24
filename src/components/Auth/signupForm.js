import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';

const LoginForm = (props) => {
  const [state, setState] = useState({
      username: "",
    email: "",
    password: "",
  });

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
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
    console.log(res)
    if(res!==undefined){
        console.log("Success");
        navigate("/family");
    }
  };

  return (
    <div>
      <h3 className="h3-form-header">Login in your account</h3>
      {errorMessage ? <p style={{color: 'red'}}>{errorMessage}</p> : null}
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
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
          <Form.Label>Password</Form.Label>
          <Form.Control
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

        <Button className="eventFormSubmit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
