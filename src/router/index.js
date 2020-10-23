import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
import Recommend from '@/views/home/recommend/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/h'
  },
  {
    path: '/h',
    component: Home,
    children: [
      {
        path: '',
        name: 'Recommend',
        component: Recommend,
      },
      {
        path: 'rank',
        component: () => import('@/views/home/rank/index.vue'),
        children: [
          {
            path: '',
            redirect: '/h/rank/19723756'
          },
          {
            path: ':id',
            name: 'RankDetail',
            component: () => import('@/views/home/rank/RankDetail.vue'),
            meta: { title: '榜单详情' },
          },
        ]
      },
      {
        path: 'playlist',
        component: () => import('@/views/home/playlist/index.vue'),
        children: [
          {
            path: '',
            name: 'PlaylistCate',
            component: () => import('@/views/home/playlist/Cate.vue'),
            meta: { title: '歌单' },
          },
          {
            path: ':id',
            name: 'PlaylistDetail',
            component: () => import('@/views/home/playlist/Detail.vue'),
            meta: { title: '歌单详情' },
          }
        ]
      },
      {
        path: 'radio',
        component: () => import('@/views/home/radio/index.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/home/radio/Cate.vue'),
            children: [
              {
                path: '',
                name: 'RadioCateIndex',
                component: () => import('@/views/home/radio/CateIndex.vue'),
                meta: { title: '电台' },
              },
              {
                path: 'cate/:id',
                name: 'RadioCateRec',
                component: () => import('@/views/home/radio/CateRec.vue'),
                meta: { title: '电台' },
              }
            ]
          },
          {
            path: 'detail/:id',
            name: 'RadioDetail',
            component: () => import('@/views/home/radio/RadioDetail.vue'),
            meta: { title: '电台详情' },
          },
          {
            path: 'program',
            name: 'RadioProgramDetail',
            component: () => import('@/views/home/radio/ProgramDetail.vue'),
            meta: { title: '电台节目详情' },
          },
          {
            path: 'program/rec',
            name: 'RadioProgramRec',
            component: () => import('@/views/home/radio/ProgramRec.vue'),
            meta: { title: '电台节目推荐' },
          },
          {
            path: 'program/rank',
            name: 'RadioProgramRank',
            component: () => import('@/views/home/radio/ProgramRank.vue'),
            meta: { title: '电台节目排行' },
          },
        ]
      },
      {
        path: 'artist',
        component: () => import('@/views/home/artist/index.vue'),
        children: [
          {
            path: '',
            name: 'ArtistRecommend',
            component: () => import('@/views/home/artist/Recommend.vue'),
            meta: { title: '歌手' },
          },
          {
            path: 'sign',
            name: 'Sign',
            component: () => import('@/views/home/artist/Sign.vue'),
            meta: { title: '入驻歌手' },
          },
          {
            path: ':area/:type',
            name: 'ArtistArea',
            component: () => import('@/views/home/artist/Area.vue'),
            meta: { title: '歌手' },
          },
        ]
      },
      {
        path: '/artist/:id',
        name: 'ArtistDetail',
        component: () => import('@/views/home/artist/ArtistDetail.vue'),
        meta: { title: '歌手详情' },
      },
      {
        path: 'album',
        component: () => import('@/views/home/album/index.vue'),
        children: [
          {
            path: '',
            name: 'AlbumCate',
            component: () => import('@/views/home/album/Cate.vue'),
            meta: { title: '专辑' },
          },
          {
            path: ':id',
            name: 'AlbumDetail',
            component: () => import('@/views/home/album/Detail.vue'),
            meta: { title: '专辑详情' },
          }
        ]
      },
      {
        path: '/song/:id',
        name: 'SongDetail',
        component: () => import('@/views/song/SongDetail.vue'),
        meta: { title: '歌曲详情' },
      },
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
    meta: { title: '搜索结果' },
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/my/my.vue'),
    children: [
      {
        path: 'artist',
        name: 'MyArtist',
        component: () => import('@/views/my/artist.vue')
      },
      {
        path: 'video',
        name: 'MyVideo',
        component: () => import('@/views/my/video.vue')
      },
      {
        path: 'radio',
        name: 'MyRadio',
        component: () => import('@/views/my/radio.vue')
      },
      {
        path: 'playlist/:id',
        name: 'MyPlaylist',
        component: () => import('@/views/my/playlist.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
