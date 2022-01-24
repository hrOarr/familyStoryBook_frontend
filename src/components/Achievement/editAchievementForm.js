import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateAchievement } from "../../services/achievementService";
import { useAuthState } from '../../Context';

const EditAchievementForm = ({ achievement, memberId }) => {
  const [state, setState] = useState({
    title: achievement.title,
    description: achievement.description,
    image: new File([new Blob([achievement.imageBase64])], achievement.image_name, {type: achievement.image_type})
  });

  const { user } = useAuthState();

  const navigate = useNavigate();

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

    await updateAchievement(formData, achievement.id, memberId, user.id)
    .then((res)=>{
        console.log("Success:: ", res);
        navigate(`/family/members/${memberId}`);
    })
    .catch((err)=>{
        console.log("Error:: editAchievement");
    });
  };

  return (
    <div>
    <h3
      style={{
        color: "white",
        textAlign: "center",
        padding: "30px 0px 20px 0px",
      }}
    >
      Add New Achievement for Current Member
    </h3>
    <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
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
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Add Image</Form.Label>
            <Form.Control
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
          className="achievementFormSubmit"
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
