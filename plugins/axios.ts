import axios from "axios";

declare var process: any;

export default axios.create({
  baseURL: process.env.baseUrl
});
