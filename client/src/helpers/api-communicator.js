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

export const getFavBooks = async () => {
  try {
    const response = await axios.get("/book", {
      headers: {
        "access-token": localStorage.getItem("access-token"),
      },
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const AddBook = async (data) => {
  try {
    const response = await axios.post(
      "/book/create",
      { data },
      {
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      }
    );

    if (response) {
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const EditBook = async (id, { title, author }) => {
  try {
    const response = await axios.patch(
      `/book/${id}`,
      { title, author },
      {
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      }
    );

    if (response) {
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
