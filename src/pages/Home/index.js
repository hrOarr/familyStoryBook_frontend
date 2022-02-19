import { Container, Row, Col } from "react-bootstrap";

import BackgroundImage from "../../images/family-custom.jpg";
import "./index.css";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="block">
            <Row>
              <Col md="6" className="offset-md-3">
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingTop: "150px",
                    letterSpacing: "0.08rem",
                    fontFamily: 'lato',
                    textShadow: '1px 1px 3px white'
                  }}
                >
                  A Place where you can make your family organized, share and
                  analysis everything inside family member
                </h1>
              </Col>
            </Row>
          </div>
          <Row style={{backgroundColor: '#3b5772', height: '200px', boxShadow: '3px 3px 3px lightblue', marginBottom: '5px', borderRadius: '2px'}}>
              <Col>
                <h2
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: '10px',
                    letterSpacing: "0.04rem"
                  }}
                >
                  How Do You Start Using FamiyTree
                </h2>
              </Col>
            </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
