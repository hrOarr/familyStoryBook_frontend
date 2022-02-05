import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateAchievement } from "../../services/achievementService";
import { useAuthState } from '../../Context/AuthContext';
import { useMemberState, useMemberDispatch, getMemberById } from '../../Context/MemberContext';
import { useAlert } from "react-alert";
import * as styles from './editAchievementForm.module.css';

const EditAchievementForm = ({ achievement, memberId }) => {
  const [state, setState] = useState({
    title: achievement.title,
    description: achievement.description,
    image: new File([new Blob([achievement.imageBase64])], achievement.image_name, {type: achievement.image_type})
  });

  const { user } = useAuthState();
  const navigate = useNavigate();
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
    console.log(e.target)
    if(name=="image"){
      setState({ ...state, [name]: e.target.files[0] });
    }
    else setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({title: state.title, description: state.description});
    let formData = new FormData();
    formData.append('data', data);
    formData.append('image', state.image);

    alert.info('Request Processing...');
    await updateAchievement(formData, achievement.id, memberId, user.id)
    .then((res)=>{
        console.log("Success:: ", res);
        alert.removeAll();
        alert.success('Achievement is updated successfully');
        navigate(`/family/members/${memberId}#achievement`);
    })
    .catch((err)=>{
        console.log("Error:: editAchievement");
    });
  };

  return (
    <div>
    <h3 className={styles['h3-form-header']}>
      Edit Achievement
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
          <Form.Group className="mb-3" controlId="title">
            <Form.Label className={styles['form-label']}>Title</Form.Label>
            <Form.Control
              className={styles['form-control']}
              name="title"
              type="text"
              maxLength="55"
              minLength="11"
              placeholder="Enter title"
              value={state.title}
              onChange={handleChange}
              required
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
          <Form.Group className="mb-3" controlId="image">
            <Form.Label className={styles['form-label']}>Add Image</Form.Label>
            <Form.Control
              className={styles['form-control']}
              name="image"
              type="file"
              onChange={handleChange}
              required
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
  </div>
  );
};

export default EditAchievementForm;
