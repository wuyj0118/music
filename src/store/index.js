import Vue from 'vue'
import Vuex from 'vuex'
import { getSongDetail, getAlbumDetail, getPlaylistDetail } from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      songs: [],
      playIndex: -1,
      loopType: 2, // 1: 单曲循环, 2: 列表循环
    },
    login: {
      isModal: false,
    },
  },
  getters: {
    currPlaySong: ({ player }) => {
      return player.songs.length ? player.songs[player.playIndex] : {}
    },
    currPlayId: ({ player }) => {
      return  player.songs.length && player.playIndex > -1 ? player.songs[player.playIndex].id : ''
    },
  },
  mutations: {
    switchSong({ player }, { via = 0, index = -1 }) {
      if (index > -1) {
        player.playIndex = index
      } else if (via != 0) {
        player.playIndex = (player.playIndex + via + player.songs.length) % player.songs.length
      }
    },
    addToNext({ player }, songs){
      let songsId = player.songs.map(s => s.id)
      let newSongs = songs.filter(s => !songsId.includes(s.id))
      player.songs = player.songs.concat(newSongs)
      player.playIndex = Math.max(player.playIndex, 0)
    },
    addToPlay({ player }, {songs, replace = false}) {
      if (replace) {
        player.songs = songs
        player.playIndex = 0
      } else {
        let pid = songs[0].id
        let songsId = player.songs.map(s => s.id)
        let newSongs = songs.filter(s => !songsId.includes(s.id))
        player.songs = player.songs.concat(newSongs)
        player.playIndex = player.songs.map(s => s.id).indexOf(pid)
      }
    },
    deleteSong({ player }, index) {
      player.songs.splice(index, 1)
      if (index < player.playIndex) {
        player.playIndex--
      } else {
        const len = player.songs.length
        player.playIndex = len == player.playIndex ? 0 : player.playIndex
      }
    },
    switchLoopType({ player }) {
      player.loopType = player.loopType == 1 ? 2 : 1
    },
    switchLoginModal({ login }, status) {
      login.isModal = status
    }
  },
  actions: {
    getSongAndPlay({ commit }, id) {
      getSongDetail({ ids: id }).then(res => {
        const songs = res.songs.map(({ id, name, al, ar, dt }) => ({ id, name, al, ar, dt }))
        commit('addToPlay', { songs })
      })
    },
    getAlbumAndPlay({ commit }, id) {
      getAlbumDetail({ id }).then(res => {
        const songs = res.songs.map(({ id, name, al, ar, dt }) => ({ id, name, al, ar, dt }))
        commit('addToPlay', { songs, replace: true })
      })
    },
    getPlaylistAndPlay({ commit }, id) {
      getPlaylistDetail({ id }).then(res => {
        let { tracks, trackIds } = res.playlist
        const trackSimple = tracks.map(({ id, name, al, ar, dt }) => ({ id, name, al, ar, dt }))
        if (tracks.length == trackIds.length) {
          commit('addToPlay', { songs: trackSimple, replace: true })
        } else {
          let ids = trackIds.slice(tracks.length, 100 - tracks.length).map(s => s.id).join(',')
          getSongDetail({ ids }).then(res => {
            const songs = res.songs.map(({ id, name, al, ar, dt }) => ({ id, name, al, ar, dt }))
            commit('addToPlay', { songs: trackSimple.concat(songs), replace: true })
          })
        }
      })
    }
  },
})
