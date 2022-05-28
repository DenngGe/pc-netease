import { reqSongUrl, reqSongDetail } from "@/api";
const state = {
  songUrl: "",
  songDetail: {},
};
const actions = {
  // 获取歌曲url
  async getSongUrl({ commit }, data) {
    let result = await reqSongUrl(data);
    if (result.data.code === 200) {
      commit("GETSONGURL", result.data.data[0].url);
    }
  },
  // 获取歌曲详情
  async getSongDetail({ commit }, data) {
    let result = await reqSongDetail(data);
    if (result.data.code === 200) {
      commit("GETSONGDETAIL", result.data.songs[0]);
    }
  },
};
const mutations = {
  GETSONGURL(state, songUrl) {
    state.songUrl = songUrl;
  },
  GETSONGDETAIL(state, songDetail) {
    state.songDetail = songDetail;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
