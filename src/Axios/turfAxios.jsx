
import axios from "axios";
import { useSelector } from "react-redux";
import { turfAPI } from "../Constants/Api";

const createTurfInstance = () => {
  const token = useSelector((state) => state.Turf.Token);

  const turfInstance = axios.create({
    baseURL: turfAPI,
  });


  turfInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return turfInstance;
};

export default createTurfInstance;
