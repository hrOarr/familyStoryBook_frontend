import { useState, useEffect } from "react";
import { useParams } from "react-router";
import EditJobForm from "../../components/Job/editJobForm";
import { getJobForEdit } from "../../services/jobService";

const EditJob = () => {
  const [job, setJob] = useState(null);
  const { jobId, memberId } = useParams();

  useEffect(async ()=>{
    await getJobForEdit(jobId, memberId, 8)
    .then((res)=>{
      console.log("Success:: ", res);
      setJob(res);
    })
    .catch((err)=>{
      console.log("Error:: editJob");
    })
  },[])

    return (
        <div>
          {
            job!==null && <EditJobForm job={job} memberId={memberId}/>
          }
        </div>
    );
}

export default EditJob;