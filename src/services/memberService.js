import axios from "axios";

const url = "http://localhost:8081/api/v1/family/member";

const getConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0aW5nQGdtYWlsLmNvbSIsImV4cCI6MTY0MTg1NTI5NSwiaWF0IjoxNjM5ODU3Mjk1fQ.6kH9Dkc37UZYlTfJtzKwqxZIZcKmAz3IbJRnWv_u20xa3SGhGM2fNf7J2wOuaq1rjYgT0kv_gFxHr6wlMCxULA",
    },
  };
  return config;
}

export async function getAllMembersByRoot(fid){
    const config = getConfig();
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
  const config = getConfig();
  
  await axios.post(`${url}/add/familyId/${fid}/parentId/${pid}`, payload, config)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}

export async function getAllMembersByFid(fid){
  const config = getConfig();
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