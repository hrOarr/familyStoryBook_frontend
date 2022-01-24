import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button, Figure } from "react-bootstrap";
import { getAll, deleteAchievement } from "../../services/achievementService";
import { useAuthState } from '../../Context';
import "./achievementList.css";

const AchievementList = (props) => {
  const [achievements, setAchievements] = useState([]);
  const { memberId } = useParams();

  const navigate = useNavigate();
  const { user } = useAuthState();

  useEffect(() => {
    const fetchAllAchievements = async () => {
      await getAll(memberId, user.id)
        .then((res) => {
          console.log(res);
          setAchievements(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllAchievements();
  }, []);

  const handleDeleteAchievement = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteAchievement(id, memberId, user.id).then((res)=>{
        console.log('Delete:: ', res);
        navigate(`/family/members/${memberId}`);
      })
      .catch((err)=>{
        console.log("Error:: ", err);
      });
    }
  };

  return (
    <div className="achievementList">
      <Row>
        {achievements && achievements.length > 0 ? (
          achievements.map((achieve, idx) => (
            <Col md="6">
              <div className="achievementCard">
                <h4 style={{paddingBottom: '5px'}}>{achieve.title}</h4>
                <div style={{textAlign: 'center'}}>
                <Figure>
                <Figure.Image style={{width: '100%', height: '25rem'}} src={`${achieve.imageBase64}`} />
                </Figure>
                </div>
                <p>{achieve.description}</p>
                <div style={{ display: "inline-block" }}>
                  <Link
                    to={`/family/members/${memberId}/achievement/${achieve.id}`}
                  >
                    <Button className="editEventButton">Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteAchievement(achieve.id)}
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

export default AchievementList;
