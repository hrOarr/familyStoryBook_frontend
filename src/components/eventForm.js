import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addNewEvent, updateEvent } from "../services/eventService";
import "./eventForm.css";
import "react-datepicker/dist/react-datepicker.css";

const EventForm = (props) => {
  const [state, setState] = useState({
    eventName: props.isEdit ? props.event.eventName : "",
    eventDetails: props.isEdit ? props.event.eventDetails : "",
    eventDateTime: props.isEdit ? props.event.eventDateTime : new Date(),
  });
  const navigate = useNavigate();

  console.log(props.isEdit + "::");

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    console.log(name + " " + value);

    setState({ ...state, [name]: value });
  };

  console.log(state)

  const handleSubmit = async (e) => {
    e.preventDefault();

    state.eventDateTime = new Date(state.eventDateTime).toISOString().substring(0, 10);

    console.log(state.eventDateTime);

    if (props.isEdit === false) {
      await addNewEvent(state, 8)
        .then((res) => {
          console.log(res);
          setState({
            eventName: "",
            eventDetails: "",
            eventDateTime: new Date().toLocaleDateString(),
          });
          navigate("/family/events");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await updateEvent(state, props.event.id, 8)
        .then((res) => {
          console.log(res);
          setState({
            eventName: "",
            eventDetails: "",
            eventDateTime: new Date().toLocaleDateString(),
          });
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
          <Form.Label>Event Name</Form.Label>
          <Form.Control
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
          <Form.Label>Event Details</Form.Label>
          <Form.Control
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
          <Form.Label>Event Time</Form.Label>
          <Form.Control
            name="eventDateTime"
            type="date"
            value={state.eventDateTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="eventFormSubmit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EventForm;
