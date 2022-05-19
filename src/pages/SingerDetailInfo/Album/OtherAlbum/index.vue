<template>
  <div v-if="albums" class="top50">
    <img :src="albums.album.blurPicUrl" />
    <div class="detail-top50">
      <div class="title">
        <span>{{ albums.album.name }}</span>
        <i class="iconfont icon-bofang"></i>
        <i class="iconfont icon-wenjianjia"></i>
      </div>
      <div class="song">
        <ul>
          <li
            v-for="(song, index) in albums.songs"
            :key="song.id"
            v-show="liShow(index)"
          >
            <span class="num">{{ songIndex(index + 1) }}</span>
            <i class="iconfont icon-aixin"></i>
            <i class="iconfont icon-iconfontzhizuobiaozhun023146"></i>
            <span class="name" @click="playThisSong(song.id)">{{
              song.name
            }}</span>
          </li>
          <li v-show="totalLength > 10" ref="control" @click="changeForceShow">
            查看全部{{ totalLength }}首 >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherAlbum",
  props: ["albums"],
  data() {
    return {
      forceShow: false,
    };
  },
  methods: {
    songIndex(index) {
      return index < 10 ? `0${index}` : index;
    },
    liShow(index) {
      return index < 10 || this.forceShow;
    },
    changeForceShow() {
      this.forceShow = true;
      this.$refs.control.style.display = "none";
    },
    playThisSong(id) {
      this.$bus.$emit("getSongId", id);
    },
  },
  computed: {
    totalLength() {
      let total = this.albums.songs || [];
      return total.length;
    },
  },
};
</script>

<style lang="less" scoped>
.top50 {
  display: flex;
  justify-content: space-between;
  img {
    width: 15%;
    height: 100%;
    border-radius: 4px;
  }
  .detail-top50 {
    width: 80%;
    .title {
      height: 30px;
      line-height: 30px;
      span {
        font-size: 16px;
        font-weight: 700;
        padding-right: 8px;
        cursor: default;
        &:hover {
          color: #fff;
        }
      }
      .iconfont {
        color: #8a8a8a;
        padding: 8px;
        cursor: pointer;
        &:hover {
          color: #b5b5b5;
        }
      }
      .icon-bofang {
        font-size: 14px;
      }
    }
    .song {
      ul {
        li {
          height: 30px;
          line-height: 30px;
          color: #686868;
          font-size: 14px;
          cursor: default;
          padding-right: 30px;
          & > * {
            padding: 0 6px;
          }
          &:nth-child(2n + 1) {
            background-color: #2e2e2e;
          }
          &:last-child {
            background-color: #292929;
            cursor: pointer;
            float: right;
            &:hover {
              background-color: transparent;
            }
          }
          &:hover {
            background-color: #373737;
          }
          .name {
            color: #d3d3d3;
          }
          .iconfont {
            cursor: pointer;
          }
          .time {
            float: right;
          }
        }
      }
    }
  }
}
</style>
