<template>
  <div class="playlist-datail-info">
    <div class="detail-info">
      <img
        :src="albumDetail.picUrl ? `${albumDetail.picUrl}?param=200y200` : ''"
      />
      <div class="info">
        <div class="info-title">
          <p class="playlist-name">
            <span>专辑</span>
            <span>{{ albumDetail.name }}</span>
            <span v-if="alia">( {{ alia }} )</span>
          </p>
        </div>
        <div class="info-button">
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
        <div class="info-detail">
          <p class="singer">
            <span>歌手：</span>
            <span>{{ albumArtist.name }}</span>
          </p>
          <p class="time">
            <span>时间：</span>
            <span>{{ convertDateShow(albumDetail.publishTime) }}</span>
          </p>
        </div>
      </div>
    </div>
    <TitleClick :titleList="titleList"></TitleClick>
  </div>
</template>

<script>
import titleList from "./localData/titleList.json";
import { mapState } from "vuex";

export default {
  name: "AlbumDetailInfo",
  data() {
    return {
      titleList,
    };
  },
  mounted() {
    this.getAlbumDetail(this.$route.query.id);
  },
  computed: {
    ...mapState({
      albumDetail: (state) => state.albumDetailInfo.albumDetail?.album || {},
      alia: (state) => state.albumDetailInfo.albumDetail.album?.alias[0],
      albumArtist: (state) =>
        state.albumDetailInfo.albumDetail.album?.artist || {},
    }),
    convertDateShow() {
      return function (time) {
        return this.$dayjs(time).format("YYYY-MM-DD");
      };
    },
  },
  methods: {
    async getAlbumDetail(id) {
      await this.$store.dispatch("getAlbumDetail", {
        id,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.playlist-datail-info {
  padding-top: 30px;
  .detail-info {
    display: flex;
    img {
      width: 186px;
      height: 186px;
      border-radius: 4px;
    }
    .info {
      padding-left: 20px;
      .info-title {
        .playlist-name {
          display: flex;
          align-items: center;
          font-size: 22px;
          font-weight: 700;

          span:nth-child(1) {
            font-size: 14px;
            color: #ec4141;
            border: 1px solid #9e3838;
            border-radius: 4px;
            padding: 0 5px;
            margin-right: 5px;
            font-weight: 400;
          }
          span:nth-child(3) {
            color: #666666;
          }
        }
      }
      .info-button {
        display: flex;
        align-items: center;
        font-size: 14px;
        height: 32px;
        padding: 15px 0 15px 0;
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
      .info-detail {
        cursor: default;
        & > * {
          padding-bottom: 6px;
        }
        .singer {
          span:nth-child(2) {
            color: #85b9e6;
            cursor: pointer;
            &:hover {
              color: #b3cee5;
            }
          }
        }
        .time {
          span:nth-child(2) {
            color: #878787;
          }
        }
      }
    }
  }
}
</style>
