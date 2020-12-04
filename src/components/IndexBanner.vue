<!-- 轮播图的版块 -->
<template>
  <div class="index_banner">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in indexBanner" :key="item.id">
        <a :href="item.url" class="img">
          <img :src="item.picUrl" alt />
        </a>
      </swiper-slide>
    </swiper>
    <!-- <div class="banner_fixed">
      <div class="banner_wrap">
        <div class="title">重磅推荐</div>
        <ul class="pagination_list" slot="pagination">
          <li
            class="swiper-pagination-bullet swiper-pagination-bullet-active"
            v-for="item in indexBanner"
            :key="item.id"
          >{{item.title}}</li>
        </ul>
      </div>
    </div>-->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
let bannerArr;
export default {
  props: {
    indexBanner: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      bannerImg: require("../assets/images/banner.png"),
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".pagination_list",
          clickable: true,
          renderBullet(index, className) {
            return `<li class="${className}">${bannerArr[index].title}</li>`;
          },
        },
      },
      list: [],
    };
  },
  watch: {
    indexBanner(newVal) {
      bannerArr = newVal;
    },
  },
  methods: {},
};
</script>

<style lang="less">
.index_banner {
  position: relative;
  .img {
    display: block;
    img {
      width: 100%;
      height: auto;
    }
  }
  .banner_fixed {
    width: 368px;
    height: 600px;
    max-height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    .banner_wrap {
      .title {
        padding-top: 80px;
        font-size: 24px;
        color: #fff;
        line-height: 1;
        height: 136px;
        padding: 80px 0 33px 80px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        background: url(../assets/images/icon_histogram.png) no-repeat 47px 80px;
        background-size: 28px;
        font-weight: bold;
      }
      .pagination_list {
        padding-left: 80px;
        li {
          font-size: 18px;
          color: #fff;
          line-height: 48px;
          height: 48px;
          transition: color 0.3s;
          cursor: pointer;
          border-radius: none;
          display: block;
          width: 100%;
          opacity: 1;
          background: none;
          &.swiper-pagination-bullet-active {
            font-size: 24px;
            color: #cc5614;
            font-weight: bold;
          }
          &:hover {
            color: #cc5614;
          }
        }
      }
    }
  }
}
</style>
