import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateEducation } from "../../services/educationService";
import { useAuthState } from '../../Context/AuthContext';
import { useMemberState, useMemberDispatch, getMemberById } from '../../Context/MemberContext';
import { useAlert } from "react-alert";
import * as styles from './editEducationForm.module.css';

const EditEducationForm = ({ education, memberId }) => {
  const [state, setState] = useState({
    institution: education.institution,
    description: education.description,
    startDate: education.startDate,
    endDate: education.endDate
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
      await updateEducation(state, education.id, memberId, user.id)
      .then((res)=>{
        console.log("Success:: " + res);
        alert.removeAll();
        alert.success('Education is Updated Successfully');
        navigate(`/family/members/${memberId}#education`);
      })
      .catch((err)=>{
        console.log("Error:: from editEducationForm");
      });
  };

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
        <h3 className={styles["h3-form-header"]}>Edit Education</h3>
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
                <Form.Group className="mb-3" controlId="institution">
                  <Form.Label className={styles['form-label']}>Institution Name</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
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
                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label className={styles['form-label']}>Start-Date</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="startDate"
                    type="date"
                    value={state.startDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label className={styles['form-label']}>End-date</Form.Label>
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
              <Button
                className={styles['editButton']}
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
