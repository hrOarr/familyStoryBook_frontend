import { Container, Row, Col } from "react-bootstrap";
import * as styles from "./addEvent.module.css";
import EventForm from "../../components/eventForm";

const AddNewEvent = () => {
  return (
    <Container>
      <Row>
        <Col md="6" className="offset-md-3">
          <div>
            <h3 className={styles['h3-form-header']}>New Event for your family</h3>
            <h4 className={styles['h4-form-header']}>
              Share moments all-together and keep communication alive
            </h4>
            <EventForm isEdit={false} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewEvent;
