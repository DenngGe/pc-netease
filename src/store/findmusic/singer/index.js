import { reqSingerList } from "@/api";
const state = {
  artistsList: [],
};
const actions = {
  // 获取歌手列表
  async getSingerList({ commit }, data) {
    let result = await reqSingerList(data);
    if (result.data.code === 200) {
      commit("GETSINGERLIST", result.data.artists);
    }
  },
};
const mutations = {
  // 歌手列表
  GETSINGERLIST(state, artistsList) {
    state.artistsList = artistsList;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
