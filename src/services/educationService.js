import axios from "axios";

const url = "http://localhost:8081/api/v1/member/education";

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

export async function getAll(mid,fid){
    const config = getConfig();
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
  const config = getConfig();
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
  const config = getConfig();
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
  const config = getConfig();
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
  const config = getConfig();
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