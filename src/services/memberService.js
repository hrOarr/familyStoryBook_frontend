import axios from "axios";
import { Config } from "../Config/apiConfig";

const url = "http://localhost:8081/api/v1/family/member";

export async function getById(fid, mid) {
  const config = Config();
  return await axios.get(`${url}/memberId/${mid}/familyId/${fid}`, config);
}

export async function getAllMembersByRoot(fid){
    let members = null;
    const config = Config();
    await axios.get(`${url}/root/${fid}`, config)
    .then((res)=>{
        members = res.data;
    })
    .catch((err)=>{
        console.log("Error from getAllMembersByRoot");
    });

    return members;
}

export async function saveNewMember(payload, pid, fid){ 
  const config = Config(); 
  await axios.post(`${url}/add/familyId/${fid}/parentId/${pid}`, payload, config)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}

export async function getAllMembersByFid(fid){
  const config = Config();
  let allMembers = null;
  await axios.get(`${url}/getAll/familyId/${fid}`, config)
  .then((res)=>{
    console.log(res)
    allMembers = res.data;
  })
  .catch((err)=>{
    console.log(err)
  })

  return allMembers;
}