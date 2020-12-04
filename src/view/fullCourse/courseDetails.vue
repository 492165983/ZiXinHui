<template>
  <div class="warp" v-if="courseDetails" v-title :data-title="vidTit">
    <div class="video_details">
      <div class="title">
        <div class="content">
          <router-link to="/fullCourse">
            <span>全部课程</span>
          </router-link>
          <span>></span>
          <span @click="$router.go(-1)">
            {{
            courseDetails.lessonTypeName
            }}
          </span>
          <span>></span>
          <span>{{ vidTit }}</span>
        </div>
      </div>
      <div class="video_center">
        <div class="content">
          <div class="lf_video">
            <video-player
              v-if="videoShow"
              @play="onPlayerPlay($event)"
              class="video-player vjs-custom-skin vjs-big-play-centered"
              ref="videoPlayer"
              x5-video-player-type="h5-page"
              :webkit-playsinline="false"
              :x-webkit-airplay="false"
              :playsinline="playsinline"
              :x5-playsinline="false"
              :options="playerOptions"
            ></video-player>
          </div>
          <div class="rg_list">
            <template v-for="item in courseDetails.lessonDto">
              <ul :key="item.id">
                <h5>{{ item.name }}</h5>
                <li
                  v-for="itemSon in item.detail"
                  :key="itemSon.id"
                  @click="playerVideo(itemSon)"
                >{{ itemSon.title }}</li>
              </ul>
            </template>
          </div>
        </div>
      </div>
      <div class="buy_video">
        <div class="content">
          <div class="lf">
            <h6>{{ courseDetails.title }}</h6>
            <div class="tags">
              <div class="tags1">
                <p>有效期 {{ courseDetails.expired }}个月</p>
                <p>课时 {{ courseDetails.lessonCount }}节</p>
                <p>购买人数 {{ courseDetails.enroll }}人</p>
              </div>
              <p class="p1">|</p>
              <div class="tags1 tags2">
                <p
                  class="cursor"
                  v-if="courseDetails.isCollect"
                  style="color: #f57425"
                  @click="cancelCollectHandle"
                >
                  <img src="../../assets/icon_personal_collect_selected.png" alt />
                  已收藏
                </p>
                <p class="cursor" @click="collectHandle" v-else>
                  <img src="../../assets/icon_personal_collect_unselected.png" alt />
                  收藏
                </p>
                <p class="cursor" @click="shareBtn">
                  <img src="../../assets/icon_video_details_share.png" alt />分享
                </p>
                <p class="cursor" @click="handleAddAdmire" :class="{ ydz: courseDetails.isAdmire }">
                  <img
                    v-if="courseDetails.isAdmire"
                    src="../../assets/icon_video_details_praised.png"
                    alt
                  />
                  <img v-else src="../../assets/icon_video_details_fabulous.png" alt />
                  {{ courseDetails.admireNum }}
                </p>
              </div>
              <p class="p1" v-if="userInfo && userInfo.isSeller">|</p>
              <div class="gift" v-if="userInfo && userInfo.isSeller" @click="classShow = true">
                <img src="../../assets/icon_video_details_give.png" alt />
                赠送课程
              </div>
            </div>
          </div>
          <div class="rg">
            <div class="jg">¥{{ courseDetails.price }}</div>
            <div class="buy_btn">
              <div
                class="btn"
                @click="buyTostBtn()"
                :class="{ buyOk: courseDetails.isBuy }"
              >{{ courseDetails.isBuy ? '已购买' : '立即报名' }}</div>
              <router-link to="/userInfo/myVip" v-if="userInfo && !userInfo.isVip">
                <div class="all_buy cursor">
                  <img src="../../assets/icon_vip_sign.png" alt />
                  解锁全部VIP课程>>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="course">
      <div class="content">
        <div class="item" :class="{ active: tabType === 1 }" @click="tabType = 1">课程概述</div>
        <div class="item" :class="{ active: tabType === 2 }" @click="tabType = 2">课程目录</div>
      </div>
    </div>
    <div class="course_overview" v-if="tabType === 1">
      <div class="content">
        <div class="lf" v-html="courseDetails.desc"></div>
        <div class="rg">
          <h6>关联课程</h6>
          <div class="list">
            <template v-for="item in assList">
              <div class="item" :key="item.id">
                <course-cover :listInfo="item"></course-cover>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="course_chapter" v-if="tabType === 2">
      <div class="content">
        <div class="lf">
          <template v-for="item in courseDetails.lessonDto">
            <ul :key="item.id">
              <div class="tit">
                <img src="../../assets/icon_video_details_curriculum.png" alt />
                <span>{{ item.name }}</span>
              </div>
              <li
                class="cursor"
                v-for="itemSon in item.detail"
                :class="{ li_on: liVal === itemSon.title }"
                :key="itemSon.id"
                @click="playerVideo(itemSon)"
              >
                <span class="sk" v-if="itemSon.isTrail">试看</span>
                <img src="../../assets/icon_video_details_introduction.png" alt />
                <span class="txt">{{ itemSon.title }}</span>
                <div class="s_btn">
                  <font v-if="itemSon.isWatched">● 已完成</font>
                  <p v-else>开始学习</p>
                </div>
              </li>
            </ul>
          </template>
        </div>
        <div class="rg">
          <h6>关联课程</h6>
          <div class="list">
            <template v-for="item in assList">
              <div class="item" :key="item.id">
                <course-cover :listInfo="item"></course-cover>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm_buy" v-if="buyTost">
      <div class="box">
        <div class="img" @click="buyTost = false">
          <img src="../../assets/button_popup_delete.png" alt />
        </div>
        <p>
          购买VIP看视频更划算~
          <br />VIP会员可解锁全部VIP视频，不限次数观看
        </p>
        <div class="btn">
          <div class="bt1" @click="routerTo">坚持购买</div>
          <router-link to="/userInfo/myVip">
            <div class="bt2">去购买VIP</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="fx" v-if="fxS" @click="fxS = false">
      <img src="./../../assets/icon_share.png" alt />
    </div>
    <div class="gift_class" v-if="classShow" @click="classShow = false">
      <div class="box" @click.stop>
        <div class="close" @click="classShow = false">
          <img src="../../assets/button_popup_delete.png" alt />
        </div>
        <div class="login_nav">赠送课程</div>
        <div class="form_box">
          <div class="input_list">
            <div class="input_tit">手机号</div>
            <input type="text" v-model="mobile" placeholder="请输入手机号码" />
          </div>
        </div>
        <div class="submit_btn">
          <button class="btn" :disabled="saves" @click="giftClass">赠送</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import { Toast } from "vant";
