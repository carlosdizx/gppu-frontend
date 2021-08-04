import axios from "axios";

export const INSTACIA = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});
