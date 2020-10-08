import Axios from "axios";
import { authHeader } from "./authService";

const URL = process.env.REACT_APP_BASE_URL;

export default {
  postWithHeader: (path, payload) => {
    return Axios.post(`${URL}${path}`, payload, authHeader());
  },

  post: (path, payload) => {
    return Axios.post(`${URL}${path}`, payload);
  },

  getWithHeader: (path) => {
    return Axios.get(`${URL}${path}`, authHeader());
  },
};
