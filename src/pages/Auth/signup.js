import { Col, Row } from "react-bootstrap";
import SignupForm from "../../components/Auth/signupForm";

const Signup = (props) => {
  return (
    <Row>
      <Col md="4" className="offset-md-4">
        <SignupForm />
      </Col>
    </Row>
  );
};

export default Signup;
