module.exports = {
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true,
    },
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
  },
};
