import { reqPlayListDetail, reqPlayListSong } from "@/api";
const state = {
  playList: {},
  creator: {},
  songList: [],
};
const actions = {
  // 获取歌单详情
  async getPlayListDetail({ commit }, data) {
    let result = await reqPlayListDetail(data);
    if (result.data.code === 200) {
      commit("GETPLAYLISTDETAIL", result.data.playlist);
    }
  },
  // 获取歌单详情
  async getPlayListSong({ commit }, data) {
    let result = await reqPlayListSong(data);
    if (result.data.code === 200) {
      commit("GETPLAYLISTSONG", result.data.songs);
    }
  },
};
const mutations = {
  GETPLAYLISTDETAIL(state, playList) {
    state.playList = playList;
    state.creator = playList.creator;
  },
  GETPLAYLISTSONG(state, songs) {
    state.songList = songs;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
