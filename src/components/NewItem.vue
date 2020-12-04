<template>
  <li class="new_item" @click="goDetails">
    <a href="javascript:void(0)">
      <div class="news_info">
        <h5 class="truncate">{{title}}</h5>
        <p class="desc">{{desc}}</p>
        <p class="attr">
          <span class="read">{{hasRead}}人阅读</span>
          <span class="date">{{datetime}}</span>
        </p>
      </div>
      <span class="img">
        <img :src="img" alt />
      </span>
    </a>
  </li>
</template>

<script>
export default {
  name: "NewItem",
  props: {
    id: Number,
    title: String,
    desc: String,
    read: String,
    datetime: String,
    hasRead: Number,
    img: String,
  },
  methods: {
    goDetails() {
      this.$router.push({
        name: "newsDetails",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.new_item {
  padding: 40px 0;
  border-bottom: 2px solid rgba(153, 153, 153, 1);
  // &:last-child{
  //     border-bottom: none;
  // }
  a {
    display: flex;
    justify-content: space-between;
  }
  .news_info {
    width: 686px;
    h5 {
      font-size: 16px;
      color: rgba(17, 17, 17, 1);
    }
    .desc {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      line-height: 24px;
      height: 72px;
      margin-top: 20px;
      font-size: 14px;
      color: #888;
    }
    .attr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-top: 26px;
      .read {
        color: rgba(17, 17, 17, 1);
      }
      .date {
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .img {
    width: 328px;
    height: 164px;
    overflow: hidden;
    border-radius: 3px;
    &:hover img {
      transform: scale(1.05);
    }
    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }
  }
}
</style>
