<template>
  <div class="song">
    <div class="song-button">
      <div class="song-button-play">
        <div class="song-button-play-left">
          <i class="iconfont icon-bofang"></i>
          <span>播放全部</span>
        </div>
        <div class="song-button-play-right">
          <i class="iconfont icon-jiahao"></i>
        </div>
      </div>
      <div class="song-button-download">
        <i class="iconfont icon-iconfontzhizuobiaozhun023146"></i>
        <span>下载全部</span>
      </div>
    </div>
    <SongList :songs="searchSongs"></SongList>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Song",
  data() {
    return {
      // showSearchResult: [],
    };
  },
  mounted() {
    this.getShowSeachResult();
  },
  computed: {
    ...mapState({
      searchSongs: (state) => state.searchDetailInfo.searchResult.songs || [],
    }),
  },
  methods: {
    async getShowSeachResult() {
      await this.$store.dispatch("getSearchResult", {
        keywords: this.$route.query.keyword,
      });
    },
  },
  watch: {
    $route() {
      this.getShowSeachResult();
    },
  },
};
</script>

<style lang="less" scoped>
.song {
  .song-button {
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 32px;
    padding: 5px 0 15px 0;
    cursor: pointer;
    .song-button-play {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 12px 0 20px;
      margin-right: 12px;
      background-color: #ec4141;
      border-radius: 16px;
      color: #fff;
      .song-button-play-left {
        height: 100%;
        border-right: 1px solid #ed5353;
        line-height: 32px;
        .icon-bofang {
          font-size: 12px;
          padding-right: 8px;
        }
        span {
          padding-right: 8px;
        }
      }
      .song-button-play-right {
        padding-left: 8px;
      }
      &:hover {
        background-color: #d73535;
      }
    }
    .song-button-download {
      height: 100%;
      box-sizing: border-box;
      border-radius: 16px;
      border: 1px solid #4a4a4a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 14px 0 16px;
      .icon-iconfontzhizuobiaozhun023146 {
        color: #8a8a8a;
        font-size: 15px;
        padding-right: 6px;
      }
      &:hover {
        background-color: #343434;
      }
    }
  }
}
</style>
