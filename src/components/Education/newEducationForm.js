import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addEducation } from "../../services/educationService";
import { useAuthState } from '../../Context/AuthContext';
import { useEducationDispatch, getAllEducations } from "../../Context/EducationContext";
import { useAlert } from "react-alert";
import * as styles from "./newEducationForm.module.css";

const NewEducationForm = ({memberId}) => {
  const [formState, setFormState] = useState([
    {
      institution: "",
      description: "",
      startDate: new Date(),
      endDate: new Date()
    }
  ]);

  const { user } = useAuthState();
  const dispatch = useEducationDispatch();
  const alert = useAlert();

  const handleChange = (e, idx) => {
      const {name, value} = e.target;
      const list = [...formState];
      list[idx][name] = value;
      setFormState(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (idx) => {
    const list = [...formState];
    list.splice(idx, 1);
    setFormState(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if(formState.length==3){
        return;
    }
    setFormState([
      ...formState,
      {
        institution: "",
        description: "",
        startDate: new Date(),
        endDate: new Date()
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formState.map((state, idx)=>{
        if(('startDate') in state){
            const list = [...formState];
            list[idx]['startDate'] = new Date(state.startDate).toISOString().substring(0, 10);
            setFormState(list);
        }
        if(('endDate') in state){
            const list = [...formState];
            list[idx]['endDate'] = new Date(state.endDate).toISOString().substring(0, 10);
            setFormState(list);
        }
    });

    alert.info('Request Processing...');
    await addEducation(formState, memberId, user.id)
    .then((res)=>{
        console.log("Success:: addEducation");
        setFormState([
            {
              institution: "",
              description: "",
              startDate: new Date(),
              endDate: new Date()
            }
        ]);
        alert.removeAll();
        alert.success('Education is addedd successfully');
        const fetchAllEducations = async () => {
          await getAllEducations(dispatch, {mid: memberId, fid: user.id});
        };
        fetchAllEducations();
    })
    .catch((err)=>{
        console.log("Error:: addEducation");
    })
    
  };

  console.log("SoA:: " + formState.length);

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        {formState.map((state, idx) => (
          <div>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="institution">
                  <Form.Label className={styles['form-label']}>Institution Name</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="institution"
                    type="text"
                    maxLength="55"
                    minLength="11"
                    placeholder="Enter institution name"
                    value={state.institution}
                    onChange={(e)=>handleChange(e, idx)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label className={styles['form-label']}>Details</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="description"
                    as="textarea"
                    rows={2}
                    placeholder="Write details..."
                    value={state.description}
                    onChange={(e)=>handleChange(e, idx)}
                    maxLength="255"
                    minLength="11"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label className={styles['form-label']}>Start-Date</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="startDate"
                    type="date"
                    value={state.startDate}
                    onChange={(e)=>handleChange(e, idx)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label className={styles['form-label']}>End-date</Form.Label>
                  <Form.Control
                    className={styles['form-control']}
                    name="endDate"
                    type="date"
                    value={state.endDate}
                    onChange={(e)=>handleChange(e, idx)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="btn-box">
              {formState.length !== 1 && (
                <Button
                  className={styles['removeFormButton']}
                  onClick={() => handleRemoveClick(idx)}
                >
                  Remove
                </Button>
              )}
              {formState.length - 1 === idx && (
                <Button className={styles['addNewFormButton']} onClick={handleAddClick}>
                  Add
                </Button>
              )}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center" }}>
          <Button
            className={styles['educationFormSubmit']}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewEducationForm;
