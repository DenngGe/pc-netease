import { reqSongUrl } from "@/api";
const state = {
  songUrl: "",
};
const actions = {
  async getSongUrl({ commit }, data) {
    let result = await reqSongUrl(data);
    if (result.data.code === 200) {
      commit("GETSONGURL", result.data.data[0].url);
    }
  },
};
const mutations = {
  GETSONGURL(state, songUrl) {
    state.songUrl = songUrl;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
