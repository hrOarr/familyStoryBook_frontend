import axios from "axios";

const url = "http://localhost:8081/api/v1/member/job";

const getConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0aW5nQGdtYWlsLmNvbSIsImV4cCI6MTY0NDE1OTc4NCwiaWF0IjoxNjQyMTYxNzg0fQ.k7oKLsgFdq7jIrlFg0pZ_BBNJ_3NFjsEb0rcfa3fqVtkZ4uSHRre92SL3wWjhZdzRO88VwXTREA9WhIrOO_Xyg",
    },
  };
  return config;
}

export async function getAll(mid, fid){
    const config = getConfig();
    let jobList = null;
    await axios.get(`${url}/getAll/memberId/${mid}/familyId/${fid}`, config)
    .then((res)=>{
        console.log("Success:: ", res.data)
        jobList=res.data;
    })
    .catch((err)=>{
        console.log("Error in getAll jobs " + err);
        return err;
    })
    return jobList;
}

export async function saveNewJob(payload, mid, fid){
    const config = getConfig();

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
  const config = getConfig();
  let job = null;
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
    const config = getConfig();
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
    const config = getConfig();
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