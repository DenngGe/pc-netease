<template>
  <div class="song-detail">
    <dl>
      <dt>
        <span class="other"></span>
        <span class="title">音乐标题</span>
        <span class="singer">歌手</span>
        <span class="album">专辑</span>
        <span class="time">时长</span>
      </dt>
      <dd v-for="(song, index) in songs" :key="song.id">
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
</template>

<script>
export default {
  name: "SongList",
  props: ["songs"],
  data() {
    return {};
  },
  computed: {
    songIndex() {
      return function (index) {
        return index < 10 ? `0${index}` : index;
      };
    },
  },
  methods: {
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
};
</script>

<style lang="less" scoped>
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
</style>
