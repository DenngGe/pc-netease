export default [
  {
    path: "/app",
    component: () => import("@/components/Navbar"),
    children: [
      {
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
    ],
  },
  {
    path: "*",
    redirect: "/app/findmusic",
  },
];
