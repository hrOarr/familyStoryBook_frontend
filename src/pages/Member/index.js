import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import MemberEducation from "../../components/Education";
import MemberJob from "../../components/Job";
import MemberAchievement from "../../components/Achievement";
import { Tabs, Tab } from "react-bootstrap";
import './index.css';

const MemberDashboard = (props) => {
  const [key, setKey] = useState("education");

  return (
    <div>
      <Container>
        <Row>
          <Tabs
            className="tabs"
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
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
