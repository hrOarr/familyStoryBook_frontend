import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { saveNewJob } from "../../services/jobService";
import { useAuthState } from "../../Context/AuthContext";
import { useJobDispatch, getAllJobs } from "../../Context/JobContext";
import { useMemberState } from '../../Context/MemberContext';
import { useAlert } from "react-alert";
import * as styles from "./newJobForm.module.css";

const NewJobForm = ({ memberId }) => {
  const [formState, setFormState] = useState([
    {
      companyName: "",
      jobRole: "",
      description: "",
      joinDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const { user } = useAuthState();
  const dispatch = useJobDispatch();
  const { member } = useMemberState();
  const alert = useAlert();

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

    alert.info("Request Processing...");
    await saveNewJob(formState, memberId, user.id)
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
        alert.removeAll();
        alert.success("Job is addedd successfully");
        const fetchAllJobs = async () => {
          await getAllJobs(dispatch, { mid: memberId, fid: user.id });
        };
        fetchAllJobs();
      })
      .catch((err) => {
        console.log("Error:: saveNewJob");
      });
  };

  return (
    <div>
      <h3 className={styles['h3-form-header']}>
        Add New Job
      </h3>
      <h4 className={styles["h4-form-header"]}>
            <span style={{ textDecoration: "underline", fontSize: "1.1rem" }}>
              Current Member
            </span>{" "}
            -&nbsp;
            <span
              style={{
                fontSize: "1.3rem",
                letterSpacing: "0.1rem",
                color: "#9cb3c9",
                fontWeight: "600",
              }}
            >
              {member.firstName} {member.lastName}
            </span>
          </h4>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        {formState.map((state, idx) => (
          <div>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="companyName">
                  <Form.Label className={styles['form-label']}>Company Name</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
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
                  <Form.Label className={styles['form-label']}>Location</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
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
                  <Form.Label className={styles['form-label']}>Job-Role</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
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
                  <Form.Label className={styles['form-label']}>Details</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
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
                  <Form.Label className={styles['form-label']}>Join-Date</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="joinDate"
                    type="date"
                    value={state.joinDate}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label className={styles['form-label']}>Leave-date</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
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
                  className={styles['removeFormButton']}
                  onClick={() => handleRemoveClick(idx)}
                >
                  Remove
                </Button>
              )}
              {formState.length - 1 === idx && (
                <Button className={styles['addNewFormButton']} onClick={handleAddClick}>
                  Add
                </Button>
              )}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center" }}>
          <Button className={styles['jobFormSubmit']} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewJobForm;
