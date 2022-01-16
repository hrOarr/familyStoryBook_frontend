import { Row, Col } from "react-bootstrap";
import NewJobForm from "./newJobForm";
import { useParams } from "react-router";

const AddNewJob = (props) => {
  const { memberId } = useParams();

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          <NewJobForm memberId={memberId} />
        </Col>
      </Row>
    </div>
  );
};

export default AddNewJob;
