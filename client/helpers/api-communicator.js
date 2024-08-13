import axios from "axios";
import { toast } from "react-toastify";

export const LoginAPI = async (user) => {
  try {
    const response = await axios.post("/user/login", user);

    if (response) {
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const CheckAuth = async () => {
  try {
    const response = await axios.get("/user/check-auth");
    if (response) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};
