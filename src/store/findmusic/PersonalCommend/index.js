import { reqFindMusicCarousel, reqRecommendPlaylist } from "@/api";
const state = {
  findMusicCarouselList: {},
  personalCommendList: [],
};

const actions = {
  // 获取首页轮播图
  async getFindMusicCarouselList({ commit }) {
    let result = await reqFindMusicCarousel();
    if (result.data.code === 200) {
      commit("GETFINDMUSICCAROUSELLIST", result.data.data);
    }
  },
  // 获取推荐歌单
  async getPersonalCommend({ commit }) {
    let result = await reqRecommendPlaylist();
    if (result.data.code === 200) {
      commit("GETPERSONALCOMMEND", result.data.result);
    }
  },
};

const mutations = {
  // 首页轮播图
  GETFINDMUSICCAROUSELLIST(state, findMusicCarouselList) {
    state.findMusicCarouselList = findMusicCarouselList;
  },
  // 推荐歌单
  GETPERSONALCOMMEND(state, personalCommendList) {
    state.personalCommendList = personalCommendList || [];
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
