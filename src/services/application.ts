import axios, { type AxiosError } from "axios";
import { useMainStore } from "@/stores/main";
import { useAuthStore } from "@/stores/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer " + (useAuthStore().token || localStorage.getItem("token") || ""),
  },
});

instance.interceptors.request.use(
  (config) => {
    const store = useMainStore();
    store.loading = true;
    return config;
  },
  (err) => {
    const store = useMainStore();
    store.loading = false;
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    const store = useMainStore();
    store.loading = false;
    return res;
  },
  (err) => {
    const store = useMainStore();
    store.loading = false;
    return Promise.reject(err);
  }
);

const application = {
  async getAll(page?: number) {
    try {
      if (page) {
        const { data } = await instance.get(`/applications?page=${page}`);
        return data;
      }
      const { data } = await instance.get("/applications");
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleError(err);
      } else {
        throw err;
      }
    }
  },

  async getSingle(slug: string) {
    try {
      const { data } = await instance.get(`/applications/${slug}`);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleError(err);
      } else {
        throw err;
      }
    }
  },

  async create(slug: string, application: any) {
    try {
      const { data } = await instance.post(`/jobs/${slug}/apply`, application);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleError(err);
      } else {
        throw err;
      }
    }
  },
};

const handleError = (err: AxiosError) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(err.message);

    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", err.message);
  }
};
export default application;
