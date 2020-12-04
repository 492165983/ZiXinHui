<template>
  <div class="warp">
    <div class="collection_tab">
      <div class="item" @click="listNum = 1" :class="{active: listNum === 1}">视频课程</div>
      <div class="item" @click="listNum = 3" :class="{active: listNum === 3}">投研报告</div>
      <div class="item" @click="listNum = 2" :class="{active: listNum === 2}">音频课程</div>
    </div>
    <div class="list1" v-if="listNum === 1">
      <template v-for="item in list">
        <div class="item" :key="item.id">
          <course-cover :listInfo="item"></course-cover>
        </div>
      </template>
    </div>
    <div class="list1 report_list" v-else>
      <template v-for="item in list">
        <div class="item" :key="item.id" @click="godetails(item)">
          <h5>{{item.title}}</h5>
          <p>{{item.created}}</p>
          <p>{{item.typeName}}类</p>
          <img src="../../assets/icon_presentation_new.png" alt class="vip" />
        </div>
      </template>
    </div>
    <div class="pagin_main" v-if="totalPage > 1">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :pagerCount="5"
        :pageSize="6"
        layout="prev, pager, next"
        :pageCount="totalPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import courseCover from "@/components/courseCover.vue";
import httpRequest from "@/api/index.js";
export default {
  components: {
    courseCover
  },
  data() {
    return {
      pageNum: 1,
      listNum: 1,
      list: null,
      totalPage: null
    };
  },
  watch: {
    listNum() {
      (this.pageNum = 1), this.getPageData();
    }
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    godetails(item) {
      if (this.listNum === 3) {
        this.$router.push({
          name: `reportSeries`,
          query: {
            id: item.lessonType
          }
        });
      }
      if (this.listNum === 2) {
        this.$router.push({
          name: `audioSeries`,
          query: {
            id: item.lessonType
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getPageData();
    },
    async getPageData() {
      const res = await httpRequest.listWatchHistory({
        pageData: {
          pageNum: this.pageNum,
          pageSize: 6
        },
        typeId: this.listNum
      });
      if (res) {
        this.list = res.data.list;
        this.totalPage = res.data.totalPage;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.collection_tab {
  display: flex;
  padding: 20px 0;
  align-items: center;
  .item {
    margin-right: 40px;
    padding: 15px 0;
    position: relative;
    font-size: 20px;
    font-weight: 400;
    color: rgba(60, 60, 60, 1);
    &.active {
      color: #f57425;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -12px;
        width: 24px;
        height: 4px;
        border-radius: 2px;
        background: #f57425;
        display: block;
      }
    }
  }
}
.list1 {
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
}
.report_list {
  .item {
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(240, 240, 240, 1);
    border-radius: 10px;
    width: 290px;
    height: 170px;
    padding: 25px 20px;
    display: flex;
    margin-right: 13px;
    flex-direction: column;
    margin-bottom: 15px;
    position: relative;
    h5 {
      flex: 1;
      font-size: 18px;
      font-weight: 400;
      line-height: 30px;
      color: rgba(60, 60, 60, 1);
    }
    p {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(169, 169, 169, 1);
    }
    .vip {
      position: absolute;
      top: 0;
      left: 0;
    }
    &:hover {
      box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
@media screen and (max-width: 1200px) {
  .collection_tab {
    padding: 0.266667rem 0;
    .item {
      margin-right: 0.4rem;
      padding: 0.4rem 0;
      font-size: 0.426667rem;
    }
  }
  .list1 {
    max-width: 100%;
    .item {
      width: 50%;
      max-width: 50%;
      display: flex;
      justify-content: center;
    }
  }
  .report_list {
    .item {
      border-radius: 0.133333rem;
      width: 290px;
      height: auto;
      padding: 0.4rem 0.266667rem;
      margin-right: 0.266667rem;
      margin-bottom: 0.266667rem;
      max-width: 48%;
      h5 {
        flex: 1;
        font-size: 0.426667rem;
        line-height: 0.533333rem;
      }
      p {
        margin-top: 0.133333rem;
        font-size: 0.373333rem;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .report_list {
    .item {
      &:nth-child(3n) {
        margin-right: 0.266667rem;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
</style>