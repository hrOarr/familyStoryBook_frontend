import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import NewEducationForm from "./newEducationForm";

const AddNewEducation = (props) => {
  const { memberId } = useParams();

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          <NewEducationForm memberId={memberId} />
        </Col>
      </Row>
    </div>
  );
};

export default AddNewEducation;
