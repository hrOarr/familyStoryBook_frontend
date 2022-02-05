import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { deleteJob } from "../../services/jobService";
import { useAuthState } from '../../Context/AuthContext';
import { useJobState, useJobDispatch, getAllJobs } from '../../Context/JobContext';
import moment from "moment";
import { useAlert } from "react-alert";
import { TailSpin } from "react-loader-spinner";
import * as styles from "./jobList.module.css";

const EducationList = () => {
  const [loading, setLoading] = useState(true);
  const { memberId } = useParams();
  const { user } = useAuthState();
  const { jobs } = useJobState();
  const dispatch = useJobDispatch();
  const alert = useAlert();

  useEffect(() => {
    setLoading(true);
    const fetchAllJobs = async () => {
     await getAllJobs(dispatch, {mid: memberId, fid: user.id});
     setTimeout(() => {
      setLoading(false);
    }, 2000);
    };
    fetchAllJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      alert.info("Request Processing...");
        await deleteJob(id, memberId, user.id).then((res)=>{
          console.log("Success::", res);
          const fetchAllJobs = async () => {
            await getAllJobs(dispatch, {mid: memberId, fid: user.id})
           };
           fetchAllJobs();
           alert.removeAll();
           alert.success("Job is deleted successfully");
        })
        .catch((err)=>{
          console.log("Error:: deleteJob", err);
        });
    }
  };

  return (
    <div className={styles['jobList']}>
      <Row>
      {loading == true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TailSpin
            heigth="100"
            width="100"
            color="white"
            ariaLabel="loading"
          />
        </div>
      ) : (
        jobs.length > 0 &&
          jobs.map((job, idx) => (
            <Col md="12">
              <div className={styles['jobCard']}>
                <Row>
                  <Col md="8">
                    <h5>{job.companyName}</h5>
                    <p>{job.jobRole}</p>
                    <p>{job.description}</p>
                  </Col>
                  <Col md="4" style={{ textAlign: "right" }}>
                    <p>
                      <span style={{ fontWeight: "bolder" }}>
                        {moment(job.joinDate).format("DD-MM-YYYY")}
                      </span>
                      &nbsp;to{" "}
                      <span style={{ fontWeight: "bolder" }}>
                        {moment(job.endDate).format("DD-MM-YYYY")}
                      </span>
                    </p>
                    <p>{job.location}</p>
                  </Col>
                </Row>
                <div style={{ display: "inline-block" }}>
                  <Link to={`/family/members/${memberId}/job/${job.id}`}>
                    <Button className={styles['editButton']}>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteJob(job.id)}
                    className={styles['deleteButton']}
                    style={{ marginLeft: "12px" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default EducationList;
