import axios from "axios";
import { store } from "&store/store";
// @ts-ignore


const {
  REACT_APP_CONTENT_TYPE_JSON,
} = process.env;


axios.interceptors.request.use(
  // Signing and setting headers of requests
  (req) => {
    // Set constant headers
    req.headers["Content-Type"] = REACT_APP_CONTENT_TYPE_JSON;

    // Set auth token
    const token = store?.getState()?.login?.token;
    req.headers.Authorization = `Bearer ${token ?? "123"}`;
    console.log(req.headers.Authorization)


    return req;
  }
);


