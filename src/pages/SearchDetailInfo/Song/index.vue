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
    <div class="song-detail"></div>
  </div>
</template>

<script>
export default {
  name: "Song",
};
</script>

<style lang="less" scoped>
.song {
  .song-button {
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 32px;
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
}
</style>
