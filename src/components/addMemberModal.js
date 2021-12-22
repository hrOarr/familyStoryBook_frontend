import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Member for <h2 style={{fontStyle: 'italic'}}>{parentDetails.name}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMemberForm hideModal={hideModal} parentId={parentDetails.id} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMemberModal;
