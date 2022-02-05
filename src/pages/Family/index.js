import { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { getAllMembersByRoot } from "../../services/memberService";
import { getCustomMembersList } from "../../utils/importants";
import { Button } from "react-bootstrap";
import MemberBasicInfoModal from "../../components/memberBasicInfoModal";
import AddMemberModal from "../../components/addMemberModal";
import AddRootButton from "../../components/addRootMember";
import { useAuthState } from "../../Context/AuthContext";
import { TailSpin } from "react-loader-spinner";
import { useAlert } from 'react-alert';
import "./index.css";
import * as styles from './styles/index.module.css';

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
        <div className={styles['member-card']}>
          <h3 style={{ textAlign: "center", letterSpacing: '0.04rem' }}>{nodeDatum.name}</h3>
          <div style={{textAlign: 'center', marginBottom: '5px'}}>
            <Button onClick={(e) => showModal(nodeDatum, 1)} className={styles['info-button']} style={{marginRight: '6px', padding: '.25rem .4rem'}}>Basic-Info</Button>
            <Button onClick={(e) => showModal(nodeDatum, 2)} className={styles['add-button']} style={{padding: '.25rem .4rem'}}>Add Child</Button>
          </div>
          {nodeDatum.children && (
            <Button className={styles['expand-collapse']} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </Button>
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
  const [loading, setLoading] = useState(true);

  const { user } = useAuthState();
  const alert = useAlert();

  const nodeSize = { x: 250, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  const dimRef = useRef();

  const showModal = (member, val) => {
    console.log("MAGLOG:: ", member)
    setShow(val);
    setMemberDetails(member);
  };

  const hideModal = () => {
    setShow(0);
  };

  useEffect(() => {
    setLoading(true);
    const fetchMembers = async () => {
      await getAllMembersByRoot(user.id)
        .then((res) => {
          console.log(res);
          setMembers(getCustomMembersList(res));
          setTimeout(()=>{
            setLoading(false);
          },2000);
        })
        .catch((err) => {
          console.log("Error " + err);
          alert.error("Something went wrong. Please try later");
          //setLoading(false);
        });
    };

    fetchMembers();
    const dimensions = dimRef.current.getBoundingClientRect();
    console.log(dimensions);
    setTranslate({
      x: dimensions.width / 2,
      y: 100,
    });

  }, []);

  return (
    <div>
      <div ref={dimRef}></div>
      {memberDetails != null && show === 1 && (
        <MemberBasicInfoModal
          show={show}
          hideModal={hideModal}
          memberDetails={memberDetails}
        />
      )}
      {show === 2 && (
        <AddMemberModal
          show={show}
          hideModal={hideModal}
          parentDetails={memberDetails}
        />
      )}

      { loading==true ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', paddingTop: '100px' }}>
            <TailSpin
              heigth="100"
              width="100"
              color="white"
              ariaLabel="loading"
            />
        </div>
      ):
      members != null ? (
      <div
        ref={dimRef}
        id="treeWrapper"
        style={{ width: "100%", height: "100vh" }}
      >
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
      </div>
      ) : (
        <div style={{color: 'white', textAlign: 'center', paddingTop: '100px'}}>
              <div style={{fontSize: '17px', letterSpacing: '0.08rem'}}>You have not started to make your tree yet</div>
              <AddRootButton showModal={showModal} />
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
