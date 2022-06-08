module.exports = {
  productionSourceMap: false,
  // 关闭eslint
  lintOnSave: false,

  // 代理跨域
  devServer: {
    proxy: "http://124.222.201.132:3000/",
  },
};
