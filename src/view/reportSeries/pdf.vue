<template>
  <div class="pdf">
    <div class="content">
      <pdf style="width: 100%" :src="src"></pdf>
    </div>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: { pdf },
  data() {
    return {
      fileType: "pdf", // 文件类型
      src: "" // pdf文件地址
    };
  },
  created() {
    this.src = this.$route.query.url;
  }
};
</script>

<style lang="less">
.annotationLayer {
  transform: scale(1) !important;
}
</style>