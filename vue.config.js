module.exports = {
  productionSourceMap: false,
  // 关闭eslint
  lintOnSave: false,

  // 代理跨域
  devServer: {
    proxy: "https://netease-cloud-music-api-one-lilac.vercel.app",
  },
};
