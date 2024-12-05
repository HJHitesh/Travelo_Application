import axios from "axios";

type User = {
  uname: string;
  password: string;
};

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/users/create",
      {
        username: user.uname,
        password: user.password,
      }
    );
    console.log("User created:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const loginUser = async (user: User) => {
  try {
    const response = await axios.post("http://localhost:8081/api/login", {
      username: user.uname,
      password: user.password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
