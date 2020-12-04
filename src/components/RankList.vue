<template>
  <div class="rank_list">
    <div class="item_name">
      <h3>{{title}}</h3>
    </div>
    <ul class="list">
      <li v-for="item in list" :key="item.id" @click="geDetails(item)">
        <a href="javascript:void(0)">
          <h4 class="truncate">{{item.title}}</h4>
          <p class="truncate">{{item.desc}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RankList",
  props: {
    list: Array,
    title: String,
    type: String
  },
  methods: {
    geDetails(item) {
      if (this.type === "video") {
        this.$router.push({
          name: "courseDetails",
          query: {
            id: item.id
            // watchMode: this.listInfo.watchMode
          }
        });
      } else if (this.type === "audio") {
        this.$router.push({
          name: "audioDetails",
          query: {
            id: item.id
            // watchMode: this.listInfo.watchMode
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.rank_list {
  .list {
    margin-top: 28px;
    background: rgba(248, 248, 248, 1);
    border-radius: 4px;
    counter-reset: index;
    li {
      padding: 0 20px;
      a {
        display: block;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        padding: 20px 0 20px 35px;
        position: relative;
        transition: all 0.3s;
        &:before {
          content: counter(index);
          counter-increment: index;
          position: absolute;
          font-size: 20px;
          color: rgba(17, 17, 17, 1);
          left: 2px;
          top: 16px;
        }
        &:hover {
          h4 {
            color: rgba(235, 101, 25, 1);
          }
        }
      }
      &:nth-child(-n + 3) a:before {
        color: rgba(235, 101, 25, 1);
      }
      &:last-child a {
        border: none;
      }
      h4 {
        font-size: 16px;
        color: rgba(17, 17, 17, 1);
        line-height: 1;
        transition: all 0.3s;
      }
      p {
        color: rgba(153, 153, 153, 1);
        line-height: 1;
        margin-top: 6px;
      }
    }
  }
}
</style>
