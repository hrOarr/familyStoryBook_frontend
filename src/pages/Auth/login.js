import { Col, Row } from "react-bootstrap";
import LoginForm from "../../components/Auth/loginForm";

const Login = (props) => {
  return (
    <Row>
      <Col md="4" className="offset-md-4">
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Login;
