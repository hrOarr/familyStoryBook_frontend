import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import MemberEducation from "../../components/Education";
import MemberJob from "../../components/Job";
import MemberAchievement from "../../components/Achievement";
import { useMemberDispatch, getMemberById } from '../../Context/MemberContext';
import { useAuthState } from "../../Context/AuthContext";
import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router";
import './index.css';

const MemberDashboard = (props) => {
  const location = useLocation();
  const [key, setKey] = useState(location.hash!=''?location.hash.substring(1):"education");
  const navigate = useNavigate();

  const { memberId } = useParams();
  const { user } = useAuthState();
  const dispatch = useMemberDispatch();

  useEffect(()=>{
    const fetchMember = async ()=>{
      await getMemberById(dispatch, {fid: user.id, mid: memberId});
    }
    fetchMember();
    navigate('#'+key);
  },[]);

  const handleSelect = (key) => {
    setKey(key);
    navigate('#'+key);
  }

  return (
    <div>
      <Container>
        <Row>
          <Tabs
            className="tabs"
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => handleSelect(k)}
          >
            <Tab className="tab-nav-link" eventKey="education" title="Education">
              <MemberEducation />
            </Tab>
            <Tab className="tab-nav-link" eventKey="job" title="Job">
              <MemberJob />
            </Tab>
            <Tab className="tab-nav-link" eventKey="achievement" title="Achievement">
              <MemberAchievement />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </div>
  );
};

export default MemberDashboard;
