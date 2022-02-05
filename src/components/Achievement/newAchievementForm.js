import { useState, useRef } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { saveNewAchievement } from "../../services/achievementService";
import { useAuthState } from '../../Context/AuthContext';
import { getAllAchievements, useAchievementDispatch } from "../../Context/achievementContext";
import { useMemberState } from '../../Context/MemberContext';
import { useAlert } from "react-alert";
import * as styles from "./newAchievementForm.module.css";

const NewAchievementForm = ({memberId}) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    image: ""
  });

  const { user } = useAuthState();
  const dispatch = useAchievementDispatch();
  const { member } = useMemberState();
  const alert = useAlert();

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
    console.log("I am submit zone", state);

    const data = JSON.stringify({title: state.title, description: state.description});
    let formData = new FormData();
    formData.append('data', data);
    formData.append('image', state.image);

    alert.info('Request Processing...');
    await saveNewAchievement(formData, memberId, user.id).then((res)=>{
        console.log("Success:: ", res);
        setState({
          title: "",
          description: "",
          image: ""
        });
        alert.removeAll();
        alert.success('Achievement is added successfully');
        const getAll = async ()=>{
          await getAllAchievements(dispatch, {mid: memberId, fid: user.id});
        };
        getAll();
    })
    .catch((err)=>{
        console.log("Error:: saveAchievement");
    });
  };

  return (
    <div>
      <h3 className={styles['h3-form-header']}>
        Add New Achievement
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
            className={styles['achievementFormSubmit']}
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

export default NewAchievementForm;
