import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button, Figure } from "react-bootstrap";
import { deleteAchievement } from "../../services/achievementService";
import { useAuthState } from "../../Context/AuthContext";
import { useAlert } from "react-alert";
import { TailSpin } from "react-loader-spinner";
import {
  useAchievementState,
  useAchievementDispatch,
  getAllAchievements,
} from "../../Context/achievementContext";
import * as styles from "./achievementList.module.css";

const AchievementList = (props) => {
  const [loading, setLoading] = useState(true);
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { achievements } = useAchievementState();
  const dispatch = useAchievementDispatch();
  const alert = useAlert();

  useEffect(() => {
    setLoading(true);
    const fetchAllAchievements = async () => {
      await getAllAchievements(dispatch, { mid: memberId, fid: user.id });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchAllAchievements();
  }, []);

  const handleDeleteAchievement = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      alert.info("Request Processing...");
      await deleteAchievement(id, memberId, user.id)
        .then((res) => {
          console.log("Delete:: ", res);
          const fetchAllAchievements = async () => {
            await getAllAchievements(dispatch, { mid: memberId, fid: user.id });
          };
          fetchAllAchievements();
          alert.removeAll();
          alert.success("Education is deleted successfully");
        })
        .catch((err) => {
          console.log("Error:: ", err);
        });
    }
  };

  return (
    <div className={styles['achievementList']}>
      <Row>
        {loading == true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
          achievements.length > 0 &&
          achievements.map((achieve, idx) => (
            <Col md="6">
              <div className={styles['achievementCard']}>
                <h4 style={{ paddingBottom: "5px" }}>{achieve.title}</h4>
                <div style={{ textAlign: "center" }}>
                  <Figure>
                    <Figure.Image
                      style={{ width: "100%", height: "25rem" }}
                      src={`${achieve.imageBase64}`}
                    />
                  </Figure>
                </div>
                <p>{achieve.description}</p>
                <div style={{ display: "inline-block" }}>
                  <Link
                    to={`/family/members/${memberId}/achievement/${achieve.id}`}
                  >
                    <Button className={styles['editButton']}>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteAchievement(achieve.id)}
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

export default AchievementList;
