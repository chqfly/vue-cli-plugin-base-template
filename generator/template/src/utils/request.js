import axios from "axios";
import { Message } from "element-ui";
import qs from "qs";
const CODE = {
  SUCCESS: 0
};
const instanceAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

instanceAxios.interceptors.request.use(function(config) {
  if (config.method === "post") {
    config.data = qs.stringify(config.data);
  }
  return config;
});

instanceAxios.interceptors.response.use(
  function(response) {
    if (response.data.errcode === CODE.SUCCESS) {
      return response.data.data;
    }
    // 业务状态码错误,应该在业务逻辑中处理
    return Promise.reject(new Error(response.data.errmsg));
  },
  function(error) {
    // 这里汇聚了业务错误及http请求错误
    if (error.response && error.response.status !== 200) {
      if (error.response.status === 401) {
        return Promise.reject(error.response);
      }
      // 把http请求错误过滤在这里集中处理
      Message.error(error.message);
    }

    return Promise.reject(new Error(error.errmsg || error.message));
  }
);

export default instanceAxios;
