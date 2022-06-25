<template>
  <SongList :songs="songList"></SongList>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlayListSong",
  mounted() {
    this.getPlayListSong(this.$route.query.id);
  },
  computed: {
    ...mapState({
      songList: (state) => state.playListDetailInfo.songList,
    }),
  },
  methods: {
    async getPlayListSong(id) {
      await this.$store.dispatch("getPlayListSong", {
        id,
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
