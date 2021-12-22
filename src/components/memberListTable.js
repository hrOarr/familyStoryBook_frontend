import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllMembersByFid } from "../services/memberService";
import { MDBDataTableV5 } from "mdbreact";
import "./memberListTable.css";

const MemberListTable = () => {
  const [dataList, setDataList] = useState({
    columns: [
      {
        label: "First-name",
        field: "firstName",
        width: 150,
      },
      {
        label: "Last-name",
        field: "lastName",
        width: 150,
      },
      {
        label: "Gender",
        field: "gender",
        width: 150,
      },
      {
        label: "Birthdate",
        field: "birthDate",
        width: 150,
      },
      {
        label: "Deathdate",
        field: "deathDate",
        width: 150,
      },
      {
        label: "Country",
        field: "country",
        width: 150,
      },
      {
        label: "Action",
        field: 'action',
        width: 150
      }
    ],
    rows: [],
  });

  useEffect(() => {
    const fetchAllMembers = async () => {
      await getAllMembersByFid(8)
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
                <Button className="#">See Details</Button>
              </Link>
              )
            })
          );
          setDataList({ ...dataList, rows: memberList });
          console.log(dataList);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllMembers();
  }, []);

  return (
    <Container>
      {dataList.rows.length > 0 ? (
        <Row>
        <div style={{ textAlign: "center", paddingTop: "25px" }}>
          <h3 style={{ color: "white" }}>Your family members</h3>
          <h4 className="h4-form-header">
              Look all of your favourite persons in one place
          </h4>
        </div>
          <div className="memberListTable">
            <MDBDataTableV5
              hover
              borderless
              theadTextWhite
              entriesOptions={[10, 20, 25]}
              entries={10}
              pagesAmount={4}
              data={dataList}
              style={{ color: "#97aecc", fontSize: "1.05rem" }}
              responsive
              tbodyColor="#334861"
            />
          </div>
        </Row>
      ) : (
        <div style={{ color: "white" }}>Loading ...</div>
      )}
    </Container>
  );
};

export default MemberListTable;
