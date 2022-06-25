import { reqSearchResult } from "@/api";
const state = {
  searchResult: {},
};
const actions = {
  // 获取搜索结果
  async getSearchResult({ commit }, data) {
    let result = await reqSearchResult(data);
    if (result.data.code === 200) {
      commit("GETSEARCHRESULT", result.data.result);
    }
  },
};
const mutations = {
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
