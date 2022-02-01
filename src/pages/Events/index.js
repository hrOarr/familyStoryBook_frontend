import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllEventsByFamily, deleteEvent } from "../../services/eventService";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuthState } from "../../Context";
import { TailSpin } from "react-loader-spinner";
import * as styles from "./index.module.css";
import { useAlert } from "react-alert";

const Events = () => {
  let [event_list, setEvent_list] = useState([]);
  let [loading, setLoading] = useState(true);

  const { user } = useAuthState();
  const alert = useAlert();

  useEffect(async () => {
    setLoading(true);
    console.log(user.id);
    await getAllEventsByFamily(user.id)
      .then((res) => {
        setEvent_list(res);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("SoA:: error in events->index.js" + err);
      });
  }, [user.id]);

  const handleDeleteEvent = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      alert.info("Request Processing...");
      await deleteEvent(id)
        .then((res) => {
          console.log(res);
          const data = event_list.filter((event) => event.id != id);
          setEvent_list(data);
          alert.removeAll();
          alert.info("Event is deleted successfully");
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
            <Button className={styles.createEventButton}>Add New Event</Button>
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: "30px" }}>
        {loading == true ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TailSpin
              heigth="100"
              width="100"
              color="white"
              ariaLabel="loading"
            />
          </div>
        ) : event_list && event_list.length > 0 ? (
          event_list.map((event, idx) => (
            <Col md="6">
              <div className={styles.eventList}>
                <h1 className={styles.eventName}>{event.eventName}</h1>
                <p className={styles.eventDetails}>{event.eventDetails}</p>
                <p className={styles.eventTime}>
                  Event Time-Schedule:{" "}
                  <span>
                    {moment(event.eventDateTime).format("MMMM Do YYYY")}
                  </span>
                </p>
                <div style={{ display: "inline-block" }}>
                  <Link to={`/family/events/edit/${event.id}`}>
                    <Button className={styles.editEventButton}>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteEvent(event.id)}
                    className={styles.deleteEventButton}
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
            <h5 style={{ color: "#97aecc" }}>No event yet...</h5>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Events;
