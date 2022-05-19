module.exports = {
  productionSourceMap: false,
  // 关闭eslint
  lintOnSave: false,

  // 代理跨域
  devServer: {
    proxy: "http://localhost:3000",
  },
};
