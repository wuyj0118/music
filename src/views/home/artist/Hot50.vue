<template>
  <SongList
    :songList="songList"
    page="ar"
  >
    <template v-slot:title>
      <div>
        <a-button-group>
          <a-button @click="addToPlay({ songs: songList, replace: true })">
            <a-icon type="play-circle" />
            播放
          </a-button>
          <a-button @click="addToNext(songList, true)">
            <a-icon type="plus" />
          </a-button>
        </a-button-group>
        <a-button class="btn-fav50">
          <a-icon type="folder-add" />
          收藏热门50
        </a-button>
      </div>
    </template>
  </SongList>
</template>

<script>
import SongList from '@/components/common/SongList'
import { getArtistHot50 } from '@/api/api'
import { mapMutations } from 'vuex'

export default {
  name: 'Hot50',
  components: {
    SongList
  },
  data() {
    return {
      songList: [],
    }
  },
  created() {
    this.getHot()
  },
  watch: {
    '$route'() {
      this.getHot()
    }
  },
  methods: {
    ...mapMutations(['addToPlay', 'addToNext']),
    getHot() {
      const id = this.$route.params.id
      if (!/\d+/.test(id)) return
      getArtistHot50({ id }).then(res => {
        this.songList = res.songs.map(({ id, name, ar, al, dt }) => ({ id, name, ar, al, dt }))
      })
    }
  }
}
</script>

<style lang="less">
.btn-fav50 {
  margin-left: 15px !important;
}
</style>
