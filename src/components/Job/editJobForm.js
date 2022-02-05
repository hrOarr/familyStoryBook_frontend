import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateJob } from "../../services/jobService";
import { useAuthState } from '../../Context/AuthContext';
import { useAlert } from "react-alert";
import { useMemberState, useMemberDispatch, getMemberById } from '../../Context/MemberContext';
import * as styles from './editJobForm.module.css';

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
  const { user } = useAuthState();
  const { member } = useMemberState();
  const dispatch = useMemberDispatch();
  const alert = useAlert();

  useEffect(()=>{
    const fetchMember = async ()=>{
      await getMemberById(dispatch, {fid: user.id, mid: memberId});
    };
    fetchMember();
  },[]);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert.info('Request Processing...');
    await updateJob(state, job.id, memberId, user.id)
      .then((res)=>{
        console.log("Success:: " + res);
        alert.removeAll();
        alert.success('Job is Updated Successfully');
        navigate(`/family/members/${memberId}#job`);
      })
      .catch((err)=>{
        console.log("Error:: from editJobForm");
      });
  };

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          <h3 className={styles['h3-form-header']}>
            Edit Job
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  <Form.Label className={styles['form-label']}>Join-Date</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="joinDate"
                    type="date"
                    value={state.joinDate}
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div style={{ textAlign: "center" }}>
              <Button className={styles['editButton']} variant="primary" type="submit">
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