import { videoPlayer } from "vue-video-player";
import courseCover from "@/components/courseCover.vue";
import httpRequest from "@/api/index.js";
import { mapState, mapMutations } from "vuex";
import "video.js/dist/video-js.css";
export default {
  components: {
    videoPlayer,
    courseCover,
  },
  computed: {
    ...mapState(["userInfo", "loginShow"]),
    player() {
      return this.$refs.videoPlayer.player;
    },
    playsinline() {
      var ua = navigator.userAgent.toLocaleLowerCase();
      //x5内核
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        return false;
      } else {
        //ios端
        return true;
      }
    },
  },
  watch: {
    loginShow(val) {
      if (val) {
        this.videoShow = false;
      } else {
        this.videoShow = true;
      }
    },
  },
  data() {
    return {
      classShow: false,
      liVal: "",
      mobile: "",
      watchMode: 1,
      watchLessonId: "",
      videoShow: true,
      fxS: false,
      vidTit: "",
      buyTost: false,
      assList: null,
      tabType: 1,
      videoId: null,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        src: "src",
        techOrder: ["html5"],
        poster: "", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          // timeDivider: true,
          durationDisplay: true,
          // remainingTimeDisplay: true,
          // fullscreenToggle: true //全屏按钮
        },
      },
      courseDetails: null,
    };
  },

  mounted() {
    if (this.$route.query.id) {
      this.videoId = parseInt(this.$route.query.id);
    }
    if (this.$route.query.watchMode) {
      this.watchMode = this.$route.query.watchMode;
    }
    const token = localStorage.getItem("token");
    if (token) {
      this.getSigdate();
    }
    this.getDetails();
    window.addEventListener("scroll", this.scrollToTop);
  },
  beforeRouteUpdate(to, from, next) {
    this.videoId = to.query.id;
    this.getDetails();
    next();
  },
  // destroyed() {
  //   window.removeEventListener("scroll", this.scrollToTop);
  // },
  methods: {
    ...mapMutations(["CAHNGELOGINSHOW", "CHANGEFROMURL"]),
    buyTostBtn() {
      this.courseDetails.isBuy ? "" : (this.buyTost = true);
    },
    async getSigdate() {
      const isiOS = !!navigator.userAgent.match(
        /\(i[^;]+;( U;)? CPU.+Mac OS X/
      ); //ios终端
      const res = await httpRequest.getSignature({
        userType: 1,
        url: encodeURIComponent(
          isiOS ? window.initUrl : location.href.split("#")[0]
        ),
      });
      if (res) {
        let that = this;
        wx.config({
          debug: false, // 开启调试模式,
          appId: res.data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
        });
        wx.ready(function () {
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: that.courseDetails.title, // 分享标题
            desc: that.courseDetails.profile, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.courseDetails.cover, // 分享图标
            success: function () {},
          });
          //需在用户可能点击分享按钮前就先调用
          wx.updateTimelineShareData({
            title: that.courseDetails.title, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.courseDetails.cover, // 分享图标
            success: function () {},
          });
        });
      }
    },
    onPlayerPlay(event) {
      if (!this.userInfo) {
        Toast("请先登录");
        this.videoShow = false;
        this.CAHNGELOGINSHOW(true);
        event.pause();
      } else if (this.userInfo) {
        event.play();
        httpRequest.watchLesson({
          id: this.watchLessonId,
        });
      }
    },
    async giftClass() {
      if (this.mobile !== "") {
        const res = await httpRequest.donateCommodity({
          cid: this.courseDetails.id,
          mobile: this.mobile,
        });
        if (res) {
          Toast("赠送成功");
          this.classShow = false;
        }
      } else {
        Toast("手机号码不能为空");
      }
    },
    shareBtn() {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        this.fxS = true;
      } else {
        console.log("1");
      }
    },
    // async sharePlay() {
    //   const res = await httpRequest;
    //   if (res) {
    //     wx.ready(function() {
    //       //需在用户可能点击分享按钮前就先调用
    //       wx.updateAppMessageShareData({
    //         title: "", // 分享标题
    //         desc: "", // 分享描述
    //         link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: "", // 分享图标
    //         success: function() {
    //           // 设置成功
    //         }
    //       });
    //       wx.ready(function() {
    //         //需在用户可能点击分享按钮前就先调用
    //         wx.updateTimelineShareData({
    //           title: "", // 分享标题
    //           link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //           imgUrl: "", // 分享图标
    //           success: function() {
    //             // 设置成功
    //           }
    //         });
    //       });
    //     });
    //   }
    // },
    playerVideo(item) {
      // alert(item);
      if (item.isTrail || this.courseDetails.isBuy) {
        let timer = setInterval(() => {
          let ispeed = Math.floor(-this.scrollTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop =
            this.scrollTop + ispeed;
          if (this.scrollTop === 0) {
            clearInterval(timer);
          }
        }, 16);
        this.liVal = item.title;
        // console.log(this.liVal);

        this.playerOptions.src = item.url;
        this.vidTit = item.title;
        document.title = item.title;

        this.watchLessonId = item.id;
        this.playerOptions.sources = [
          {
            src: item.url,
            type: "video/mp4",
          },
        ];
      } else {
        Toast("暂未购买VIP或视频，无法观看");
      }
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
    },
    routerTo() {
      this.CHANGEFROMURL(location.href);
      this.$router.push({
        name: "submitOrder",
        query: {
          id: this.courseDetails.id,
        },
      });
    },
    async getDetails() {
      const res = await httpRequest.getCommodityById({
        id: this.videoId,
      });
      if (res) {
        this.courseDetails = res.data;
        this.vidTit = res.data.title;
        this.getlistAssociateCommodity(res.data.lessonType, this.videoId);
        this.playerOptions.sources = [
          {
            src: res.data.lessonDto[0].detail[0].url,
            type: "video/mp4",
          },
        ];
        (this.watchLessonId = res.data.lessonDto[0].detail[0].id),
          (this.playerOptions.poster = res.data.cover);
      }
    },
    async getlistAssociateCommodity(lessonType, id) {
      const res = await httpRequest.listAssociateCommodity({
        lessonType,
        id,
      });
      if (res) {
        this.assList = res.data;
      }
    },
    async collectHandle() {
      const res = await httpRequest.collectCommodity({
        id: this.videoId,
      });
      if (res) {
        this.courseDetails.isCollect = true;
      }
    },
    async cancelCollectHandle() {
      const res = await httpRequest.cancelCollectCommodity({
        id: this.videoId,
      });
      if (res) {
        this.courseDetails.isCollect = false;
      }
    },
    async handleAddAdmire() {
      const res = await httpRequest.addAdmire({
        id: this.videoId,
      });
      if (res) {
        this.courseDetails.admireNum++;
        this.courseDetails.isAdmire = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.fx {
  z-index: 4;
  position: fixed;
  padding: 0.533333rem;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  img {
    max-width: 4rem;
  }
}
.gift {
  cursor: pointer;
  width: 92px;
  height: 28px;
  border: 1px solid rgba(166, 166, 166, 1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 5px;
  }
  font-size: 12px;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
}
.ydz {
  color: rgba(245, 116, 37, 1) !important;
}
.video_details {
  background: #191919;
  padding-bottom: 50px;
  .title {
    height: 40px;
    background: rgba(35, 35, 35, 1);
    .content {
      line-height: 40px;
      padding-left: 20px;
      span {
        cursor: pointer;
        font-size: 12px;
        color: #d7d7d7;
      }
    }
  }
  .video_center {
    .content {
      display: flex;
      .lf_video {
        flex: 1;
      }
      .rg_list {
        width: 260px;
        padding: 0 18px;
        height: 530px;
        overflow-y: scroll;
        ul {
          padding: 20px 0;
          border-bottom: 1px solid #292929;
          h5 {
            font-size: 14px;
            font-weight: 400;
            color: rgba(126, 126, 126, 1);
          }
          li {
            cursor: pointer;
            margin: 15px 0 0;
            font-size: 12px;
            font-weight: 400;
            color: rgba(126, 126, 126, 1);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            &.active {
              color: #fff;
            }
          }
        }
        &::-webkit-scrollbar {
          display: none;
          /**/
        }
      }
    }
  }
  .buy_video {
    .content {
      background: rgba(35, 35, 35, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      .lf {
        display: flex;
        flex-direction: column;
        h6 {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 15px;
        }
        .tags {
          display: flex;
          .tags1 {
            display: flex;
          }
          p {
            display: flex;
            align-items: center;
            margin-right: 40px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            img {
              margin-right: 5px;
            }
          }
        }
      }
      .rg {
        display: flex;
        align-items: center;
        .jg {
          margin-right: 20px;
          font-size: 34px;
          font-weight: 400;
          color: rgba(245, 116, 37, 1);
        }
        .buy_btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          .btn {
            cursor: pointer;
            width: 194px;
            height: 54px;
            background: rgba(245, 116, 37, 1);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            &.buyOk {
              background: #4d4d4d;
              color: #a7a7a7;
              cursor: not-allowed;
            }
          }
          .all_buy {
            margin-top: 10px;
            display: flex;
            align-items: center;
            img {
              margin-right: 5px;
            }
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
.course {
  width: 100%;
  height: 76px;
  border-bottom: 2px solid #f8f8f8;
  .content {
    display: flex;
    height: 100%;
    .item {
      cursor: pointer;
      margin-right: 100px;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 3px;
        background: #fff;
        border-radius: 2px;
        bottom: 0;
        left: 0;
      }
      &.active {
        &::after {
          background: rgba(245, 116, 37, 1);
        }
      }
    }
  }
}
.course_overview {
  .content {
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    .lf {
      max-width: 800px;
      ::v-deep img {
        max-width: 100%;
      }
    }
    .rg {
      h6 {
        font-size: 20px;
        color: rgba(60, 60, 60, 1);
        margin: 30px 0;
        font-weight: bold;
      }
    }
  }
}
.course_chapter {
  .content {
    display: flex;
    justify-content: space-between;
    .lf {
      width: 100%;
      max-width: 800px;
      ul {
        .tit {
          display: flex;
          align-items: center;
          margin: 30px 0 20px;
          img {
            margin-right: 15px;
          }
          span {
            font-size: 18px;
            font-weight: bold;
            color: rgba(60, 60, 60, 1);
          }
        }
        li {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          margin: 0 0 12px 40px;
          background: rgba(249, 249, 249, 1);
          .sk {
            width: 52px;
            height: 26px;
            border: 1px solid rgba(245, 116, 37, 1);
            border-radius: 4px;
            display: flex;
            font-size: 14px;
            font-weight: 400;
            color: rgba(245, 116, 37, 1);
            justify-content: center;
            align-items: center;
            margin-right: 10px;
          }
          img {
            margin-right: 5px;
          }
          .txt {
            font-size: 14px;
            font-weight: 400;
            color: rgba(135, 135, 135, 1);
          }
          .s_btn {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            p {
              opacity: 0;
              cursor: pointer;
              width: 86px;
              height: 32px;
              background: rgba(245, 116, 37, 1);
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
            font {
              font-size: 14px;
              font-weight: 400;
              color: rgba(245, 116, 37, 1);
            }
          }
          @media screen and (min-width: 1200px) {
            &:hover {
              background: rgba(255, 241, 233, 1);
              img {
                display: none;
              }
              .txt {
                color: rgba(245, 116, 37, 1);
              }
              .s_btn {
                p {
                  opacity: 1;
                }
              }
            }
          }
          &.li_on {
            background: rgba(255, 241, 233, 1);
            img {
              display: none;
            }
            .txt {
              color: rgba(245, 116, 37, 1);
            }
            .s_btn {
              p {
                opacity: 1;
              }
            }
          }
        }
      }
    }
    .rg {
      h6 {
        font-size: 20px;
        color: rgba(60, 60, 60, 1);
        margin: 30px 0;
        font-weight: bold;
      }
    }
  }
}
.confirm_buy {
  z-index: 3;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  img {
    cursor: pointer;
  }
  .box {
    border-radius: 10px;
    width: 100%;
    max-width: 650px;
    padding: 30px;
    display: flex;
    background: #fff;
    flex-direction: column;
    p {
      width: 100%;
      text-align: center;
      font-size: 16px;
      color: #282828;
      margin: 15px 0 20px;
      line-height: 32px;
    }
  }
  .btn {
    display: flex;
    justify-content: space-around;
    padding: 0 20%;
    .bt1 {
      width: 86px;
      height: 36px;
      border: 1px solid rgba(245, 116, 37, 1);
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ff7748;
      font-size: 14px;
      cursor: pointer;
    }
    .bt2 {
      cursor: pointer;
      width: 86px;
      height: 36px;
      background: #ff7748;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 14px;
    }
  }
}
.gift_class {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 650px;
    height: 380px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: relative;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .close {
      position: absolute;
      top: 30px;
      left: 30px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .login_nav {
      font-size: 20px;
      color: #282828;
    }
    .form_box {
      .input_list {
        display: flex;
        align-items: center;
        .input_tit {
          margin: 0 30px 0 0;
          font-size: 16px;
          white-space: nowrap;
          color: #282828;
        }
        input {
          width: 358px;
          height: 58px;
          background: rgba(247, 247, 247, 1);
          border-radius: 6px;
          box-sizing: border-box;
          border: none;
          outline: none;
          font-size: 16px;
          color: #282828;
          padding: 0 20px;
          &::placeholder {
            font-size: 16px;
            color: #bababa;
          }
        }
      }
    }
    .submit_btn {
      .btn {
        width: 86px;
        height: 36px;
        background: rgba(255, 119, 72, 1);
        border-radius: 6px;
        padding: 0;
        box-sizing: border-box;
        font-size: 14px;
        color: #fff;
        border: none;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .gift {
    margin-top: 0.4rem;
    margin-bottom: 0;
  }
  .video_details {
    padding-bottom: 0.4rem;
    background: #fff;
    .title {
      height: 0.8rem;
      .content {
        background: #fff;
        line-height: 0.8rem;
        padding-left: 0.4rem;
        color: #898989;
        span {
          color: #898989;
          font-size: 0.32rem;
        }
      }
    }
    .video_center {
      .content {
        .rg_list {
          display: none;
        }
      }
    }
    .buy_video {
      .content {
        flex-direction: column;
        align-items: flex-start;
        background: #fff;
        padding: 10px;
        .lf {
          flex: 1;
          h6 {
            font-size: 0.426667rem;
            color: #292929;
            margin-bottom: 0.266667rem;
          }
          .tags {
            flex-direction: column;
            .p1 {
              display: none;
            }
            p {
              margin-right: 0.6rem;
              font-size: 0.32rem;
              img {
                margin-right: 5px;
                max-width: 0.373333rem;
              }
            }
            .tags2 {
              margin-top: 0.266667rem;
              font-size: 0.4rem;
            }
          }
        }
        .rg {
          margin: 0.4rem 0 0 0;
          align-items: center;
          .jg {
            font-size: 0.506667rem;
          }
          .buy_btn {
            .btn {
              position: fixed;
              bottom: 0;
              left: 0;
              z-index: 1;
              width: 100%;
              height: 1.333333rem;
              font-size: 0.4rem;
              border-radius: 0;
            }
            .all_buy {
              color: #ff9600;
            }
          }
        }
      }
    }
  }
  .course {
    height: 1.333333rem;
    .content {
      padding: 0 0.4rem;
      .item {
        margin-right: 0.8rem;
        font-size: 0.373333rem;
      }
    }
  }
  .course_overview {
    padding: 0 0.3rem;
    .content {
      padding: 0.8rem 0;
      flex-direction: column;
      .lf {
        max-width: 100%;
      }
      .rg {
        h6 {
          font-size: 0.426667rem;
          margin: 0.8rem 0 0.4rem;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
  .course_chapter {
    padding: 0 0.3rem;
    .content {
      flex-direction: column;
      .lf {
        width: 100%;
        max-width: 100%;
        ul {
          .tit {
            margin: 0.4rem 0 0.266667rem;
            img {
              margin-right: 0.2rem;
            }
            span {
              font-size: 0.426667rem;
            }
          }
          li {
            padding: 0.266667rem;
            margin: 0 0 12px 0.266667rem;
            .sk {
              width: 1.066667rem;
              height: 0.533333rem;
              font-size: 0.32rem;
              margin-right: 0.133333rem;
            }
            .txt {
              font-size: 0.186667rem;
            }
            .s_btn {
              p {
                opacity: 1;
                width: 2.133333rem;
                height: 0.8rem;
                font-size: 0.373333rem;
              }
              font {
                font-size: 0.373333rem;
              }
            }
          }
        }
      }
      .rg {
        h6 {
          font-size: 0.426667rem;
          margin: 0.8rem 0 0.4rem;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
  .confirm_buy {
    z-index: 3;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
    img {
      cursor: pointer;
    }
    .box {
      border-radius: 0.133333rem;
      p {
        font-size: 0.373333rem;
        margin: 0.2rem 0 0.266667rem;
        line-height: 0.666667rem;
      }
    }
    .btn {
      .bt1 {
        width: 2rem;
        height: 0.933333rem;
        font-size: 0.32rem;
      }
      .bt2 {
        width: 2rem;
        height: 0.933333rem;
        font-size: 0.32rem;
      }
    }
  }
  .gift_class {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      width: 90%;
      height: 5.066667rem;
      border-radius: 0.133333rem;
      padding: 0.533333rem 0;
      .close {
        top: 0.4rem;
        left: 0.4rem;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .login_nav {
        font-size: 0.373333rem;
        color: #282828;
      }
      .form_box {
        .input_list {
          .input_tit {
            margin: 0 0.4rem 0 0;
            font-size: 0.32rem;
          }
          input {
            width: 6rem;
            height: 1.2rem;
            font-size: 0.32rem;
            padding: 0 0.266667rem;
            &::placeholder {
              font-size: 0.32rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .course_overview {
    .content {
      .rg {
        .list {
          .item {
            width: 50%;
            max-width: 50%;
          }
        }
      }
    }
  }
  .course_chapter {
    .content {
      .rg {
        .list {
          .item {
            width: 50%;
            max-width: 50%;
          }
        }
      }
    }
  }
}
</style>
