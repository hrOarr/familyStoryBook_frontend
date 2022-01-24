import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { getAll, deleteEducation } from "../../services/educationService";
import { useAuthState } from '../../Context';
import moment from "moment";
import "./educationList.css";

const EducationList = () => {
  const [educations, setEducations] = useState([]);
  const { memberId } = useParams();
  const { user } = useAuthState();

  useEffect(() => {
    const fetchAllEducations = async () => {
      await getAll(memberId, user.id)
        .then((res) => {
          console.log(res);
          setEducations(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllEducations();
  }, []);

  const handleDeleteEducation = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
        await deleteEducation(id, memberId, user.id).then((res)=>{
          console.log("Success:: ", res);
          let filteredList = educations.filter((edu)=>edu.id!==id);
          setEducations(filteredList);
        })
        .catch((err)=>{
          console.log("Error:: ", err);
        });
    }
  };

  return (
    <div className="educationList">
      <Row>
        {educations && educations.length > 0 ? (
          educations.map((edu, idx) => (
            <Col md="12">
              <div className="educationCard">
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
                    <Button className="editEventButton">Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteEducation(edu.id)}
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
          <div>Loading ...</div>
        )}
      </Row>
    </div>
  );
};

export default EducationList;
