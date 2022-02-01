import { Button } from "react-bootstrap";
import * as styles from './addRootMember.module.css';

const AddRootButton = ({showModal}) => {
    return (
        <div style={{paddingTop: '30px'}}>
          <Button onClick={()=>showModal(null, 2)} className={styles.createButton}>
            <span style={{fontWeight: '600', fontSize: '17px', letterSpacing: '0.03rem'}}>Add Root</span>
          </Button>
        </div>
    );
}

export default AddRootButton;