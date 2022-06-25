<template>
  <div class="singer-datail-info">
    <div class="detail-info">
      <img
        :src="singerDetail.cover ? `${singerDetail.cover}?param=200y200` : ''"
      />
      <div class="info">
        <p class="info-name">{{ singerDetail.name }}</p>
        <button><i class="iconfont icon-wenjianjia"></i>收藏</button>
        <div class="info-create">
          <span>单曲数：{{ singerDetail.musicSize }}</span>
          <span>专辑数：{{ singerDetail.albumSize }}</span>
          <span>MV数：{{ singerDetail.mvSize }}</span>
        </div>
      </div>
    </div>
    <TitleClick :titleList="titleList" :queryMessage="$route.query" />
  </div>
</template>

<script>
import titleList from "./localData/titleList.json";
import { mapState } from "vuex";

export default {
  name: "SingerDetailInfo",
  data() {
    return {
      titleList,
    };
  },
  mounted() {
    this.getSingerData();
  },
  computed: {
    ...mapState({
      singerDetail: (state) => state.singerDetailInfo.singerDetail.artist || {},
    }),
  },
  methods: {
    async getSingerData() {
      await this.$store.dispatch("getSingerDetail", {
        id: this.$route.query.id,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.singer-datail-info {
  padding-top: 30px;
  .detail-info {
    display: flex;
    img {
      width: 186px;
      border-radius: 4px;
    }
    .info {
      padding-left: 20px;
      .info-name {
        font-size: 24px;
        font-weight: 700;
        padding: 4px 0 10px 0px;
      }
      button {
        width: 80px;
        height: 30px;
        background-color: transparent;
        border: 1px solid #4a4a4a;
        border-radius: 15px;
        color: #d0d0d0;
        font-size: 14px;
        margin-bottom: 20px;
        cursor: pointer;
        &:hover {
          background-color: #343434;
        }
        .iconfont {
          padding-right: 6px;
          font-size: 14px;
        }
      }
      .info-create {
        span {
          padding-right: 25px;
        }
      }
    }
  }
}
</style>
