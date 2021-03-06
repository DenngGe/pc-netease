export default [
  {
    path: "/app",
    component: () => import("@/components/Navbar"),
    children: [
      {
        name: "findmusic",
        path: "findmusic",
        component: () => import("@/pages/FindMusic"),
        redirect: "findmusic/personalcommend",
        children: [
          {
            path: "personalcommend",
            component: () => import("@/pages/FindMusic/PersonalCommend"),
          },
          {
            path: "specialmade",
            component: () => import("@/pages/FindMusic/SpecialMade"),
          },
          {
            path: "playlist",
            component: () => import("@/pages/FindMusic/PlayList"),
          },
          {
            path: "ranklist",
            component: () => import("@/pages/FindMusic/RankList"),
          },
          {
            path: "singer",
            component: () => import("@/pages/FindMusic/Singer"),
          },
          {
            path: "lastedmusic",
            component: () => import("@/pages/FindMusic/LastedMusic"),
          },
        ],
      },
      {
        path: "podcast",
        component: () => import("@/pages/PodCast"),
      },
      {
        path: "mv",
        component: () => import("@/pages/MV"),
      },
      {
        path: "attention",
        component: () => import("@/pages/Attention"),
      },
      {
        path: "onlinelook",
        component: () => import("@/pages/OnlineLook"),
      },
      {
        path: "privatefm",
        component: () => import("@/pages/PrivateFm"),
      },
      {
        path: "localdownload",
        component: () => import("@/pages/LocalDownload"),
      },
      {
        path: "recentplay",
        component: () => import("@/pages/RecentPlay"),
      },
      {
        path: "minemusiccloud",
        component: () => import("@/pages/MineMusicCloud"),
      },
      {
        path: "minepodcast",
        component: () => import("@/pages/MinePodCast"),
      },
      {
        path: "minestore",
        component: () => import("@/pages/MineStore"),
      },
      {
        name: "singerdetailinfo",
        path: "singerdetailinfo",
        component: () => import("@/pages/SingerDetailInfo"),
        redirect: "singerdetailinfo/album",
        children: [
          {
            path: "album",
            component: () => import("@/pages/SingerDetailInfo/Album"),
          },
          {
            path: "mv",
            component: () => import("@/pages/SingerDetailInfo/MV"),
          },
          {
            path: "detail",
            component: () => import("@/pages/SingerDetailInfo/Detail"),
          },
          {
            path: "simi",
            component: () => import("@/pages/SingerDetailInfo/Simi"),
          },
        ],
      },
      {
        name: "searchdetailinfo",
        path: "searchdetailinfo",
        component: () => import("@/pages/SearchDetailInfo"),
        redirect: "searchdetailinfo/song",
        children: [
          {
            path: "song",
            component: () => import("@/pages/SearchDetailInfo/Song"),
          },
          {
            path: "singer",
            component: () => import("@/pages/SearchDetailInfo/Singer"),
          },
          {
            path: "album",
            component: () => import("@/pages/SearchDetailInfo/Album"),
          },
          {
            path: "mv",
            component: () => import("@/pages/SearchDetailInfo/MV"),
          },
          {
            path: "playlist",
            component: () => import("@/pages/SearchDetailInfo/PlayList"),
          },
          {
            path: "lyrics",
            component: () => import("@/pages/SearchDetailInfo/Lyrics"),
          },
          {
            path: "podcast",
            component: () => import("@/pages/SearchDetailInfo/PodCast"),
          },
          {
            path: "sound",
            component: () => import("@/pages/SearchDetailInfo/Sound"),
          },
          {
            path: "user",
            component: () => import("@/pages/SearchDetailInfo/User"),
          },
        ],
      },
      {
        name: "playlistdetailinfo",
        path: "playlistdetailinfo",
        component: () => import("@/pages/PlayListDetailInfo"),
        redirect: "playlistdetailinfo/playlistsong",
        children: [
          {
            path: "playlistsong",
            component: () => import("@/pages/PlayListDetailInfo/PlayListSong"),
          },
          {
            path: "comments",
            component: () => import("@/pages/PlayListDetailInfo/Comments"),
          },
          {
            path: "collectors",
            component: () => import("@/pages/PlayListDetailInfo/Collectors"),
          },
        ],
      },
      {
        name: "albumdetailinfo",
        path: "albumdetailinfo",
        component: () => import("@/pages/AlbumDetailInfo"),
        redirect: "albumdetailinfo/albumsong",
        children: [
          {
            path: "albumsong",
            component: () => import("@/pages/AlbumDetailInfo/AlbumSong"),
          },
          {
            path: "albumcomments",
            component: () => import("@/pages/AlbumDetailInfo/AlbumComments"),
          },
          {
            path: "albumdetail",
            component: () => import("@/pages/AlbumDetailInfo/AlbumDetail"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    redirect: "/app/findmusic",
  },
];
