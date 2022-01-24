import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateEducation } from "../../services/educationService";
import { useAuthState } from '../../Context';

const EditEducationForm = ({ education, memberId }) => {
  const [state, setState] = useState({
    institution: education.institution,
    description: education.description,
    startDate: education.startDate,
    endDate: education.endDate,
  });
  const navigate = useNavigate();
  const { user } = useAuthState();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      await updateEducation(state, education.id, memberId, user.id)
      .then((res)=>{
        console.log("Success:: " + res);
        navigate(`/family/members/${memberId}`);
      })
      .catch((err)=>{
        console.log("Error:: from editEducationForm");
      });
  };

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
        <h3 style={{marginTop: '30px', marginBottom: '30px', textAlign: 'center', color: 'white'}}>Edit Education</h3>
          <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="institution">
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    name="institution"
                    type="text"
                    maxLength="55"
                    minLength="11"
                    placeholder="Enter institution name"
                    value={state.institution}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={2}
                    placeholder="Write details..."
                    value={state.description}
                    onChange={handleChange}
                    maxLength="255"
                    minLength="11"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label>Start-Date</Form.Label>
                  <Form.Control
                    name="startDate"
                    type="date"
                    value={state.startDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label>End-date</Form.Label>
                  <Form.Control
                    name="endDate"
                    type="date"
                    value={state.endDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div style={{ textAlign: "center" }}>
              <Button
                className="educationFormSubmit"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditEducationForm;
