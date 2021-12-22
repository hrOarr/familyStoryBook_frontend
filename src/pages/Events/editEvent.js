import { useState, useEffect } from "react";
import EventForm from "../../components/eventForm";
import { getSingleEvent } from "../../services/eventService";
import { useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const EditEvent = (props) => {
  const [event, setEvent] = useState(null);
  let { eventId } = useParams();

  console.log(event);

  useEffect(async () => {
    await getSingleEvent(eventId)
      .then((res) => {
        setEvent(res);
      })
      .catch((err) => {
        console.log("Error from editEvent.js " + err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col md="6" className="offset-md-3">
          <div>
            <h3 className="h3-form-header">Edit your Event</h3>
            <h4 className="h4-form-header">
              Share moments all-together and keep communication alive
            </h4>
            {event != null && <EventForm event={event} isEdit={true} />}{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
