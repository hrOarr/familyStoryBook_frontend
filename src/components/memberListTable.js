import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllMembersByFid } from "../services/memberService";
import DataTable from "react-data-table-component";
import { useAuthState } from "../Context/AuthContext";
import { TailSpin } from "react-loader-spinner";
import * as styles from "./memberListTable.module.css";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "800",
      fontSize: "0.9rem",
      background: "#e5eaf0",
    },
  },
  rows: {
    style: {
      color: "#566373",
      fontSize: "15px",
      fontWeight: "600",
      letterSpacing: "0.03rem",
    },
  },
};

const MemberListTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    {
      name: "First-name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last-name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Birthdate",
      selector: (row) => row.birthDate,
      sortable: true,
    },
    {
      name: "Deathdate",
      selector: (row) => row.deathDate,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthState();

  useEffect(() => {
    setLoading(true);
    const fetchAllMembers = async () => {
      await getAllMembersByFid(user.id)
        .then((res) => {
          console.log(res);
          let memberList = [];
          res.map((member) =>
            memberList.push({
              firstName: member.firstName,
              lastName: member.lastName,
              gender: member.gender,
              birthDate: member.birthDate,
              deathDate: member.deathDate,
              country: member.country,
              action: (
                <Link to={`/family/members/${member.id}`}>
                  <Button className={styles.detailsButton}>Details</Button>
                </Link>
              ),
            })
          );
          setData(memberList);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllMembers();
  }, []);

  return (
    <Container>
      {loading == true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "100px",
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
        data.length > 0 && (
          <Row>
            <div style={{ textAlign: "center", paddingTop: "25px" }}>
              <h3 style={{ color: "white", letterSpacing: "0.06rem" }}>
                Your family members
              </h3>
              <h4 className={styles["h4-form-header"]}>
                Look all of your favourite persons in one place
              </h4>
            </div>
            <div className={styles.memberListTable}>
              <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
              />
            </div>
          </Row>
        )
      )}
    </Container>
  );
};

export default MemberListTable;
