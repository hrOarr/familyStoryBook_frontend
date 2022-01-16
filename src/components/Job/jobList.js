import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAll, deleteJob } from "../../services/jobService";
import moment from "moment";
import "./jobList.css";

const EducationList = () => {
  const [jobs, setJobs] = useState([]);
  const { memberId } = useParams();

  useEffect(() => {
    const fetchAllJobs = async () => {
      await getAll(memberId, 8)
        .then((res) => {
          console.log(res);
          setJobs(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
        await deleteJob(id, memberId, 8).then((res)=>{
          console.log("Success::", res);
          const filteredJobs = jobs.filter((job)=>job.id!==id);
          setJobs(filteredJobs);
        })
        .catch((err)=>{
          console.log("Error:: deleteJob", err);
        });
    }
  };

  return (
    <div className="jobList">
      <Row>
        {jobs && jobs.length > 0 ? (
          jobs.map((job, idx) => (
            <Col md="12">
              <div className="jobCard">
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
                    <Button className="editEventButton">Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteJob(job.id)}
                    className="deleteEventButton"
                    style={{ marginLeft: "12px" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div>Loading ...</div>
        )}
      </Row>
    </div>
  );
};

export default EducationList;
