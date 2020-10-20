<template>
  <div class="al-new">
    <HeadLine title="新碟上架">
      <template v-slot:icon>
        <span class="al-icon">
          <a-icon type="check" />
        </span>
      </template>
      <template v-slot:link>
        <router-link class="more-link" to="/album">更多<a-icon type="right" /></router-link>
      </template>
    </HeadLine>
    <ul class="al-list">
      <li class="al-item" v-for="li in newList" :key="li.id">
        <div class="cover-wrap">
          <router-link :to="`/h/album/${li.id}`"><lazy-img class="al-cover" :src="li.picUrl + '?param=120y120'" alt="" /></router-link>
          <span class="al-playicon" @click.stop="getAlbumAndPlay(li.id)"><a-icon type="play-circle" /></span>
        </div>
        <router-link :to="`/h/album/${li.id}`" class="al-name">{{ li.name }}</router-link>
        <router-link :to="`/h/artist/${li.artist.id}`" class="al-artist">{{ li.artist.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { mapActions } from 'vuex'
import { getAlbumNewest } from '@/api/api'
export default {
  name: 'NewAlbum',
  components: {
    HeadLine,
  },
  data() {
    return {
      newList: [],
    }
  },
  created() {
    getAlbumNewest({
      limit: 5,
    }).then(res => {
      if (res.code == 200) {
        this.newList = res.albums.splice(0, 5)
      }
    })
  },
  methods: {
    ...mapActions(['getAlbumAndPlay'])
  }
}
</script>

<style lang="less">
.al-new {
  padding: 20px;
  .al-icon {
    color: #f00;
    margin: 0 4px;
  }
  .more-link {
    color: #666;
    &:hover {
      color: #333;
      text-decoration: underline;
    }
  }
}

.al-list {
  background: #f9f9f9;
  width: 100%;
  height: 200px;
  border: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .al-item {
    width: 115px;
    &:hover {
      .al-playicon {
        display: block;
      }
    }
  }
  .cover-wrap {
    position: relative;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #666;
    .al-cover {
      width: 115px;
      height: 115px;
    }
    .al-playicon {
      position: absolute;
      right: 6px;
      top: 86px;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
      display: none;
      cursor: pointer;
    }
  }
  
  .al-name, .al-artist {
    font-size: 12px;
    line-height: 18px;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
  .al-name {
    color: #000;
  }
  .al-artist {
    color: #666;
  }
}
</style>
