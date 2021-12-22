import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import moment from "moment";

function diff_years(deathDate, birthDate) {
  const dt2 = new Date(deathDate);
  const dt1 = new Date(birthDate);
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
          <Modal.Title id="contained-modal-title-vcenter">
            Member Basic Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{memberDetails.name}</h3>
          <p>{diff_years(memberDetails.deathDate, memberDetails.birthDate)} years old</p>
          <p>
            Birthdate:{" "}
            <span style={{ fontStyle: "italic" }}>
              {moment(memberDetails.birthDate).format("MMMM Do YYYY")}{" "}
            </span>
            | Deathdate:{" "}
            {memberDetails.deathDate != null ? (
              <span style={{ fontStyle: "italic" }}>
                {moment(memberDetails.deathDate).format("MMMM Do YYYY")}
              </span>
            ) : (
              <>---</>
            )}
          </p>
          <p>
            Gender: <span>{memberDetails.gender}</span> | Country:{" "}
            <span>{memberDetails.country}</span>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberBasicInfoModal;
