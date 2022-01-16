import axios from "axios";

const url = "http://localhost:8081/api/v1/family/event";

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

export async function getAllEventsByFamily(fid) {
  let event = null;
  const config = getConfig();

  await axios.get(`${url}/allEventsBy/${fid}`, config)
    .then((res) => {
      //console.log(res.data);
      event = res.data;
    })
    .catch((err) => {
      console.log("SoA:: error in getAllEventsByFamily------->" + err.response);
      event = err.response;
    });

    return event;
}

export async function addNewEvent(payload, fid){
  const config = getConfig();
  console.log(config)

  await axios.post(`${url}/add/familyId/${fid}`, payload, config
  )
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log(err);
  });

}

export async function getSingleEvent(id){
  const config = getConfig();
  let event = null;
  await axios.get(`${url}/edit/eventId/${id}`, config)
  .then((res)=>{
    event = res.data;
  })
  .catch((err)=>{
    console.log(err);
  });

  return event;
}

export async function updateEvent(payload, id, fid){
  const config = getConfig();
  await axios.put(`${url}/update/familyId/${fid}/eventId/${id}`,
  payload, config)
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log("Error from updateEvent method");
  })
}

export async function deleteEvent(id){
  const config = getConfig();
  await axios.delete(`${url}/delete/${id}`, config)
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log("Error from deleteEvent method");
  })
}
