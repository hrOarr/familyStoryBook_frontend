import axios from "axios";
import { Config } from "../Config/apiConfig";

const url = "http://localhost:8081/api/v1/family/member";

const config = Config();

export async function getAllMembersByRoot(fid){
    let members = null;
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
  await axios.post(`${url}/add/familyId/${fid}/parentId/${pid}`, payload, config)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}

export async function getAllMembersByFid(fid){
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