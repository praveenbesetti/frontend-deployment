import axios from "axios";

const API = "https://backend-deployment.duckdns.org/api";

console.log("api"+API)
export const getS3Url = () => axios.get(`${API}/s3-url`);
export const registerUser = (data) => axios.post(`${API}/register`, data);
