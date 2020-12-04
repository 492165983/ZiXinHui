<template>
  <li class="report_item" :class="isNew ? 'new': ''" @click="navGo">
    <a href="javascript:void(0)">
      <div class="title truncate">{{title}}</div>
      <div class="desc">
        <p>{{desc}}</p>
      </div>
      <div class="attr">{{datetime}}</div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'ReportItem',
  props: {
    id: Number,
    title: String,
    desc: String,
    datetime: String,
    url: String,
    isNew: Boolean
  },
  methods: {
    async navGo() {
      console.log(this.id);
      
      this.$router.push({
        name: "pdfList",
        query: {
          id: this.id
        }
      });
    }
  }
}
</script>

<style lang="less">
.report_item {
  width: 285px;
  margin-right: 20px;
  border: 1px solid #eee;
  margin-bottom: 40px;
  &.new {
    .title:after {
      display: block;
    }
  }
  .title {
    height: 90px;
    line-height: 1;
    padding: 44px 23px 20px;
    position: relative;
    font-size: 16px;
    font-weight: bold;
    color: #111;
    border-bottom: 1px solid #eeeeee;
    &:after {
      content: "";
      width: 68px;
      height: 68px;
      background: url(../assets/images/new.png) no-repeat;
      position: absolute;
      right: -1px;
      top: -2px;
      display: none;
    }
  }
  .desc {
    height: 160px;
    padding: 30px 23px;
    border-bottom: 1px solid #eeeeee;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      line-height: 2;
      height: 8em;
      color: #666;
      font-size: 14px;
    }
  }
  .attr {
    height: 40px;
    font-size: 14px;
    color: #111;
    padding: 0 23px;
    line-height: 40px;
  }
}
</style>
