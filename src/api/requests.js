import axios from "axios";
import store from "@/store";

const requests = axios.create({
  timeout: 30000,
});

export default requests;
