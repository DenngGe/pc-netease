<template>
  <div class="album">
    <div class="top50">
      <img src="./images/top50.png" />
      <div class="detail-top50">
        <div class="title">
          <span>热门50首</span>
          <i class="iconfont icon-bofang"></i>
          <i class="iconfont icon-wenjianjia"></i>
        </div>
        <div class="song">
          <ul>
            <li
              v-for="(song, index) in singerTop50List"
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
            <li
              v-show="singerTop50List.length > 10"
              ref="control"
              @click="changeForceShow"
            >
              查看全部50首 >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <OtherAlbum
      v-for="albums in albumsList"
      :key="albums.album.id"
      :albums="albums"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import OtherAlbum from "./OtherAlbum";
import { reqAlbumDetail } from "@/api";
export default {
  name: "Album",
  data() {
    return {
      forceShow: false,
      albumsList: [],
    };
  },
  components: { OtherAlbum },
  mounted() {
    this.getSingerTop50();
  },
  computed: {
    ...mapState({
      singerTop50List: (state) => state.singerDetailInfo.singerTop50List || [],
      singerHotAlbums: (state) => state.singerDetailInfo.hotAlbums || [],
    }),
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
    async getSingerTop50() {
      await this.$store.dispatch("getSingerTop50", {
        id: this.$route.query.id,
      });
      await this.getSingerAlbum();
      await this.getSongs();
    },
    async getSingerAlbum() {
      await this.$store.dispatch("getSingerAlbum", {
        id: this.$route.query.id,
        limit: 10,
      });
    },

    async getSongs() {
      for (const item of this.singerHotAlbums) {
        let result = (await reqAlbumDetail({ id: item.id })) || {};
        this.albumsList.push(result.data);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.album {
  margin: 6px 10px;
  .top50 {
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
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
}
</style>
