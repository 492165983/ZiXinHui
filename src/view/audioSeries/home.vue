<template>
  <div class="class_main container" v-title data-title="博弈视界 | 音频课程">
    <!-- 筛选 -->
    <ClassFilter
      :isFindAll.sync="isFindAll"
      :classList="classList"
      :feeType.sync="feeType"
      :typeId.sync="typeId"
      :typeSortNum.sync="typeSortNum"
      @feeTypeHandle="feeTypeHandle"
      @sortHandle="sortHandle"
      @handleClassType="handleClassType"
    />
    <!-- 课程 -->
    <ul class="class_list">
      <ClassItem
        v-for="item in videoList"
        type="audio"
        :key="item.id"
        :title="item.title"
        :id="item.id"
        :desc="item.remark"
        :img="item.cover"
      />
    </ul>
    <!-- 分页 -->
    <div class="pagin_main" v-if="total > 1">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :pageSize="8"
        :pagerCount="5"
        :pageCount="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ClassFilter from "@/components/ClassFilter.vue";
import ClassItem from "@/components/ClassItem.vue";
import httpRequest from "@/api/index.js";

export default {
  name: "AudioList",
  components: {
    ClassFilter,
    ClassItem,
  },
  data() {
    return {
      isFindAll: true,
      // 课程图片
      videoImgUrl: require("../../assets/images/class_img.png"),
      videoList: [
        {
          id: 1,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 2,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 3,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 4,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 5,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 6,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 7,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 8,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 9,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 10,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 11,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
        {
          id: 12,
          title: "征战可转债",
          desc: "进可暴力退可保本",
          img: "",
        },
      ],
      // 分类列表
      classList: [],
      feeType: 3,
      typeId: 0,
      typeSortNum: 2,
      total: "",
      pageNum: 1,
    };
  },
  created() {
    this.getClassList();
    if (this.$route.query.typeId) {
      this.isFindAll = false;
      this.typeId = this.$route.query.typeId || 0;
    }
    this.getVideoList();
  },
  methods: {
    async getClassList() {
      const res = await httpRequest.getClassificationList({
        type: 2,
      });
      if (res) {
        this.classList = res.data;
        if (!this.typeId) {
          this.typeId = res.data[0].id;
        }
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getVideoList();
    },
    feeTypeHandle() {
      this.getVideoList();
    },
    handleClassType() {
      this.getVideoList();
    },
    sortHandle() {
      this.getVideoList();
    },
    async getVideoList() {
      const res = await httpRequest.getlistAudioLesson({
        feeType: this.feeType,
        isFindAll: this.isFindAll,
        pageData: {
          pageNum: this.pageNum,
          pageSize: 30,
        },
        sortMethod: this.typeSortNum,
        sortOrder: 1,
        typeId: this.typeId,
      });
      if (res) {
        this.videoList = res.data.list;
        this.total = res.data.totalPage;
      }
    },
  },
};
</script>

<style lang="less">
.class_main {
  margin: 80px auto 100px;
  .class_list {
    margin-top: 40px;
    margin-bottom: 70px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 183px;
      margin-right: 5px;
      margin-bottom: 30px;
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
}
</style>
