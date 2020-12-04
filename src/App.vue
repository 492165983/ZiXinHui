<template>
  <div id="app" @click="showD">
    <head-nav></head-nav>
    <app-head-nav></app-head-nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view></router-view> -->
    <!-- v-wechat-title="$route.meta.title" -->
    <footer-mod></footer-mod>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import headNav from "@/components/headNav.vue";
import appHeadNav from "@/components/webAppNav.vue";
import footerMod from "@/components/footer.vue";
export default {
  name: "app",
  components: {
    headNav,
    appHeadNav,
    footerMod,
  },
  methods: {
    ...mapMutations(["CHANGESERCHTYPE"]),
    showD() {
      this.CHANGESERCHTYPE(false);
    },
  },
};
</script>

<style>
@import url(./style/reset.css);
@import url(./style/global.less);
@import url("./style/auto.css");
</style>
