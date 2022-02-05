import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import NewEducationForm from "./newEducationForm";
import { useMemberState } from "../../Context/MemberContext";
import * as styles from "./addNewEducation.module.css";

const AddNewEducation = (props) => {
  const { memberId } = useParams();
  const { member } = useMemberState();

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          <h3 className={styles["h3-form-header"]}>Add New Education</h3>
          <h4 className={styles["h4-form-header"]}>
            <span style={{ textDecoration: "underline", fontSize: "1.1rem" }}>
              Current Member
            </span>{" "}
            -&nbsp;
            <span
              style={{
                fontSize: "1.3rem",
                letterSpacing: "0.1rem",
                color: "#9cb3c9",
                fontWeight: "600",
              }}
            >
              {member.firstName} {member.lastName}
            </span>
          </h4>
          <NewEducationForm memberId={memberId} />
        </Col>
      </Row>
    </div>
  );
};

export default AddNewEducation;
