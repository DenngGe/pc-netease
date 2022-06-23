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
    <div class="song-detail">
      <dl>
        <dt>
          <span class="other"></span>
          <span class="title">音乐标题</span>
          <span class="singer">歌手</span>
          <span class="album">专辑</span>
          <span class="time">时长</span>
        </dt>
        <dd v-for="(song, index) in searchSongs" :key="song.id">
          <span class="other">
            <span class="num"> {{ songIndex(index + 1) }} </span>
            <i class="iconfont icon-aixin"></i>
            <i class="iconfont icon-iconfontzhizuobiaozhun023146"></i>
          </span>
          <span class="title" @click="playThisSong(song.id)">{{
            song.name
          }}</span>
          <span class="singer"
            ><i @click="goSingerDetail(song.ar[0].id)">{{
              song.ar[0].name
            }}</i></span
          >
          <span class="album"
            ><i>{{ song.al.name }}</i></span
          >
          <span class="time">{{ convertTimeShow(song.dt / 1000) }}</span>
        </dd>
      </dl>
    </div>
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
    songIndex() {
      return function (index) {
        return index < 10 ? `0${index}` : index;
      };
    },
  },
  methods: {
    async getShowSeachResult() {
      await this.$store.dispatch("getSearchResult", {
        keywords: this.$route.query.keyword,
      });
    },
    convertTimeShow(time) {
      let curTime = parseInt(time);
      let minuteT = parseInt(curTime / 60);
      let secondT = curTime % 60;
      minuteT = minuteT < 10 ? `0${minuteT}` : minuteT;
      secondT = secondT < 10 ? `0${secondT}` : secondT;
      return `${minuteT}:${secondT}`;
    },
    playThisSong(id) {
      this.$bus.$emit("getSongId", id);
    },
    goSingerDetail(id) {
      let location = {
        name: "singerdetailinfo",
        query: {
          id: id,
        },
      };
      this.$router.push(location);
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
        line-height: 34px;
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
  .song-detail {
    dl {
      color: #888888;
      dt,
      dd {
        display: flex;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        cursor: default;
        .other {
          width: 12%;
          display: flex;
          box-sizing: border-box;
          // justify-content: center;
          align-items: center;
          color: #575757;
          .num {
            padding: 0 10% 0 25%;
          }
          .iconfont {
            padding-right: 8%;
            cursor: pointer;
            &:hover {
              color: #9a9a9a;
            }
          }
        }
        .title {
          width: 35%;
        }
        .singer {
          width: 15%;
        }
        .album {
          width: 20%;
        }
        .time {
          width: 15%;
        }
        & > * {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      dd {
        .title {
          color: #d1d1d1;
        }
        i {
          cursor: pointer;
        }
        .singer i:hover,
        .album i:hover {
          color: #b4b4b4;
        }
        &:nth-child(2n) {
          background-color: #2e2e2e;
        }
        &:hover {
          background-color: #373737;
        }
      }
    }
  }
}
</style>
