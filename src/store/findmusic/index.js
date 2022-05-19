import { reqFindMusicCarousel } from "@/api";
const state = {
  findMusicCarouselList: {},
};
const actions = {
  // 获取首页轮播图
  async getFindMusicCarouselList({ commit }) {
    let result = await reqFindMusicCarousel();
    commit("GETFINDMUSICCAROUSELLIST", result.data.data);
  },
};
const mutations = {
  // 首页轮播图
  GETFINDMUSICCAROUSELLIST(state, findMusicCarouselList) {
    state.findMusicCarouselList = findMusicCarouselList;
  },
};
const getters = {
  carouselList(state) {
    return state.findMusicCarouselList.blocks || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
