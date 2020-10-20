<template>
  <div class="header-search">
    <a-input :loading="searching" allow-clear placeholder="搜索" @change="onChange" @focus="foucsed = true" @blur="onBlur" @pressEnter="enterSearch" />
    <div class="search-overlay" v-if="!!searchTxt && foucsed">
      <div class="result-song" v-if="songs.length">
        <div class="re-type">单曲</div>
        <ul class="re-list">
          <li class="re-li" v-for="s in songs" :key="s.id" @click="$router.push({ name: 'SongDetail', params: { id: s.id } })">
            <span class="re-icon" @click.stop="getSongAndPlay(s.id)"><a-icon type="play-circle" /></span>
            <span class="re-name" v-html=highlightText(s.name) /> - <span class="re-suf" v-html=highlightText(s.artists[0].name) />
          </li>
        </ul>
      </div>
      <div class="result-ar" v-if="artists.length">
        <div class="re-type">歌手</div>
        <ul class="re-list">
          <li class="re-li" v-for="ar in artists" :key="ar.id" @click="$router.push({name: 'ArtistDetail', params: { id: ar.id }})">
            <span class="re-name" v-html=highlightText(ar.name) />
          </li>
        </ul>
      </div>
      <div class="result-al" v-if="albums.length">
        <div class="re-type">专辑</div>
        <ul class="re-list">
          <li class="re-li" v-for="al in albums" :key="al.id" @click="$router.push({name: 'AlbumDetail', params: { id: al.id }})">
            <span class="re-icon" @click="getAlbumAndPlay(al.id)"><a-icon type="play-circle" /></span>
            <span v-html=highlightText(al.name) /> - <span class="re-suf" v-html=highlightText(al.artist.name) />
          </li>
        </ul>
      </div>
      <div class="result-pl" v-if="playlists.length">
        <div class="re-type">歌单</div>
        <ul class="re-list">
          <li class="re-li" v-for="pl in playlists" :key="pl.id" @click="$router.push({name: 'PlaylistDetail', params: { id: pl.id }})">
            <span class="re-icon" @click="getPlaylistAndPlay(pl.id)"><a-icon type="play-circle" /></span>
            <span class="re-name" v-html=highlightText(pl.name) />
          </li>
        </ul>
      </div>
      <div class="result-more">
        <router-link :to="{path: '/search', query: { t: searchTxt }}">查看更多<a-icon type="right" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce"
import { mapActions } from 'vuex'
import { getSearchSuggest } from '@/api/api'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      searchTxt: '',
      searching: false,
      foucsed: false,
      albums: [],
      songs: [],
      artists: [],
      playlists: [],
    }
  },
  created() {
    // this.doSearch()
  },
  methods: {
    ...mapActions(['getSongAndPlay', 'getAlbumAndPlay', 'getPlaylistAndPlay']),
    onChange(e) {
      this.searchTxt = e.target.value
      this.doSearch()
    },
    doSearch: debounce(function() {
      if (this.searchTxt) {
        this.searching = true
        getSearchSuggest({
          keywords: this.searchTxt,
        }).then(({result: { songs = [], albums = [], artists = [], playlists = [] }}) => {
          this.songs = songs.map(({ id, name, artists }) => ({ id, name, artists }))
          this.albums = albums.map(({ id, name, artist }) => ({ id, name, artist }))
          this.artists = artists.map(({ id, name }) => ({ id, name }))
          this.playlists = playlists.map(({ id, name }) => ({ id, name }))
          this.searching = false
        })
      }
    }, 500),
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
    onBlur() {
      setTimeout(() => {
        this.foucsed = false
      }, 100)
    },
    enterSearch() {
      if (this.searchTxt) {
        this.$router.push({ path: '/search', query: { t: this.searchTxt } })
      }
    }
  },
}
</script>

<style lang="less">
.header-search {
  margin: 0 10px;
  position: relative;
}
.search-overlay {
  position: absolute;
  left: 0;
  top: 58px;
  z-index: 999;
  width: 260px;
  background: #fff;
  box-shadow: 0 0px 15px #666;
  border-radius: 5px;
  font-size: 12px;
  color: #333;
  .result-song, .result-ar, .result-al, .result-pl {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
  }
  .re-type {
    flex: 1;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .re-list {
    width: 200px;
    margin: 0;
    border-left: 1px solid #e8e8e8;
  }
  .re-li {
    width: 100%;
    height: 28px;
    line-height: 28px;
    padding-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background: #e8e8e8;
      color: #000;
    }
  }
  .re-name {
    color: #333;
  }
  .re-suf {
    color: #666;
  }
  .re-icon {
    font-size: 14px;
    margin-right: 5px;
    cursor: pointer;
    color: #666;
  }
  .result-more {
    height: 30px;
    line-height: 30px;
    padding-left: 70px;
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

</style>