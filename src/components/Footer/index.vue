<template>
  <div class="footer">
    <div class="container">
      <div class="song-info">
        <img src="./images/1.jpg" alt="" />
        <div class="song-name-singer-name">
          <p class="song-name">漠河舞厅</p>
          <p class="singer-name">柳爽</p>
          <audio ref="currentSong" :src="currentSongUrl"></audio>
        </div>
        <div class="song-store">
          <i class="iconfont icon-aixin"></i>
          <i style="display: none" class="iconfont icon-aixin_shixin"></i>
        </div>
      </div>
      <div class="player">
        <div class="player-controler">
          <i class="iconfont icon-suiji"></i>
          <i class="iconfont icon-shangyishouweidianji"></i>
          <i
            v-show="!isPlay"
            @click="controlPlay"
            class="iconfont icon-bofang"
          ></i>
          <i
            v-show="isPlay"
            @click="controlPlay"
            class="iconfont icon-zanting"
          ></i>
          <i class="iconfont icon-xiayishou"></i>
          <i class="iconfont icon-geci"></i>
        </div>
        <div class="slide-time-control">
          <span ref="aaa">01:10</span>
          <div
            class="slide-control"
            @mouseover="showButton"
            @mouseleave="hideButton"
          >
            <el-slider
              class="a"
              v-model="songTime"
              :show-tooltip="false"
              @mouseover="showButton"
              @mouseleave="hideButton"
            ></el-slider>
          </div>
          <span>04:20</span>
        </div>
      </div>
      <div class="song-setting">
        <i class="iconfont icon-wusunyinzhi"></i>
        <i class="iconfont icon-yinxiao"></i>
        <i class="iconfont icon-shengyinyinliang"></i>
        <i class="iconfont icon-kefu"></i>
        <i class="iconfont icon-liebiao2"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      songTime: 36,
      isPlay: false,
      currentSongUrl: "",
    };
  },
  computed: {
    ...mapState({
      songUrl: (state) => state.footer.songUrl,
    }),
  },
  methods: {
    // 鼠标移入显示滑块按钮
    showButton() {
      let btn = document.querySelector(".el-slider__button");
      btn.style.display = "inline-block";
    },
    // 鼠标移出隐藏滑块按钮
    hideButton(e) {
      let btn = document.querySelector(".el-slider__button");
      btn.style.display = "none";
    },
    // 控制播放与暂停
    controlPlay() {
      if (this.isPlay) {
        this.$refs.currentSong.pause();
        this.isPlay = false;
      } else {
        this.$refs.currentSong.play();
        this.isPlay = true;
      }
    },
    // 根据歌曲id获取歌曲信息
    async getSongInfo(id) {
      try {
        await this.$store.dispatch("getSongUrl", { id: id });
        this.currentSongUrl = this.songUrl;
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    this.$bus.$on("getSongId", this.getSongInfo);
  },
  watch: {
    currentSongUrl() {
      this.$nextTick(() => {
        this.$refs.currentSong.play();
        this.isPlay = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  background-color: #222225;
  box-sizing: border-box;
  border-top: 1px solid #444;
  .container {
    display: flex;
    .song-info {
      width: 22vw;
      height: 72px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding-left: 14px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 4px;
      }
      .song-name-singer-name {
        font-size: 14px;
        padding-left: 10px;
        p {
          padding: 2px 0;
          cursor: pointer;
        }
        .song-name:hover {
          color: #fff;
        }
      }
      .song-store {
        align-self: flex-start;
        padding-top: 14px;
        .iconfont {
          font-size: 18px;
          padding-left: 6px;
        }
        .icon-aixin {
          color: #737375;
          &:hover {
            color: #979798;
          }
        }
        .icon-aixin_shixin {
          color: #ec4141;
        }
      }
    }
    .player {
      width: 56vw;
      height: 72px;
      padding: 20px;
      box-sizing: border-box;

      .player-controler {
        text-align: center;
        .iconfont {
          padding: 0 18px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .slide-time-control {
        display: flex;
        justify-content: center;
        align-content: center;
        span {
          color: #7c7c7c;
          font-size: 12px;
          padding: 9px;
        }
      }
    }
    .song-setting {
      width: 22vw;
      height: 72px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-left: 34px;
      .iconfont {
        font-size: 18px;
        cursor: pointer;
      }
      .icon-wusunyinzhi {
        font-size: 26px;
        color: #ec4141;
      }
    }
  }
}
</style>
<style lang="less">
.slide-control {
  .el-slider__runway {
    width: 400px;
    height: 4px;
    margin: auto;
    margin-top: 16px;
    background-color: #4a4a4d;
    cursor: default;
    .el-slider__bar {
      background-color: #ec4141;
      height: 4px;
    }
    .el-slider__button-wrapper {
      top: -16px;

      .el-slider__button {
        border: 0;
        background-color: #ec4141;
        width: 10px;
        height: 10px;
        display: none;
      }
    }
  }
}
</style>
