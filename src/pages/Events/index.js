import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllEventsByFamily, deleteEvent } from "../../services/eventService";
import { Link } from "react-router-dom";
import moment from "moment";
import "./index.css";

const Events = () => {
  let [event_list, setEvent_list] = useState([]);

  useEffect(async () => {
    await getAllEventsByFamily(8)
      .then((res) => {
        setEvent_list(res);
        console.log(res);
      })
      .catch((err) => {
        console.log("SoA:: error in events->index.js" + err);
      });
  }, []);

  const handleDeleteEvent = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteEvent(id)
        .then((res) => {
          console.log(res);
          const data = event_list.filter((event)=>event.id!=id);
          setEvent_list(data);
        })
        .catch((err) => {
          console.log("Error from deleteEvent");
        });
    }
  };

  return (
    <Container style={{ marginTop: "15px" }}>
      <Row>
        <Col style={{ textAlign: "center", paddingTop: "25px" }}>
          <h3 style={{ color: "white" }}>Events by You(family)</h3>
          <Link to="/family/events/add-new">
            <Button className="createEventButton">Add New Event</Button>
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: "30px" }}>
        {event_list && event_list.length == 0 && (
          <div style={{ color: "white", textAlign: "center" }}>Loading...</div>
        )}
        {event_list && event_list.length > 0 ? (
          event_list.map((event, idx) => (
            <Col md="6">
              <div className="eventList">
                <h1 className="eventName">{event.eventName}</h1>
                <p className="eventDetails">{event.eventDetails}</p>
                <p className="eventTime">
                  Event Time-Schedule:{" "}
                  <span>
                    {moment(event.eventDateTime).format("MMMM Do YYYY")}
                  </span>
                </p>
                <div style={{ display: "inline-block" }}>
                  <Link to={`/family/events/edit/${event.id}`}>
                    <Button className="editEventButton">Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="deleteEventButton"
                    style={{ marginLeft: "12px" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col md="6">
            <h5 style={{ color: "#97aecc" }}>Not event yet...</h5>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Events;
