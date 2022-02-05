import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { deleteEducation } from "../../services/educationService";
import { useAuthState } from "../../Context/AuthContext";
import {
  useEducationState,
  useEducationDispatch,
  getAllEducations,
} from "../../Context/EducationContext";
import moment from "moment";
import { useAlert } from "react-alert";
import { TailSpin } from "react-loader-spinner";
import * as styles from "./educationList.module.css";

const EducationList = () => {
  const [loading, setLoading] = useState(true);
  const { memberId } = useParams();
  const { user } = useAuthState();
  const dispatch = useEducationDispatch();
  const { educations } = useEducationState();
  const alert = useAlert();

  useEffect(() => {
    setLoading(true);
    const fetchAllEducations = async () => {
      await getAllEducations(dispatch, { mid: memberId, fid: user.id });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchAllEducations();
  }, []);

  const handleDeleteEducation = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      alert.info("Request Processing...");
      await deleteEducation(id, memberId, user.id)
        .then((res) => {
          const fetchAllEducations = async () => {
            await getAllEducations(dispatch, { mid: memberId, fid: user.id });
          };
          fetchAllEducations();
          alert.removeAll();
          alert.success("Education is deleted successfully");
        })
        .catch((err) => {
          console.log("Error:: ", err);
        });
    }
  };

  return (
    <div className={styles['educationList']}>
      <Row>
      {loading == true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TailSpin
            heigth="100"
            width="100"
            color="white"
            ariaLabel="loading"
          />
        </div>
      ) : (
        educations.length > 0 &&
          educations.map((edu, idx) => (
            <Col md="12">
              <div className={styles['educationCard']}>
                <Row>
                  <Col md="8">
                    <h5>{edu.institution}</h5>
                    <p>{edu.description}</p>
                  </Col>
                  <Col md="4" style={{ textAlign: "right" }}>
                    <p>
                      <span style={{ fontWeight: "bolder" }}>
                        {moment(edu.startDate).format("DD-MM-YYYY")}
                      </span>
                      &nbsp;to{" "}
                      <span style={{ fontWeight: "bolder" }}>
                        {moment(edu.endDate).format("DD-MM-YYYY")}
                      </span>
                    </p>
                  </Col>
                </Row>
                <div style={{ display: "inline-block" }}>
                  <Link to={`/family/members/${memberId}/education/${edu.id}`}>
                    <Button className={styles['editButton']}>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className={styles['deleteButton']}
                    style={{ marginLeft: "12px" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default EducationList;
