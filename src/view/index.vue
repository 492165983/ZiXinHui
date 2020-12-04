<template>
  <div
    class="index_main"
    v-title
    data-title="博弈视界官网：财经综合服务平台，提供专业的财经、股票、期货、基金、外汇、黄金、贵金属、农产品、能源、数字货币等金融品种的交易技巧,一个最全面的财经综合服务平台，投资者教育平台_深圳资信科技有限公司"
  >
    <IndexBanner :indexBanner="indexBanner" />

    <div class="index_menu">
      <div class="container">
        <IndexMenuItem
          v-for="type in menuList"
          :key="type.type_id"
          :typeName="type.type_name"
          :typeImg="type.type_img"
          :typeId="type.type_id"
          :typeList="type.list"
        />
      </div>
    </div>

    <!-- 热门 -->
    <div class="index_hot">
      <div class="container">
        <div class="item_name">
          <h3>今日热门</h3>
          <ul class="tab_list">
            <li
              v-for="item in hotTitle"
              :class="hotType === item.type? 'active' : ''"
              :key="item.id"
              @click="cutoverType(item)"
            >{{item.name}}</li>
          </ul>
        </div>
        <ul class="class_list">
          <ClassItem
            v-for="item in hotList"
            :type="hotType"
            :key="item.id"
            :title="item.title"
            :id="item.id"
            :desc="item.remark"
            :img="item.cover"
            :link="item.url || ''"
          />
        </ul>
      </div>
    </div>

    <!-- 视频课程 -->
    <div class="index_video">
      <div class="container">
        <div class="video_list">
          <div class="item_name">
            <h3>视频课程</h3>
          </div>
          <ul class="list">
            <ClassItem
              v-for="item in indexVideos"
              type="video"
              :key="item.id"
              :title="item.title"
              :id="item.id"
              :desc="item.remark"
              :img="item.cover"
            />
          </ul>
        </div>
        <RankList :list="videoRankList" type="video" title="视频课程排行榜" />
      </div>
    </div>

    <!-- 音频课程 -->
    <div class="index_audio">
      <div class="container">
        <div class="audio_list">
          <div class="item_name">
            <h3>音频课程</h3>
          </div>
          <ul class="list">
            <ClassItem
              v-for="item in audioList"
              type="audio"
              :key="item.id"
              :title="item.title"
              :id="item.id"
              :desc="item.remark"
              :img="item.cover"
            />
          </ul>
        </div>
        <RankList :list="audioRankList" type="audio" title="音频课程排行榜" />
      </div>
    </div>

    <!-- 视频 -->
    <IndexVideo :videoSrc="videoSrc" :videoBackground="videoBackground" />

    <!-- 资讯推荐 -->
    <div class="index_news">
      <div class="container">
        <div class="item_title">资讯推荐</div>
        <ul class="list">
          <NewItem
            v-for="item in headlineList"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :desc="item.subTitle"
            :hasRead="item.readTimes"
            :datetime="item.created"
            :img="item.cover"
          />
        </ul>
        <div class="more">
          <a href="javascript:void(0)" @click="navGoNewsCenter">
            <span>全部资讯</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndexBanner from "@/components/IndexBanner.vue";
import ClassItem from "@/components/ClassItem.vue";
import RankList from "@/components/RankList.vue";
import IndexVideo from "@/components/IndexVideo.vue";
import NewItem from "@/components/NewItem.vue";
import IndexMenuItem from "@/components/IndexMenuItem.vue";
import httpRequest from "@/api/index.js";

