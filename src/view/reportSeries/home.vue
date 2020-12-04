<template>
  <div class="report_main container" v-title data-title="博弈视界 | 投研报告">
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

    <!-- <ul class="report_list">
      <ReportItem
        v-for="item in reportList"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :desc="item.remark"
        :datetime="item.created"
        :isNew="item.isNew"
        :url="item.url"
      />
    </ul>-->
    <!-- 课程 -->
    <ul class="class_list">
      <ClassItem
        v-for="item in reportList"
        type="pdf"
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
// import ReportItem from "@/components/ReportItem.vue";
import httpRequest from "@/api/index.js";

export default {
  name: "RepostList",
  components: {
    ClassFilter,
    ClassItem,
    // ReportItem
  },
  data() {
    return {
      isFindAll: true,
      reportList: [],
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
      this.typeId = this.$route.query.typeId;
    }
    this.getAudioList();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAudioList();
    },
    feeTypeHandle() {
      this.getAudioList();
    },
    handleClassType() {
      this.getAudioList();
    },
    sortHandle() {
      this.getAudioList();
    },
    async getClassList() {
      const res = await httpRequest.getClassificationList({
        type: 3,
      });
      if (res) {
        this.classList = res.data;
        if (!this.typeId) {
          this.typeId = res.data[0].id;
        }
      }
    },
    async getAudioList() {
      const res = await httpRequest.getPdfList({
        feeType: this.feeType,
        isFindAll: this.isFindAll,
        pageData: {
          pageNum: this.pageNum,
          pageSize: 16,
        },
        sortMethod: this.typeSortNum,
        sortOrder: 1,
        typeId: this.typeId,
      });
      if (res) {
        // this.watchMode = res.data.watchMode;
        this.serieTitle = res.data.serie;
        if (res.data) {
          this.reportList = res.data.list;
          this.total = res.data.totalPage;
        } else {
          this.reportList = [];
        }
      }
    },
  },
};
</script>

<style lang="less">
.report_main {
  padding: 80px 0 100px;

  .class_list {
    margin-top: 40px;
    margin-bottom: 70px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 183px;
      margin-right: 20px;
      margin-bottom: 30px;
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
  .report_list {
    margin-top: 40px;
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    li:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>
