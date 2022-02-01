import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addNewEvent, updateEvent } from "../services/eventService";
import * as styles from "./eventForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthState } from "../Context";
import { useAlert } from "react-alert";

const EventForm = (props) => {
  const [state, setState] = useState({
    eventName: props.isEdit ? props.event.eventName : "",
    eventDetails: props.isEdit ? props.event.eventDetails : "",
    eventDateTime: props.isEdit ? props.event.eventDateTime : new Date(),
  });
  const navigate = useNavigate();
  const { user } = useAuthState();
  const alert = useAlert();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert.info("Request Processing...");
    state.eventDateTime = new Date(state.eventDateTime)
      .toISOString()
      .substring(0, 10);
    if (props.isEdit === false) {
      await addNewEvent(state, user.id)
        .then((res) => {
          console.log(res);
          setState({
            eventName: "",
            eventDetails: "",
            eventDateTime: new Date().toLocaleDateString(),
          });
          alert.removeAll();
          alert.success("Event is added successfully");
          navigate("/family/events");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await updateEvent(state, props.event.id, user.id)
        .then((res) => {
          console.log(res);
          setState({
            eventName: "",
            eventDetails: "",
            eventDateTime: new Date().toLocaleDateString(),
          });
          alert.removeAll();
          alert.success("Event is updated successfully");
          navigate("/family/events");
        })
        .catch((err) => {
          console.log("Error from eventForm.js");
        });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Form.Group className="mb-3" controlId="eventName">
          <Form.Label className={styles["form-label"]}>Event Name</Form.Label>
          <Form.Control
            className={styles['form-control']}
            name="eventName"
            type="text"
            maxLength="55"
            minLength="11"
            placeholder="Enter event name"
            value={state.eventName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="eventDetails">
          <Form.Label className={styles["form-label"]}>
            Event Details
          </Form.Label>
          <Form.Control
            className={styles['form-control']}
            name="eventDetails"
            as="textarea"
            rows={3}
            placeholder="Write details..."
            value={state.eventDetails}
            onChange={handleChange}
            maxLength="255"
            minLength="11"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="eventTime">
          <Form.Label className={styles["form-label"]}>Event Time</Form.Label>
          <Form.Control
            className={styles['form-control']}
            name="eventDateTime"
            type="date"
            value={state.eventDateTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          className={styles.eventFormSubmit}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EventForm;
