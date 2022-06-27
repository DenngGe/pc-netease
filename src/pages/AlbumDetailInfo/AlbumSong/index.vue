<template>
  <SongList :songs="songList"></SongList>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AlbumSong",
  computed: {
    ...mapState({
      songList: (state) => state.albumDetailInfo.albumDetail.songs || [],
    }),
  },
};
</script>

<style lang="less" scoped></style>
