import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { saveNewJob } from "../../services/jobService";
import "./newJobForm.css";

const NewJobForm = ({memberId}) => {
  const [formState, setFormState] = useState([
    {
      companyName: "",
      jobRole: "",
      description: "",
      joinDate: new Date(),
      endDate: new Date(),
    },
  ]);

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    const list = [...formState];
    list[idx][name] = value;
    setFormState(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (idx) => {
    const list = [...formState];
    list.splice(idx, 1);
    setFormState(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (formState.length == 3) {
      return;
    }
    setFormState([
      ...formState,
      {
        companyName: "",
        location: "",
        jobRole: "",
        description: "",
        joinDate: new Date(),
        endDate: new Date(),
      },
    ]);
  };

  console.log(formState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    formState.map((state, idx) => {
      if ("joinDate" in state) {
        const list = [...formState];
        list[idx]["joinDate"] = new Date(state.joinDate)
          .toISOString()
          .substring(0, 10);
        setFormState(list);
      }
      if ("endDate" in state) {
        const list = [...formState];
        list[idx]["endDate"] = new Date(state.endDate)
          .toISOString()
          .substring(0, 10);
        setFormState(list);
      }
    });

    await saveNewJob(formState, memberId, 8)
      .then((res) => {
        console.log("Success:: saveNewJob");
        setFormState([
          {
            companyName: "",
            location: "",
            jobRole: "",
            description: "",
            joinDate: new Date(),
            endDate: new Date(),
          },
        ]);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error:: saveNewJob");
      });
  };

  console.log("SoA:: " + formState.length);

  return (
    <div>
      <h3 style={{color: 'white', textAlign: 'center', padding: '30px 0px 20px 0px'}}>Add New Job for Current Member</h3>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        {formState.map((state, idx) => (
          <div>
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
                    onChange={(e) => handleChange(e, idx)}
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
                    onChange={(e) => handleChange(e, idx)}
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
                    onChange={(e) => handleChange(e, idx)}
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
                    onChange={(e) => handleChange(e, idx)}
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
                    onChange={(e) => handleChange(e, idx)}
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
                    onChange={(e) => handleChange(e, idx)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="btn-box">
              {formState.length !== 1 && (
                <Button
                  className="removeFormButton"
                  onClick={() => handleRemoveClick(idx)}
                >
                  Remove
                </Button>
              )}
              {formState.length - 1 === idx && (
                <Button className="addNewFormButton" onClick={handleAddClick}>
                  Add
                </Button>
              )}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center" }}>
          <Button className="jobFormSubmit" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewJobForm;
