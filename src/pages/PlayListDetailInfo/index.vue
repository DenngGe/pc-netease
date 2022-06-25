<template>
  <div class="playlist-datail-info">
    <div class="detail-info">
      <img
        :src="
          playList.coverImgUrl ? `${playList.coverImgUrl}?param=200y200` : ''
        "
      />
      <div class="info">
        <div class="info-title">
          <p class="playlist-name">
            <span>歌单</span>
            <span>{{ playList.name }}</span>
          </p>
          <p class="creater">
            <img
              :src="creator.avatarUrl ? `${creator.avatarUrl}?param=50y50` : ''"
            />
            <span class="creater-name">{{ creator.nickname }}</span>
            <span class="create-time"
              >{{ convertDateShow(playList.createTime) }}创建</span
            >
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
          <p class="top">
            <span>标签：</span>
            <span>{{ tagName(playList.tags) }}</span>
          </p>
          <p class="middle">
            <span class="songNum">
              <span>歌曲：</span>
              <span>{{ playList.trackCount }}</span>
            </span>
            <span class="songPlay">
              <span>播放：</span>
              <span>{{ showPlayCount(playList.playCount) }}</span>
            </span>
          </p>
          <p class="bottom">
            <span>简介：</span>
            <span>{{ playList.description }}</span>
          </p>
        </div>
      </div>
    </div>
    <TitleClick
      :titleList="titleList"
      :queryMessage="$route.query"
    ></TitleClick>
  </div>
</template>

<script>
import titleList from "./localData/titleList.json";
import { mapState } from "vuex";

export default {
  name: "PlayListDetailInfo",
  data() {
    return {
      titleList,
    };
  },
  mounted() {
    this.getPlayListDetail(this.$route.query.id);
  },
  computed: {
    ...mapState({
      playList: (state) => state.playListDetailInfo.playList,
      creator: (state) => state.playListDetailInfo.creator,
    }),
    convertDateShow() {
      return function (time) {
        return this.$dayjs(time).format("YYYY-MM-DD");
      };
    },
    showPlayCount() {
      return function (playCount) {
        let playCountStr = (playCount || "").toString();
        let countLength = playCountStr.length;
        let showCount = "";
        if (countLength <= 5) {
          showCount = playCountStr;
        } else if (countLength <= 8) {
          showCount = `${playCountStr.slice(0, -4)}万`;
        } else {
          showCount = `${playCountStr.slice(0, -8)}亿`;
        }
        return showCount;
      };
    },
    tagName() {
      return function (tags) {
        let tagArr = tags || [];
        let tagname = "";
        for (const tag of tagArr) {
          tagname += `${tag} / `;
        }
        return tagname.slice(0, -3);
      };
    },
  },
  methods: {
    async getPlayListDetail(id) {
      await this.$store.dispatch("getPlayListDetail", {
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
    // height: 200px;
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
          span:nth-child(1) {
            font-size: 14px;
            color: #ec4141;
            border: 1px solid #9e3838;
            border-radius: 4px;
            padding: 0 5px;
            margin-right: 5px;
          }
          span:nth-child(2) {
            font-size: 22px;
            font-weight: 700;
          }
        }
        .creater {
          display: flex;
          align-items: center;
          padding-top: 12px;
          & > * {
            padding-right: 8px;
          }
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            cursor: pointer;
          }
          .creater-name {
            color: #85b9e6;
            cursor: pointer;
            &:hover {
              color: #b3cee5;
            }
          }
          .create-time {
            color: #878787;
            cursor: default;
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
        .top {
          span:nth-child(2) {
            color: #85b9e6;
            cursor: pointer;
            &:hover {
              color: #b3cee5;
            }
          }
        }
        .middle {
          padding-bottom: 0px;

          .songNum {
            padding-right: 12px;
          }
          .songNum span:nth-child(2),
          .songPlay span:nth-child(2) {
            color: #878787;
          }
        }
        .bottom {
          height: 28px;
          line-height: 28px;
          width: 680px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span:nth-child(2) {
            color: #878787;
            cursor: text;
          }
        }
      }
    }
  }
}
</style>
