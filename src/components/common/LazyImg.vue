<template>
  <img ref='vLazyImg' :src="iSrc" alt="">
</template>

<script>
import defaultSrc from '@/assets/music.jpg'
export default {
  name: 'LazyImg',
  props: {
    src: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      iSrc: defaultSrc,
    }
  },
  watch: {
    src() {
      this.iSrc = defaultSrc
      this.addListern()
    }
  },
  mounted() {
    this.addListern()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  },
  methods: {
    addListern() {
      window.addEventListener('scroll', this.scroll)
      this.scroll()
    },
    scroll() {
      const img = this.$refs.vLazyImg
      if (img.getBoundingClientRect().top - window.innerHeight < 0) {
        const img = new Image()
        img.onload = () => {
          this.iSrc = img.src
        }
        img.src = this.src
        window.removeEventListener('scroll', this.scroll)
      }
    }
  }
}
</script>

