import { defineStore } from "pinia";
import { getAuth, login, register, logout } from "@/services/auth";
import type User from "@/types/User";
import useLocalStorage from "@/composables/useLocalStorage";

const { setItem, getItem, removeItem } = useLocalStorage();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    loading: false,
    token: "",
    isLoggedIn: false,
    user: {} as User,
  }),
  actions: {
    async initAuth() {
      const auth = await getAuth();
      if (auth) {
        this.isLoggedIn = true;
        this.token = getItem("token");
        this.user = auth;

        true;
      } else {
        this.isLoggedIn = false;
        this.token = "";
        this.user = {} as User;
        removeItem("token");

        return false;
      }
    },
    async login(form: { email: string; password: string }) {
      this.loading = true;
      const data = await login(form);
      if (data) {
        this.isLoggedIn = true;
        this.token = data.token;
        this.user = data.user;
        setItem("token", data.token);
        return true;
      }
      this.loading = false;
      return false;
    },
    async register(form: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) {
      this.loading = true;
      const data = await register(form);
      if (data) {
        this.isLoggedIn = true;
        this.token = data.token;
        this.user = data.user;
        setItem("token", data.token);
        return true;
      }
      return false;
    },

    async logout() {
      this.loading = true;
      const isLoggedOut = await logout();
      if (isLoggedOut) {
        this.isLoggedIn = false;
        this.token = "";
        this.user = {} as User;
        removeItem("token");
        this.loading = false;
        return true;
      } else {
        console.log("something went wrong");
        this.loading = false;
        return false;
      }
    },
  },
});
