<template>
  <div class="info_reco">
    <div class="share_content">
      <div class="type_title">
        <h5>课程学习进度</h5>
      </div>
      <div class="info_list">
        <template v-for="item in studyList">
          <div class="rec_slide" :key="item.id" @click="touer(item)">
            <div class="_img">
              <img class="sign_vip" v-if="item.watchMode == 2" src="../../assets/icon_vip_subscript.png" alt />
              <img class="cover_img" :src="item.cover" alt />
            </div>
            <div class="text">
              <h6 class="no_space">{{item.title}}</h6>
              <p>
                <span class="num_people">{{item.enroll}}人已报名</span>
                <span class="price">¥ {{item.price}}</span>
              </p>
            </div>
            <div class="jd_bfb">
              <progress :value="item.schedule" max="100"></progress>
              <span>已学习{{item.schedule}}%</span>
            </div>
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
  </div>
</template>
<script>
import banner from "@/assets/banner.png";
import httpRequest from "@/api/index.js";
export default {
  computed: {},
  data() {
    return {
      pageNum: 1,
      banner,
      studyList: null,
      totalPage: null
    };
  },
  mounted() {
    this.getStudyData();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getStudyData();
    },
    touer(item) {
      this.$router.push({
        name: 'courseDetails',
        query: {
          id: item.id,
          watchMode: item.watchMode,
        }
      })
    },
    async getStudyData() {
      const res = await httpRequest.listLessonStudySchedule({
        pageNum: this.pageNum,
        pageSize: 6
      });
      if (res) {
        this.studyList = res.data.list;
        this.totalPage = res.data.totalPage;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.info_reco {
  .share_content {
    max-width: 900px;
    margin: 0 auto;
    .type_title {
      padding: 40px 0 30px;
      h5 {
        font-size: 20px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
      }
    }
  }
}
.info_list {
  display: flex;
  flex-wrap: wrap;
}
.rec_slide {
  margin: 0 1px 20px;
  max-width: 298px;
  cursor: pointer;
  padding: 10px 6px;
  background: #fff;
  border-radius: 10px;
  ._img {
    width: 286px;
    height: 182px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .sign_vip {
      position: absolute;
      left: 10px;
    }
    .cover_img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    width: 100%;
    h6 {
      font-size: 16px;
      color: #3c3c3c;
      margin: 15px 0;
    }
    p {
      display: flex;
      justify-content: space-between;
      .num_people {
        font-size: 14px;
        color: #8e8e8e;
      }
      .price {
        font-size: 16px;
        color: #f57425;
      }
    }
  }
  .jd_bfb {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    progress {
      width: 180px;
      height: 2px;
      background: #f57425;
      &::-webkit-progress-bar {
        background: #fff1e9;
      }
      &::-webkit-progress-value {
        background: linear-gradient(
          -90deg,
          rgba(245, 116, 37, 1),
          rgba(255, 255, 255, 1)
        );
      }
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(176, 176, 176, 1);
    }
  }
  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
  }
  &:nth-child(4n) {
    margin-right: 0;
  }
}
@media screen and (max-width: 1200px) {
  .info_reco {
    .share_content {
      max-width: 100%;
      margin: 0 auto;
      .type_title {
        padding: 0.4rem;
        h5 {
          font-size: 0.426667rem;
        }
      }
    }
  }
  .rec_slide {
    margin: 0 0 0.4rem;
    width: 50%;
    cursor: pointer;
    padding: 0.133333rem 0.08rem;
    background: #fff;
    border-radius: 0.133333rem;
    ._img {
      width: 100%;
      border-radius: 0.133333rem;
      .sign_vip {
        left: 0.133333rem;
      }
    }
    .text {
      h6 {
        font-size: 0.373333rem;
        margin: 0.266667rem 0;
      }
      p {
        .num_people {
          font-size: 0.32rem;
        }
        .price {
          font-size: 0.32rem;
        }
      }
    }
    .jd_bfb {
      padding: 0.133333rem 0;
      progress {
        width: 2.4rem;
        height: 2px;
      }
      span {
        font-size: 0.32rem;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .rec_slide {
    width: 50%;
    max-width: 50%;
  }
}
</style>