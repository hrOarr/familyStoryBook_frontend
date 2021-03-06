import axios from "axios";
import { Config } from "../Config/apiConfig";

const url = "http://localhost:8081/api/v1/member/job";

export async function getAll(mid, fid){
    const config = Config();
    return await axios.get(`${url}/getAll/memberId/${mid}/familyId/${fid}`, config);
}

export async function saveNewJob(payload, mid, fid){
  const config = Config();
    await axios.post(`${url}/save/memberId/${mid}/familyId/${fid}`, payload, config)
    .then((res)=>{
        console.log("Success:: ", res);
        return res;
    })
    .catch((err)=>{
        console.log("Error:: ", err);
        return err;
    });
}

export async function getJobForEdit(jid, mid, fid){
  let job = null;
  const config = Config();
  await axios.get(`${url}/edit/id/${jid}/memberId/${mid}/familyId/${fid}`, config)
  .then((res)=>{
    console.log(res);
    job = res.data;
  })
  .catch((err)=>{
    console.log("Error:: from getEducationForEdit");
    return err;
  });

  return job;
}

export async function updateJob(payload, jid, mid, fid){
  const config = Config();
    await axios.put(`${url}/update/id/${jid}/memberId/${mid}/familyId/${fid}`, payload, config)
    .then((res)=>{
      console.log(res.data);
      return res;
    })
    .catch((err)=>{
      console.log("Error:: updateJob");
      return err;
    })
  }
  
  export async function deleteJob(jid, mid, fid){
    const config = Config();
    await axios.delete(`${url}/delete/id/${jid}/memberId/${mid}/familyId/${fid}`, config)
    .then((res)=>{
      console.log("Success:: deleted", res.data);
      return res;
    })
    .catch((err)=>{
      console.log("Error:: deleteJob", err);
      return err;
    });
  }