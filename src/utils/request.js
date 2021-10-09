/**
 * axios二次封装
 */
import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";
import router from "../router";
import secret from "./secret";
import storage from "./storage";

//默认信息参数
const UnToken = "没有token或token有误，不在登录状态";
const ServerError = "网络错误";

//创建实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
});

//请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  if (!headers.Authorization) {
    headers.Authorization = storage.getItem("token");
  }
  return req;
});

//响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    let res = JSON.parse(secret.Decrypt(data));
    return res;
  } else if (code === 40001) {
    //未登录，没token或者token在后端对不上出错或token过期
    ElMessage.error(msg || UnToken);
    setTimeout(() => {
      router.push("/login");
    }, 15000);
    return Promise.reject(msg || UnToken);
  } else {
    ElMessage.error(msg || ServerError);
    return Promise.reject(msg || ServerError);
  }
});

//导出的函数@param参数处理
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  if (typeof options.mock != "undefined") {
    config.mock = options.mock;
  }

  if (config.env === "production") {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }

  options.data = { data: secret.Encrypt(options.data) };

  return service(options);
}

//另一种axios使用模式
/*["get", "post", "delete", "patch"].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options,
    });
  };
});*/

export default request;
