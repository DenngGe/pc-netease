import {
  reqLoginCountryCode,
  reqPhoneLogin,
  reqCheckLoginState,
  reqLogout,
  reqDefaultSearchKeyword,
  reqHotSearch,
} from "@/api";

const state = {
  loginCountryCodeList: [],
  loginInfo: {},
  userInfoNow: {},
  defaultSearchKeyword: {},
  hotSearch: [],
};
const actions = {
  // 获取登陆界面国家编码列表
  async getLoginCountryCodeList({ commit }) {
    let result = await reqLoginCountryCode();
    if (result.data.code === 200) {
      commit("GETLOGINCOUNTRYCODELIST", result.data.data);
    }
  },
  // 获取手机登陆信息
  async getPhoneLoginInfo({ commit }, data) {
    let result = await reqPhoneLogin(data);
    if (result.data.code === 200) {
      commit("GETPHONELOGININFO", result.data);
    }
  },
  // 获取登录信息
  async getLoginState({ commit }) {
    let result = await reqCheckLoginState();
    if (result.data.data.code === 200) {
      commit("GETLOGINSTATE", result.data.data);
    }
  },
  // 退出登录
  async userLogout() {
    let result = await reqLogout();
    if (result.data.code === 200) {
      return "ok";
    }
  },
  // 获取默认搜索关键词
  async getDefaultSearchKeyword({ commit }) {
    let result = await reqDefaultSearchKeyword();
    if (result.data.code === 200) {
      commit("GETDEFAULTSEARCHKEYWORD", result.data.data);
    }
  },
  // 获取热搜列表
  async getHotSearch({ commit }) {
    let result = await reqHotSearch();
    if (result.data.code === 200) {
      commit("GETHOTSEARCH", result.data.data);
    }
  },
};
const mutations = {
  // 登陆界面国家编码列表
  GETLOGINCOUNTRYCODELIST(state, loginCountryCodeList) {
    state.loginCountryCodeList = loginCountryCodeList;
  },
  // 手机登陆信息
  GETPHONELOGININFO(state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  // 查看登录信息
  GETLOGINSTATE(state, userInfoNow) {
    state.userInfoNow = userInfoNow;
  },
  // 默认搜索关键词
  GETDEFAULTSEARCHKEYWORD(state, defaultSearchKeyword) {
    state.defaultSearchKeyword = defaultSearchKeyword;
  },
  // 热搜列表
  GETHOTSEARCH(state, hotSearch) {
    state.hotSearch = hotSearch;
  },
};
const getters = {
  userDetailInfo(state) {
    return state.userInfoNow || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
