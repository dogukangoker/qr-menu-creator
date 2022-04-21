import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
});

export default instance;
