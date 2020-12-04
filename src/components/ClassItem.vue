<template>
  <li class="class_item" @click="goDetails">
    <a href="javascript:void(0)">
      <span class="img">
        <img :src="img" alt />
      </span>
      <h4 class="title truncate">{{ title }}</h4>
      <p class="desc truncate">{{ desc }}</p>
    </a>
  </li>
</template>

<script>
export default {
  name: 'ClassItem',
  props: {
    type: String, // video || audio
    id: Number, // 文章id
    title: String, // 标题
    desc: String, // 描述
    img: String, // 封面图
    link: String, // dpf路径
  },
  methods: {
    goDetails() {
      if (this.type === 'video') {
        this.$router.push({
          name: 'courseDetails',
          query: {
            id: this.id,
            // watchMode: this.listInfo.watchMode
          },
        });
      } else if (this.type === 'audio') {
        this.$router.push({
          name: 'audioDetails',
          query: {
            id: this.id,
            // watchMode: this.listInfo.watchMode
          },
        });
      } else if (this.type === 'pdf') {
        this.$router.push({
          name: 'pdfList',
          query: {
            id: this.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.class_item {
  max-width: 180px;
  a {
    display: block;
    .img {
      display: block;
      overflow: hidden;
      border-radius: 5px;
      img {
        width: 100%;
        transition: all 0.3s;
      }
    }
    &:hover {
      .img img {
        transform: scale(1.05);
      }
      .title {
        color: rgba(235, 101, 25, 1);
      }
    }
    .title {
      font-size: 14px;
      color: rgba(85, 85, 85, 1);
      line-height: 1;
      margin-top: 6px;
      transition: all 0.3s;
    }
    .desc {
      font-size: 14px;
      color: rgba(171, 171, 172, 1);
      line-height: 1;
      margin-top: 8px;
    }
  }
}
</style>
