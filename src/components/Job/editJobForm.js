import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateJob } from "../../services/jobService";

const EditJobForm = ({ job, memberId }) => {
  const [state, setState] = useState({
    companyName: job.companyName,
    location: job.location,
    jobRole: job.jobRole,
    description: job.description,
    joinDate: job.joinDate,
    endDate: job.endDate,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJob(state, job.id, memberId, 8)
      .then((res)=>{
        console.log("Success:: " + res);
        navigate(`/family/members/${memberId}`);
      })
      .catch((err)=>{
        console.log("Error:: from editJobForm");
      });
  };

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          <h3
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              textAlign: "center",
              color: "white",
            }}
          >
            Edit Job
          </h3>
          <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="companyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    name="companyName"
                    type="text"
                    maxLength="55"
                    minLength="11"
                    placeholder="Enter company name"
                    value={state.companyName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    type="text"
                    maxLength="55"
                    minLength="11"
                    placeholder="Enter location"
                    value={state.location}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="jobRole">
                  <Form.Label>Job-Role</Form.Label>
                  <Form.Control
                    name="jobRole"
                    type="text"
                    maxLength="55"
                    minLength="11"
                    placeholder="Enter job-role"
                    value={state.jobRole}
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
                <Form.Group className="mb-3" controlId="joinDate">
                  <Form.Label>Join-Date</Form.Label>
                  <Form.Control
                    name="joinDate"
                    type="date"
                    value={state.joinDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label>Leave-date</Form.Label>
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
              <Button className="jobFormSubmit" variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditJobForm;
