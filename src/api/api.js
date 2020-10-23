import axios from 'axios'

axios.defaults.withCredentials = true

let HOST = 'http://47.107.33.131:3000'

if (process.env.NODE_ENV == 'development') {
  HOST = 'http://127.0.0.1:3000'
}

const interceptResponse = res => {
  if (res.status == 200) {
    switch (res.data.code) {
      case 200:
        return res.data
      case 500: // system error
        break
      case 400: // 缺少参数
        break
      default:
        break
    }
  }
}

const request = (url, method, params = {}) => {
  const apiurl = `${HOST}${url}`

  if (method == 'get') {
    return axios.get(apiurl, { params }).then(interceptResponse)
  }

  if (method == 'post') {
    return axios.post(apiurl, { params }).then(interceptResponse)
  }
}


export const getBanner = params => request('/banner', 'get', params) // 推荐-banner
export const getHotRec = params => request('/personalized', 'get', params) // 推荐-热门推荐
export const getAlbumNewest = params => request('/album/newest', 'get', params) // 推荐-新碟上架
export const getPlaylistDetail = params => request('/playlist/detail', 'get', params) // 推荐-榜单/歌单详情
export const getTopArtist = params => request('/top/artists', 'get', params) // 推荐-热门歌手
export const getHotRadios = params => request('/dj/hot', 'get', params) // 推荐-热门电台

export const getTopList = params => request('/toplist', 'get', params) // 排行榜-所有榜单列表
export const getPlayListComment = params => request('/comment/playlist', 'get', params) // 排行榜-榜单/歌单评论

export const getPlayListCategory = () => request('/playlist/catlist', 'get', {}) // 歌单-歌单分类
export const getRelatePlaylist = params => request('/related/playlist', 'get', params) // 歌单-相关推荐
export const getPlList = params => request('/top/playlist', 'get', params) // 歌单-歌单列表
export const getSimiPlList = params => request('/simi/playlist', 'get', params) // 相似歌单 / 包含歌曲歌单

export const getArtistList = params => request('/artist/list', 'get', params) // 歌手-歌手列表

export const getDjCateList = () => request('/dj/catelist', 'get', {}) // 电台分类
export const getDjProgramTop = params => request('/dj/program/toplist', 'get', params) // 电台-节目排行榜
export const getDjProgramRecommend = params => request('/program/recommend', 'get', params) // 电台-推荐节目
export const getDjCategoryRecommend = () => request('/dj/category/recommend', 'get', {}) // 电台-分类推荐
export const getDjRecommendType = params => request('/dj/recommend/type', 'get', params) // 电台-优秀新电台
export const getDjRadioHot = params => request('/dj/radio/hot', 'get', params) // 电台-分类电台排行榜

export const getAlbumList = params => request('/album/new', 'get', params) // 新碟上架-专辑列表
export const getAlbumDetail = params => request('/album', 'get', params) // 专辑详情
export const getAlbumComment = params => request('/comment/album', 'get', params) // 专辑评论
export const getArtistAlbum = params => request('/artist/album', 'get', params) // 歌手的专辑


export const getSongDetail = params => request('/song/detail', 'get', params) // 歌曲详情
export const getSongUrl = params => request('/song/url', 'get', params) // 歌曲播放地址
export const getSongLrc = params => request('/lyric', 'get', params) // 歌词
export const getSongComment = params => request('/comment/music', 'get', params) // 歌曲评论
export const getSimiSong = params => request('/simi/song', 'get', params) // 相似歌曲

export const getSearchSuggest = params => request('/search/suggest', 'get', params) // 搜索建议
export const getSearchResult = params => request('/search', 'get', params) // 搜索结果

export const getArtistHot50 = params => request('/artist/top/song', 'get', params) // 歌手热门歌曲50首
export const getArtistDesc = params => request('/artist/desc', 'get', params) // 歌手描述
export const getArtistMv = params => request('/artist/mv', 'get', params) // 歌手MV

export const getRadioDetail = params => request('/dj/detail', 'get', params) // 电台详情
export const getRadioProgram = params => request('/dj/program', 'get', params) // 电台节目列表
export const getProgramDetail = params => request('/dj/program/detail', 'get', params) // 电台节目详情
export const getProgramComment = params => request('/comment/dj', 'get', params) // 电台节目评论

export const emailLogin = params => request('/login', 'get', params) // 邮箱登陆
export const cellphoneLogin = params => request('/login/cellphone', 'get', params) // 手机号登陆
export const loginStatus = params => request('/login/status', 'get', params) // 登陆状态

export const getUserRecommend = params => request('/recommend/songs', 'get', params) // 每日推荐
export const getUserDetail = params => request('/user/detail', 'get', params) // 用户详情
export const getUserSubcount = params => request('/user/subcount', 'get', params) // 用户歌单、歌手、电台数量
export const getUserPlaylist = params => request('/user/playlist', 'get', params) // 用户创建/收藏歌单
export const getUserArtist = params => request('/artist/sublist', 'get', params) // 用户收藏歌手
export const getUserMv = params => request('/mv/sublist', 'get', params) // 用户收藏MV
export const getUserRadio = params => request('/dj/sublist', 'get', params) // 用户订阅的电台

