import axios from "axios";

const url = "http://localhost:8081/api/v1/auth";

const getConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  };
  return config;
}

export async function signup(payload){
    const config = getConfig();
    return await axios.post(`${url}/register`, payload, config);
}

export async function login(payload){
    const config = getConfig();
    return await axios.post(`${url}/login`, payload, config);
}