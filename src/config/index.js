/***
 * 环境配置封装
 */

const env = process.env.NODE_ENV || "production";
const EnvConfig = {
  development: {
    baseApi: "/",
    mockApi:
      "https://www.fastmock.site/mock/28abdf1cf4a03ac6565549b8c8543cf5/api",
  },
  test: {
    baseApi: "//test.vuesys.com/api",
    mockApi:
      "https://www.fastmock.site/mock/28abdf1cf4a03ac6565549b8c8543cf5/api",
  },
  production: {
    baseApi: "//vuesys.com/api",
    mockApi: "",
  },
};

export default {
  env,
  mock: true,
  ...EnvConfig[env],
};
