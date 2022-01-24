import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";
import EditAchievementForm from "../../components/Achievement/editAchievementForm";
import { getAchievementForEdit } from "../../services/achievementService";

const EditAchievement = (props) => {
  const [achievement, setAchievement] = useState(null);
  const { achievementId, memberId } = useParams();

  useEffect(async () => {
    await getAchievementForEdit(achievementId, memberId, 8)
      .then((res) => {
        console.log(res);
        setAchievement(res);
      })
      .catch((err) => {
        console.log("Error:: editAchievement");
      });

      //console.log(new File([new Blob([achievement.imageBase64])], achievement.image_name, {type: achievement.image_type}));
      //setAchievement({...achievement, ['image']: new File([new Blob([achievement.imageBase64])], achievement.image_name, {type: achievement.image_type})});
  }, []);

  return (
    <div>
      <Row>
        <Col md="8" className="offset-md-2">
          {achievement !== null && (
            <EditAchievementForm
              achievement={achievement}
              memberId={memberId}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EditAchievement;
