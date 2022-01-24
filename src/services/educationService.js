import axios from "axios";
import { Config } from "../Config/apiConfig"; 

const url = "http://localhost:8081/api/v1/member/education";

const config = Config();

export async function getAll(mid,fid){
    let educationList = null;
    await axios.get(`${url}/getAll/memberId/${mid}/familyId/${fid}`, config)
    .then((res)=>{
        console.log(res.data)
        educationList=res.data;
    })
    .catch((err)=>{
        console.log("Error in getAll educations " + err);
        return err;
    })
    return educationList;
}

export async function addEducation(payload, mid, fid){
  await axios.post(`${url}/save/memberId/${mid}/familyId/${fid}`, payload, config)
  .then((res)=>{
    console.log(res)
    return res;
  })
  .catch((err)=>{
    console.log("Error from addEducation service");
    return err;
  })
}

export async function getEducationForEdit(eid, mid, fid){
  let education = null;
  await axios.get(`${url}/edit/id/${eid}/memberId/${mid}/familyId/${fid}`, config)
  .then((res)=>{
    console.log(res);
    education = res.data;
  })
  .catch((err)=>{
    console.log("Error:: from getEducationForEdit");
    return err;
  });

  return education;
}
export async function updateEducation(payload, eid, mid, fid){
  console.log(payload)
  await axios.put(`${url}/update/id/${eid}/memberId/${mid}/familyId/${fid}`, payload, config)
  .then((res)=>{
    console.log(res.data);
    return res;
  })
  .catch((err)=>{
    console.log("Error:: updateEducation");
    return err;
  })
}

export async function deleteEducation(eid, mid, fid){
  await axios.delete(`${url}/delete/id/${eid}/memberId/${mid}/familyId/${fid}`, config)
  .then((res)=>{
    console.log("Success:: deleted", res.data);
    return res;
  })
  .catch((err)=>{
    console.log("Error:: deleteEducation", err);
    return err;
  });
}