import { reqSearchResult } from "@/api";
const state = {
  searchResult: {},
};
const actions = {
  // 获取搜索结果
  /*  async get({ commit }, data) {
    let result = await reqSingerTop50List(data);
    if (result.data.code === 200) {
      commit("GETSINGERTOP50", result.data.songs);
    }
  }, */
  async getSearchResult({ commit }, data) {
    let result = await reqSearchResult(data);
    if (result.data.code === 200) {
      commit("GETSEARCHRESULT", result.data.result);
    }
  },
};
const mutations = {
  // GETSINGERTOP50(state, singerTop50List) {
  //   state.singerTop50List = singerTop50List;
  // },
  GETSEARCHRESULT(state, searchResult) {
    state.searchResult = searchResult;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
