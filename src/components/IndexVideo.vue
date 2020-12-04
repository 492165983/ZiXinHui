<template>
  <div class="index_video_alone">
    <div class="video_container">
      <!-- 进入视图开始播放，去除背景图，播放器滚动到视图中央时放大 -->
      <video
        loop
        muted
        autoplay
        x5-video-player-fullscreen="true"
        x5-playinline
        playsinline
        webkit-playinline
        controls
        preload="none"
        class="video"
        id="video_box"
        :src="videoSrc"
        :style="`background-image: url(&quot;${videoBackground};);`"
        ref="video"
      >
        <source type="video/mp4; codecs="avc1.4D401E, mp4a.40.2""
        :data-layzr-src="videoSrc" group="section 3" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexVideo',
  props: {
    videoBackground: String,
    videoSrc: String,
  },
  data() {
    return {
      // 视频背景图
      // videoBackground:
      //   'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600166933782&di=56bb380f59486fcde2b34c59214434b4&imgtype=0&src=http%3A%2F%2Fwww.people.com.cn%2Fmediafile%2Fpic%2F20170224%2F15%2F15065695444188240947.jpg',
      // 视频地址
      // videoSrc:
      //   "https://resource.zixinhui.com/2020/04/20/495a2a3f-2394-4579-8272-dbbcfaff6574.mp4",
    };
  },
  mounted() {
    window.onscroll = this.handleScroll;
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    handleScroll() {
      const rect = this.$refs.video.getBoundingClientRect();
      const inViewport =
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < window.innerWidth &&
        rect.top < window.innerHeight;
      if (inViewport) {
        this.$refs.video.style.backgroundImage = '';
        this.$refs.video.play();
      } else {
        this.$refs.video.style.backgroundImage = this.videoBackground;
        this.$refs.video.pause();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index_video_alone {
  // height: 100vh;
  // min-height: 785px;
  background: url(../assets/images/video_bg.jpg) repeat;
  width: 100%;
  .video_container {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    transition: all 0.5s;
    .video {
      // width: 1200px;
      width: 100%;
      max-width: 1500px;
      margin: 0 auto;
      height: 586px;
      transition: all 0.5s;
      object-fit: fill;
    }
    &:hover {
      width: 100vw;
      .video {
        height: 100vh;
        min-height: 350px;
        width: 100vw;
      }
    }
  }
}
</style>
