import axios from "axios";

const API = "http://localhost:5000/api";

export const getS3Url = () => axios.get(`${API}/s3-url`);
export const registerUser = (data) => axios.post(`${API}/register`, data);
