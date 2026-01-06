import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-app-backend-otw0.onrender.com",
});

export default instance;
