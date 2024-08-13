import axios from "axios";
import { toast } from "react-toastify";

export const LoginAPI = async (user) => {
    
  try {
    const response = await axios.post("/user/login", user);
    
    if (response) {
        console.log(response.data,'res')
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
