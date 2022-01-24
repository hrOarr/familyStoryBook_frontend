import axios from "axios";
import { Config } from "../Config/apiConfig";

const url = "http://localhost:8081/api/v1/family/event";

const config = Config();

export async function getAllEventsByFamily(fid) {
  let event = null;
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
  await axios.delete(`${url}/delete/${id}`, config)
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log("Error from deleteEvent method");
  })
}
