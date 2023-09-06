
import axios from "axios";
import { useSelector } from "react-redux";
import { adminAPI } from "../Constants/Api";

const createAdminInstance = () => {
  const token = useSelector((state) => state.Admin.Token);

  const AdminInstance = axios.create({
    baseURL: adminAPI,
  });
  

  AdminInstance.interceptors.request.use(
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

  return AdminInstance;
};

export default createAdminInstance;
