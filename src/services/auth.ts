import axios, { type AxiosError } from "axios";
import type User from "@/types/User";
import useLocalStorage from "@/composables/useLocalStorage";

const { hasItem, getItem } = useLocalStorage();

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

if (hasItem("token")) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${getItem(
    "token"
  )}`;
}
export const login = async (form: { email: string; password: string }) => {
  try {
    const res = await instance.post("/login", form);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const register = async (form: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const res = await instance.post("/register", form);
    if (res.status === 201) {
      return res.data;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const getAuth = async function () {
  try {
    const { data } = await instance.get<{ user: User }>("/auth/me");
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
      return false;
    } else {
      throw error;
    }
  }
};

export const logout = async () => {
  try {
    const { status } = await instance.post("/logout");
    if (status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

function handleError(err: AxiosError) {
  console.log(err.response?.data);
  console.log(err.response?.status);
}
