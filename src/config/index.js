/***
 * 环境配置封装
 */

const env = process.env.NODE_ENV || "production";
const EnvConfig = {
  development: {
    baseApi: "http://www.admin-vue-api.com/admin",
    mockApi:
      "https://www.fastmock.site/mock/28abdf1cf4a03ac6565549b8c8543cf5/api",
  },
  test: {
    baseApi: "//test.vuesys.com/api",
    mockApi:
      "https://www.fastmock.site/mock/28abdf1cf4a03ac6565549b8c8543cf5/api",
  },
  production: {
    baseApi: "http://www.api.budraysys.cn/admin",
    mockApi: "",
  },
};

export default {
  env,
  mock: false,
  ...EnvConfig[env],
  namespace: "manager",
};
