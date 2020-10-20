<template>
  <div id="playlist-comment">
    <div class="rc-head">
      <span class="rc-t">评论</span>
      <span class="rc-n">共{{ total }}条评论</span>
    </div>
    <div class="rc-ipt">
      <div class="rc-avatar">
        <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="" class="rca-img">
      </div>
      <div class="rc-ipta">
        <a-textarea placeholder="评论" :rows="3" :maxLength="140" @change="inputChange" />
        <div class="rc-smt">
          <span class="rc-leftlen">{{ leftLength }}</span>
          <a-button type="primary" size="small">评论</a-button>
        </div>
      </div>
    </div>
    <div class="rc-comment" v-if="hotComment.length > 0">
      <p class="rch-t"><strong>精彩评论</strong></p>
      <ul class="rc-list">
        <li class="rc-li" v-for="hcm in hotComment" :key="hcm.commentId">
          <div class="rcli-avt">
            <router-link to="/">
              <img :src="hcm.user.avatarUrl + '?param=50y50'" alt="">
            </router-link>
          </div>
          <div class="rcli-dtl">
            <p class="rcli-cnt">
              <router-link to="/">{{ hcm.user.nickname }}</router-link>:
              <span>{{ hcm.content }}</span>
            </p>
            <div class="rcli-mf">
              <span class="rcli-ct">{{ dateFormat(hcm.time, 'yyyy年m月d日') }}</span>
              <span class="rcli-like">
                <span class="like-icon">
                  <a-icon type="like" :theme=" hcm.liked ? 'filled' : 'outlined'" />
                </span>
                ({{ hcm.likedCount }})
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="rc-comment">
      <p class="rch-t"><strong>最新评论({{ total }})</strong></p>
      <ul class="rc-list">
        <li class="rc-li" v-for="hcm in newComment" :key="hcm.commentId">
          <div class="rcli-avt">
            <router-link to="/">
              <img :src="hcm.user.avatarUrl + '?param=50y50'" alt="">
            </router-link>
          </div>
          <div class="rcli-dtl">
            <p class="rcli-cnt">
              <router-link to="/">{{ hcm.user.nickname }}</router-link>:
              <span>{{ hcm.content }}</span>
            </p>
            <div class="rc-reply" v-if="hcm.beReplied.length">
              <router-link to="/">{{ hcm.beReplied[0].user.nickname }}</router-link>:
              <span>{{ hcm.beReplied[0].content }}</span>
            </div>
            <div class="rcli-mf">
              <span class="rcli-ct">{{ dateFormat(hcm.time, 'yyyy年m月d日') }}</span>
              <span class="rcli-like">
                <span class="like-icon">
                  <a-icon type="like" :theme=" hcm.liked ? 'filled' : 'outlined'" />
                </span>
                ({{ hcm.likedCount }})
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="rc-page">
      <a-pagination :current="currPage" :total="total" :pageSize="20" @change="changePage" />
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { getPlayListComment, getAlbumComment, getProgramComment, getSongComment } from '@/api/api'
export default {
  name: 'Comment',
  props: {
    id: {
      required: true,
    },
    type: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      total: 0,
      commentTxt: '',
      hotComment: [],
      newComment: [],
      currPage: 1,
    }
  },
  components: {},
  computed: {
    leftLength() {
      return 140 - this.commentTxt.length
    }
  },
  created() {
    const APIs = {
      pl: getPlayListComment,
      al: getAlbumComment,
      rp: getProgramComment,
      song: getSongComment,
    }
    this.getAPI = APIs[this.type]
    if (this.id && this.getAPI) this.getComment(this.id)
  },
  methods: {
    dateFormat,
    getComment(id, page = 0, limit = 20) {
      this.id = id
      this.currPage = page + 1
      const offset = page * limit
      this.getAPI({ id, offset, limit }).then(res => {
        if (res.code == 200) {
          this.total = res.total
          this.hotComment = res.hotComments || []
          this.newComment = res.comments
        }
      })
    },
    changePage(page) {
      this.getComment(this.id, page - 1)
      window.scrollTo(0, document.querySelector('#playlist-comment').offsetTop)
    },
    inputChange(e) {
      this.commentTxt = e.target.value
    },
  },
  watch: {
    id(val) {
      if (val) this.getComment(val)
    }
  }
}
</script>

<style lang="less">
#playlist-comment {
  .rc-head {
    border-bottom: 2px solid #cd0a0a;
  }
  .rc-t {
    font-size: 20px;
    color: #333;
  }
  .rc-n {
    font-size: 12px;
    color: #666;
    padding-left: 20px;
  }
}
.rc-ipt {
  display: flex;
  margin: 20px 0;
  .rc-avatar {
    width: 50px;
    .rca-img {
      width: 50px;
      height: 50px;
    }
  }
  .rc-ipta {
    flex: 1;
    padding-left: 15px;
    .rc-smt {
      text-align: right;
      margin-top: 10px;
    }
    .rc-leftlen {
      font-size: 12px;
      padding: 0 15px;
    }
  }
}
.rc-comment {
  margin-bottom: 20px;
}
.rch-t {
  font-size: 12px;
  line-height: 3;
  border-bottom: 1px solid #ccc;
  margin: 0;
}
.rc-list {
  .rc-li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px dotted #ccc;
    &:last-of-type {
      border: none;
    }
  }
  .rcli-avt {
    width: 50px;
    .rca-img {
      width: 50px;
      height: 50px;
    }
  }
  .rcli-dtl {
    flex: 1;
    font-size: 12px;
    color: #333;
    padding-left: 10px;
    .rcli-cnt {
      margin-bottom: 15px;
    }
    .rc-reply {
      border: 1px solid #ccc;
      background: #f9f9f9;
      padding: 12px;
      line-height: 1.8;
      margin-bottom: 10px;
      position: relative;
      &:before {
        content: "";
        width: 8px;
        height: 8px;
        background: #f9f9f9;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        position: absolute;
        left: 15px;
        top: -5px;
        transform: rotate(45deg);
      }
    }
    .rcli-mf {
      padding: 4px 0 0 0;
    }
    .rcli-ct {
      color: #999;
    }
    .rcli-like {
      float: right;
      cursor: pointer;
      .like-icon {
        color: #f00;
      }
    }
  }
}
.rc-page {
  text-align: center;
  padding-top: 20px;
}
</style>
