import axios from "axios";
import store from "@/store";

const requests = axios.create({
  baseURL: "https://netease-cloud-music-api-one-lilac.vercel.app",
  timeout: 5000,
});

export default requests;
