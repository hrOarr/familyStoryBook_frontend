import axios from "axios";
import { Config } from "../Config/apiConfig"; 

const url = "http://localhost:8081/api/v1/member/achievement";


export async function getAll(mid, fid){
  const config = Config();
  return await axios.get(`${url}/getAll/memberId/${mid}/familyId/${fid}`, config);
}

export async function getAchievementForEdit(aid, mid, fid) {
  let achievement = null;
  const config = Config();
  await axios.get(`${url}/edit/id/${aid}/memberId/${mid}/familyId/${fid}`, config)
  .then((res)=>{
    console.log("Success:: ", res);
    achievement = res.data;
  })
  .catch((err)=>{
    console.log("Error:: ", err);
  });
  return achievement;
}

export async function saveNewAchievement(payload, mid, fid){
    const config = Config();
    config['Content-type'] = "multipart/form-data";
    await axios.post(`${url}/save/memberId/${mid}/familyId/${fid}`, payload, config)
    .then((res)=>{
        console.log("Success:: ", res);
        return res;
    })
    .catch((err)=>{
        console.log("Error:: saveNewAchievement");
        return err;
    });
}

export async function updateAchievement(paylod, aid, mid, fid){
  const config = Config();
  await axios.post(`${url}/update/id/${aid}/memberId/${mid}/familyId/${fid}`, paylod, config)
  .then((res)=>{
    console.log("Success:: ", res);
  })
  .catch((err)=>{
    console.log("Error:: ", err);
  });
}

export async function deleteAchievement(aid, mid, fid){
  const config = Config();
  await axios.delete(`${url}/delete/id/${aid}/memberId/${mid}/familyId/${fid}`, config)
  .then((res)=>{
    console.log("Success:: ", res);
  })
  .catch((err)=>{
    console.log("Error:: ", err);
  });
}