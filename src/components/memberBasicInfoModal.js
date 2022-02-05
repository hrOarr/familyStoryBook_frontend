import Modal from "react-bootstrap/Modal";
import { Button, Col, Row } from "react-bootstrap";
import moment from "moment";

function diff_years(deathDate, birthDate) {
  let dt2 = new Date(deathDate);
  const dt1 = new Date(birthDate);
  if(deathDate==null){
    dt2 = new Date();
  }
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
}

const MemberBasicInfoModal = ({ show, hideModal, memberDetails }) => {
  let now;
  return (
    <div>
      <Modal
        show={show}
        onHide={(e) => hideModal(e)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#b5b5bf" }}
          >
            Member Basic Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3
            style={{
              color: "#445e6e",
              letterSpacing: "0.06rem",
              fontWeight: "700",
            }}
          >
            {memberDetails.name}
          </h3>
          <Row>
            <Col>
              <span style={{ fontWeight: "700" }}>
                {diff_years(memberDetails.deathDate, memberDetails.birthDate)}
              </span>{" "}
              <span style={{ fontWeight: "500" }}>years old</span>
            </Col>
            <Col>
              <span style={{ fontWeight: "500" }}>
                {memberDetails.gender == "male" ? "He" : "She"} has{" "}
              </span>
              <span style={{ fontWeight: "700" }}>
                {memberDetails.children.length}
              </span>
              <span style={{ fontWeight: "500" }}> child(s)</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span
                style={{
                  color: "#71a3d2",
                  fontWeight: "600",
                  letterSpacing: "0.05rem",
                }}
              >
                Living Period:
              </span>{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "#6e7176",
                  fontWeight: "600",
                }}
              >
                {moment(memberDetails.birthDate).format("MMMM Do YYYY")}{" "}
              </span>
              <span> - </span>
              {memberDetails.deathDate != null ? (
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#6e7176",
                    fontWeight: "600",
                  }}
                >
                  {moment(memberDetails.deathDate).format("MMMM Do YYYY")}
                </span>
              ) : (
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#6e7176",
                    fontWeight: "600",
                  }}
                >
                  alive
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <span
                style={{
                  color: "#71a3d2",
                  fontWeight: "600",
                  letterSpacing: "0.05rem",
                }}
              >
                Gender:{" "}
              </span>
              <span style={{ fontWeight: "600" }}>{memberDetails.gender}</span>
            </Col>
            <Col>
              <span
                style={{
                  color: "#71a3d2",
                  fontWeight: "600",
                  letterSpacing: "0.05rem",
                }}
              >
                Born In:
              </span>{" "}
              <span style={{ fontWeight: "600" }}>{memberDetails.country}</span>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MemberBasicInfoModal;
