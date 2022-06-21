import axios from "axios";
// import store from "@/store";

const requests = axios.create({
  timeout: 5000,
});

export default requests;
