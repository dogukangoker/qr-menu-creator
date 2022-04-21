import axios from "axios";

const instance = axios.create({
  baseURL: "http://44.201.48.125:5000",
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
});

export default instance;
