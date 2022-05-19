import requests from "./requests";

// 检查登录状态
export const reqCheckLoginState = () =>
  requests({
    url: `/login/status?timestamp=${Date.now()}`,
    method: "get",
  });
// 首页轮播图
export const reqFindMusicCarousel = () =>
  requests({
    url: `/homepage/block/page?timestamp=${Date.now()}`,
    method: "get",
  });
// 登陆界面国家编码
export const reqLoginCountryCode = () =>
  requests({
    url: `/countries/code/list?timestamp=${Date.now()}`,
    method: "get",
  });
// 手机登陆
export const reqPhoneLogin = (data) =>
  requests({
    url: `/login/cellphone?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
// 退出登陆
export const reqLogout = () =>
  requests({
    url: `/logout?timestamp=${Date.now()}`,
    method: "get",
  });
// 获取歌手分类列表
export const reqSingerList = (data) =>
  requests({
    url: `/artist/list?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
// 获取歌手top50歌曲
export const reqSingerTop50List = (data) =>
  requests({
    url: `/artist/top/song?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
// 获取歌手详情
export const reqSingerDetail = (data) =>
  requests({
    url: `/artist/detail?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
// 获取歌曲URL
export const reqSongUrl = (data) =>
  requests({
    url: `/song/url?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
// 获取歌手专辑
export const reqSingerAlbum = (data) =>
  requests({
    url: `/artist/album?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
// 获取专辑内容
export const reqAlbumDetail = (data) =>
  requests({
    url: `/album?timestamp=${Date.now()}`,
    method: "post",
    data,
  });
