import axios from "axios";
import store from "@/store";

const requests = axios.create({
  baseURL: "http://124.222.201.132:3000",
  timeout: 5000,
});

export default requests;
