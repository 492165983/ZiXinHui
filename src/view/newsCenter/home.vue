<template>
  <div class="news_main container" v-title data-title="博弈视界 | 资讯中心">
    <ul class="list">
      <NewItem
        v-for="item in newsList"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :desc="item.subTitle"
        :hasRead="item.readTimes"
        :datetime="item.created"
        :img="item.cover"
      />
    </ul>
    <div class="pagin_main" v-if="totalPage > 1">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :pagerCount="5"
        layout="prev, pager, next"
        :pageCount="totalPage"
        :pageSize="6"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import NewItem from "@/components/NewItem.vue";
import httpRequest from "@/api/index.js";

export default {
  name: "News",
  components: {
    NewItem,
  },
  data() {
    return {
      total: "",
      pageNum: 1,
      // 新闻图片
      newImgUrl: require("../../assets/images/news_img.png"),
      newsList: [
        // {
        //   id: 1,
        //   title: "现在学经济，金融，就业前景怎么样？",
        //   desc:
        //     "根据第一手资料，都是第一年毕业25-75税前的估算。欢迎网友补充。当然，由于是我个人的第一手资料可能覆盖不全面，或者代表性上有一定偏差。供大家参考。杜克大学的经济学硕士课程开设在文理学院的经济学系下课程目的是让学生对经济学的定量方法的灵活性来定制程度适合他们未来的目标....",
        //   hasRead: 3256,
        //   datetime: "2019/12/23 12:23",
        //   img: "",
        // },
        // {
        //   id: 2,
        //   title: "现在学经济，金融，就业前景怎么样？",
        //   desc:
        //     "根据第一手资料，都是第一年毕业25-75税前的估算。欢迎网友补充。当然，由于是我个人的第一手资料可能覆盖不全面，或者代表性上有一定偏差。供大家参考。杜克大学的经济学硕士课程开设在文理学院的经济学系下课程目的是让学生对经济学的定量方法的灵活性来定制程度适合他们未来的目标....",
        //   hasRead: 3256,
        //   datetime: "2019/12/23 12:23",
        //   img: "",
        // },
      ],
    };
  },
  mounted() {
    this.fullAll();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fullAll();
    },
    async fullAll() {
      const res = await httpRequest.getThematicList({
        isFindAll: true,
        pageData: {
          pageNum: this.pageNum,
          pageSize: 6,
        },
        typeId: this.typeId,
      });
      if (res) {
        this.newsList = res.data.list;
        this.totalPage = res.data.totalPage;
      }
    },
  },
};
</script>

<style lang="less">
.news_main {
  padding: 40px 0 100px;
  .list {
    margin-bottom: 110px;
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>
