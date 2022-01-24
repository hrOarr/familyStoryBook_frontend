import { Row, Col } from "react-bootstrap";
import NewAchievementForm from "./newAchievementForm";
import { useParams } from "react-router";

const AddNewAchievement = (props) => {
  const { memberId } = useParams();

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          <NewAchievementForm memberId={memberId} />
        </Col>
      </Row>
    </div>
  );
};

export default AddNewAchievement;
