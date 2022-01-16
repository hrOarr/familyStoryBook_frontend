import { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { getAllMembersByRoot } from "../../services/memberService";
import { getCustomMembersList } from "../../utils/importants";
import "./index.css";
import { Button } from "react-bootstrap";
import MemberBasicInfoModal from "../../components/memberBasicInfoModal";
import AddMemberModal from "../../components/addMemberModal";

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  showModal,
}) => {
  return (
    <g>
      <circle r={15} />
      <foreignObject {...foreignObjectProps}>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "#dedede",
            width: "80%"
          }}
        >
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          <div>
            <a href="#" onClick={(e) => showModal(nodeDatum, 1)}>
              <Button>Basic-Info</Button>
            </a>
            <Button onClick={(e) => showModal(nodeDatum, 2)}>Add Child</Button>
          </div>
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );
};

const FamilyTree = () => {
  const [members, setMembers] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(0);
  const [memberDetails, setMemberDetails] = useState(null);

  const nodeSize = { x: 250, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  const dimRef = useRef();

  const showModal = (member, val) => {
    setShow(val);
    setMemberDetails(member);
  };

  const hideModal = () => {
    setShow(0);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      await getAllMembersByRoot(8)
        .then((res) => {
          console.log(res);
          setMembers(getCustomMembersList(res));
        })
        .catch((err) => {
          console.log("Error " + err);
        });
    };

    fetchMembers();

    const dimensions = dimRef.current.getBoundingClientRect();

    console.log(dimensions);

    setTranslate({
      x: dimensions.width / 2,
      y: 100,
    });

    console.log(translate);
  }, []);

  return (
    <div>
      {memberDetails!=null && show === 1 && (
        <MemberBasicInfoModal
          show={show}
          hideModal={hideModal}
          memberDetails={memberDetails}
        />
      )}
      {memberDetails!=null && show === 2 && <AddMemberModal show={show} hideModal={hideModal} parentDetails={memberDetails} />}
      <div
        ref={dimRef}
        id="treeWrapper"
        style={{ width: "100%", height: "100vh" }}
      >
        {members != null && (
          <Tree
            data={members}
            orientation={"vertical"}
            translate={translate}
            initialDepth={2}
            const
            nodeSize={nodeSize}
            allowForeignObjects
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
                showModal,
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