export default {
  name: "Home",
  components: {
    IndexBanner,
    ClassItem,
    RankList,
    IndexVideo,
    NewItem,
    IndexMenuItem,
  },
  data() {
    return {
      // banner下分类导航
      videoBackground: "",
      menuList: [
        {
          type_id: 1,
          type_img: require("../assets/images/icon_tv.png"),
          type_name: "视频",
          list: [],
        },
        {
          type_id: 2,
          type_img: require("../assets/images/icon_audio.png"),
          type_name: "音频",
          list: [],
        },
        {
          type_id: 3,
          type_img: require("../assets/images/icon_data.png"),
          type_name: "报告",
          list: [],
        },
        {
          type_id: 4,
          type_img: require("../assets/images/AI.png"),
          type_name: "AI",
          list: [],
        },
      ],
      // 热门课程图片
      hotImgUrl: require("../assets/images/hot_img.png"),
      // 视频课程图片
      videoImgUrl: require("../assets/images/class_img.png"),
      // 新闻图片
      newImgUrl: require("../assets/images/news_img.png"),
      // 今日热门
      recTagId: 1,
      hotType: "video",
      hotTitle: [
        {
          id: 1,
          name: "视频课程",
          type: "video",
        },
        {
          id: 3,
          name: "投研报告",
          type: "report",
        },
        {
          id: 2,
          name: "音频课程",
          type: "audio",
        },
      ],
      // 热门课程
      hotList: [],
      // 视频课程排行榜
      videoRankList: [],
      // 音频课程排行榜
      audioRankList: [],
      // 资讯推荐
      newsList: [],
      // banner
      indexBanner: [],
      headlineList: [],
      indexVideos: [],
      audioList: [],
      videoSrc: "",
    };
  },
  created() {
    this.getBanner();
    this.getIndexCommodity();
    this.getHeadlineInfo();
    this.getRecomList();
    this.handleGetRinking(1);
    this.handleGetRinking(2);
    this.handleFullVideo();
    this.getClassList(1);
    this.getClassList(2);
    this.getClassList(3);
    this.handleListAi();
  },
  methods: {
    async getClassList(id) {
      const res = await httpRequest.getClassificationList({
        type: id,
      });
      if (res) {
        if (id === 1) this.menuList[0].list = res.data;
        if (id === 2) this.menuList[1].list = res.data;
        if (id === 3) this.menuList[2].list = res.data;
      }
    },
    async handleListAi() {
      const res = await httpRequest.getListAi({
        pageNum: 1,
        pageSize: 6,
      });
      this.menuList[3].list = res.data.list;
    },
    cutoverType(item) {
      this.hotType = item.type;
      this.recTagId = item.id;
      this.getRecomList();
    },
    async getRecomList() {
      const res = await httpRequest.listRecommendCommodity({
        // type : 1视频 3报告
        type: this.recTagId,
      });
      if (res) {
        this.hotList = res.data;
      }
    },
    async getBanner() {
      const res = await httpRequest.getIndexBanner();
      if (res) {
        this.indexBanner = res.data;
      }
    },
    async getIndexCommodity() {
      const res = await httpRequest.getIndexCommodity({
        findAllType: 2,
        pageData: {
          pageNum: 1,
          pageSize: 8,
        },
        typeId: 0,
      });
      if (res) {
        this.indexVideos = res.data.indexVideos;
        this.audioList = res.data.indexPdfs;
      }
    },
    async getHeadlineInfo() {
      const res = await httpRequest.getListInfo({
        findAllType: 2,
        pageData: {
          pageNum: 1,
          pageSize: 4,
        },
        typeId: 0,
      });
      if (res) {
        this.headlineList = res.data;
        if (this.headlineList.length > 5) {
          this.headlineList.length = 5;
        }
      }
    },
    navGoNewsCenter() {
      this.$router.push({
        name: "newsCenter",
      });
    },
    async handleGetRinking(type) {
      const res = await httpRequest.getRankingList({
        pageData: {
          pageNum: 1,
          pageSize: 8,
        },
        type,
      });
      if (res) {
        if (type === 1) {
          this.videoRankList = res.data.list;
        }
        if (type === 2) {
          this.audioRankList = res.data.list;
        }
      }
    },
    async handleFullVideo() {
      const res = await httpRequest.getFullVideo();
      if (res) {
        this.videoSrc = res.data.videoUrl;
        this.videoBackground = res.data.imgUrl;
      }
    },
  },
};
</script>

<style lang="less">
.index_menu {
  height: 100%;
  box-shadow: 0px 15px 18px 0px rgba(0, 0, 0, 0.02);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
  }
}

.item_name {
  display: flex;
  align-items: flex-end;
  h3 {
    display: inline-block;
    line-height: 1;
    font-size: 30px;
    font-weight: normal;
    color: rgba(17, 17, 17, 1);
    white-space: nowrap;
  }
  .tab_list {
    margin-left: 50px;
    li {
      display: inline-block;
      cursor: pointer;
      position: relative;
      font-size: 16px;
      transition: all 0.3s;
      line-height: 30px;
      margin-right: 46px;
      &:last-child {
        margin-right: 0;
      }
      &:after {
        content: "";
        width: 0%;
        height: 3px;
        background: rgba(235, 101, 25, 1);
        position: absolute;
        bottom: 0;
        transform: translateX(-50%);
        left: 50%;
        transition: all 0.3s;
      }
      &.active,
      &:hover {
        color: rgba(235, 101, 25, 1);
        &:after {
          width: 100%;
        }
      }
    }
  }
}

.index_hot {
  margin-top: 38px;
  .class_list {
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 20px;
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
}

.index_video {
  margin-top: 80px;
  .container {
    overflow: hidden;
  }
  .video_list {
    width: 780px;
    float: left;
    .list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 28px;
      li {
        margin-right: 20px;
        margin-bottom: 40px;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
  .rank_list {
    float: right;
    width: 380px;
  }
}

.index_audio {
  margin-top: 45px;
  .container {
    overflow: hidden;
  }
  .audio_list {
    width: 780px;
    float: left;
    .list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 28px;
      li {
        margin-right: 20px;
        margin-bottom: 40px;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
  .rank_list {
    float: right;
    width: 380px;
  }
}

.index_news {
  margin: 80px 10px 100px;
  .item_title {
    font-size: 26px;
    font-weight: bold;
    color: rgba(17, 17, 17, 1);
  }
  .list {
    margin-top: 22px;
    li:last-child {
      border-bottom: none;
    }
  }
  .more {
    margin-top: 30px;
    a {
      display: block;
      width: 174px;
      height: 40px;
      position: relative;
      background: rgba(235, 101, 25, 1)
        url(../assets/images/icon_long_arrow.png) no-repeat 130px center;
      background-size: 36px;
      span {
        width: 116px;
        height: 36px;
        background: #fff;
        display: block;
        position: absolute;
        left: 2px;
        top: 2px;
        text-align: center;
        line-height: 36px;
        color: rgba(235, 101, 25, 1);
        font-size: 18px;
      }
    }
  }
}
</style>
