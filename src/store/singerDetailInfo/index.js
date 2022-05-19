import {
  reqSingerTop50List,
  reqSingerDetail,
  reqSingerAlbum,
  reqAlbumDetail,
} from "@/api";
const state = {
  singerTop50List: [],
  singerDetail: {},
  hotAlbums: [],
  songsList: [],
  albumArtist: "",
};
const actions = {
  // 获取top50
  async getSingerTop50({ commit }, data) {
    let result = await reqSingerTop50List(data);
    if (result.data.code === 200) {
      commit("GETSINGERTOP50", result.data.songs);
    }
  },
  // 获取歌手详情
  async getSingerDetail({ commit }, data) {
    let result = await reqSingerDetail(data);
    if (result.data.code === 200) {
      commit("GETSINGERDETAIL", result.data.data);
    }
  },
  // 获取歌手专辑
  async getSingerAlbum({ commit }, data) {
    let result = await reqSingerAlbum(data);
    if (result.data.code === 200) {
      commit("GETSINGERALBUM", result.data.hotAlbums);
    }
  },
  // 获取专辑内容
  async getAlbumDetail({ commit }, data) {
    let result = await reqAlbumDetail(data);
    if (result.data.code === 200) {
      commit("GETALBUMDETAIL", result.data.songs);
    }
  },
};
const mutations = {
  GETSINGERTOP50(state, singerTop50List) {
    state.singerTop50List = singerTop50List;
  },
  GETSINGERDETAIL(state, singerDetail) {
    state.singerDetail = singerDetail;
  },
  GETSINGERALBUM(state, hotAlbums) {
    state.hotAlbums = hotAlbums;
  },
  GETALBUMDETAIL(state, songsList) {
    state.songsList.push(songsList);
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
