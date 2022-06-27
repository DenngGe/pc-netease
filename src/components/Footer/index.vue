<template>
  <div class="footer">
    <div class="container">
      <div class="song-info">
        <img :src="songPic" alt="" />
        <div class="song-name-singer-name">
          <p class="song-name">
            <span class="song-name-name">
              {{ currentSongDetail.name }}
            </span>
            <i class="iconfont icon-aixin"></i>
            <i style="display: none" class="iconfont icon-aixin_shixin"></i>
          </p>
          <p class="singer-name">{{ singerName }}</p>
          <audio
            ref="currentSong"
            :src="currentSongUrl"
            @timeupdate="updateTime"
            @ended="songEnd"
          ></audio>
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
          <span>{{ songCurrentTime }}</span>
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
              @change="slideTime"
            ></el-slider>
          </div>
          <span>{{ songAllTime }}</span>
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
      songTime: 0,
      isPlay: false,
      currentSongUrl: "",
      currentSongDetail: {},
      songCurrentTime: "00:00",
      songAllTime: "00:00",
      isFirst: true,
    };
  },
  computed: {
    ...mapState({
      songUrl: (state) => state.footer.songUrl,
      songDetail: (state) => state.footer.songDetail,
    }),
    singerName() {
      let singerArr = this.currentSongDetail.ar || [];
      let singername = "";
      for (const singer of singerArr) {
        singername += `${singer.name} / `;
      }
      return singername.slice(0, -3);
    },
    songPic() {
      let songpic = this.currentSongDetail.al?.picUrl;
      return songpic;
    },
  },
  methods: {
    // 鼠标移入显示滑块按钮
    showButton() {
      let btn = document.querySelector(".el-slider__button");
      btn.style.display = "inline-block";
    },
    // 鼠标移出隐藏滑块按钮
    hideButton() {
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
      localStorage.setItem("songId", id);
      try {
        await this.$store.dispatch("getSongUrl", { id: id });
        await this.$store.dispatch("getSongDetail", id);
        this.currentSongUrl = this.songUrl;
        this.currentSongDetail = this.songDetail;
      } catch (error) {
        alert(error.message);
      }
    },
    // 转换显示时间
    convertTimeShow(time) {
      let curTime = parseInt(time);
      let minuteT = parseInt(curTime / 60);
      let secondT = curTime % 60;
      minuteT = minuteT < 10 ? `0${minuteT}` : minuteT;
      secondT = secondT < 10 ? `0${secondT}` : secondT;
      return `${minuteT}:${secondT}`;
    },
    // 随audio播放修改显示时间
    updateTime() {
      this.songCurrentTime = this.convertTimeShow(
        this.$refs.currentSong.currentTime
      );
      this.songAllTime = this.convertTimeShow(this.currentSongDetail.dt / 1000);
      this.songTime =
        (100 * parseInt(this.$refs.currentSong.currentTime)) /
        (this.currentSongDetail.dt / 1000);
    },
    slideTime(value) {
      this.$refs.currentSong.currentTime =
        (value / 100) * (this.currentSongDetail.dt / 1000);
      this.songTime = value;
    },
    songEnd() {
      this.$refs.currentSong.pause();
      this.$refs.currentSong.currentTime = 0;
      this.$refs.currentSong.play();
    },
  },
  mounted() {
    this.$bus.$on("getSongId", this.getSongInfo);
    this.getSongInfo(localStorage.getItem("songId") * 1 || 1894094482);
    setTimeout(() => {
      this.isFirst = false;
    }, 1000);
  },
  watch: {
    currentSongUrl() {
      this.$nextTick(() => {
        if (!this.isFirst) {
          this.$refs.currentSong.play();
          this.isPlay = true;
        }
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
      width: 22%;
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
        .song-name {
          display: flex;
          align-items: center;
          font-size: 16px;
          .song-name-name {
            display: inline-block;
            max-width: 220px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 8px;
          }
          .iconfont {
            font-size: 18px;
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
        .singer-name {
          font-size: 10px;
          white-space: nowrap;
          overflow: hidden;
          max-width: 22vw;
        }
      }
    }
    .player {
      width: 56%;
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
      width: 22%;
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
