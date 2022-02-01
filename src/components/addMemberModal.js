import Modal from "react-bootstrap/Modal";
import { Button, Row } from "react-bootstrap";
import AddMemberForm from "./addMemberForm";

const AddMemberModal = ({ show, hideModal, parentDetails }) => {
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
            style={{ textAlign: "center" }}
          >
            {parentDetails != null ? (
              <div>
                <Row>
                  <div style={{ color: "#b5b5bf" }}>Add New Member</div>
                </Row>
                <Row>
                  <span
                    style={{
                      color: "#71a3d2",
                      fontWeight: "600",
                      letterSpacing: "0.05rem",
                    }}
                  >
                    (Parent)
                  </span>
                </Row>
                <Row>
                  <span
                    style={{
                      letterSpacing: "0.05rem",
                      fontWeight: "700",
                      color: "#445e6e",
                    }}
                  >
                    {parentDetails.name}
                  </span>
                </Row>
              </div>
            ) : (
              <div style={{ color: "#b5b5bf" }}>Add Root Member to make tree</div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMemberForm
            hideModal={hideModal}
            parentId={parentDetails != null ? parentDetails.id : 0}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddMemberModal;
