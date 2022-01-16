import { useState, useEffect } from "react";
import { useParams } from "react-router";
import EditEducationForm from "../../components/Education/editEducationForm";
import { getEducationForEdit } from "../../services/educationService";

const EditEducation = () => {
  const [education, setEducation] = useState(null);
  const { educationId, memberId } = useParams();

  useEffect(async ()=>{
    await getEducationForEdit(educationId, memberId, 8)
    .then((res)=>{
      console.log(res);
      setEducation(res);
    })
    .catch((err)=>{
      console.log("Error:: editEducation");
    })
  },[])

    return (
        <div>
          {
            education!==null && <EditEducationForm education={education} memberId={memberId}/>
          }
        </div>
    );
}

export default EditEducation;