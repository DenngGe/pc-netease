import { reqAlbumDetail } from "@/api";
const state = {
  albumDetail: {},
};
const actions = {
  // 获取专辑内容
  async getAlbumDetail({ commit }, data) {
    let result = await reqAlbumDetail(data);
    if (result.data.code === 200) {
      commit("GETALBUMDETAIL", result.data);
    }
  },
};
const mutations = {
  GETALBUMDETAIL(state, albumDetail) {
    state.albumDetail = albumDetail;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
