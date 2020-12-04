import vipIcon from "@/assets/icon_vip_sign.png";
import loginBox from "@/components/login.vue";
import { Toast, Dialog } from 'vant'
import httpRequest from "@/api/index.js";
import { mapState, mapMutations } from 'vuex'
export const navParams = {
  data() {
    return {
      searchTypeText: '课程',
      searchTypeId: 1,
      searchList: [
        {
          searchType: "课程",
          id: 1
        },
        {
          searchType: "报告",
          id: 3
        },
        {
          searchType: "音频",
          id: 2
        }
      ],
      navList: [
        {
          pathName: "首页",
          url: "/",
          active: true,
          childList: null
        },
        {
          pathName: "产品中心",
          url: "",
          active: false,
          zd: false,
          childList: [
            {
              pathName: "视频课程",
              url: "/fullCourse"
            },
            {
              pathName: "投研报告",
              url: "/reportSeries"
            },
            {
              pathName: "音频课程",
              url: "/audioSeries"
            }
          ]
        },
        {
          pathName: "资讯中心",
          url: "/newsCenter",
          active: false,
          childList: null
        },
        {
          pathName: "个人中心",
          url: "",
          active: false,
          zd: false,
          childList: [
            {
              pathName: "课程学习进度",
              url: "/userInfo/courseProgress"
            },
            {
              pathName: "我的收藏",
              url: "/userInfo/myCollection"
            },
            {
              pathName: "浏览记录",
              url: "/userInfo/borwseRecord"
            },
            {
              pathName: "购买记录",
              url: "/userInfo/purchaseHistory"
            },
            {
              pathName: "我的VIP",
              url: "/userInfo/myVip",
              icon: vipIcon
            },
            {
              pathName: "基本信息",
              url: "/userInfo/basicInfo"
            },
            {
              pathName: "安全设置",
              url: "/userInfo/editPhone"
            }
          ]
        },
        {
          pathName: "联系我们",
          url: "/contact",
          active: false,
          childList: null
        },
      ],
      keyword: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'loginShow'
    ])
  },
  async created() {
    const token = localStorage.getItem('token')
    if (token) {
      const userInfo = await httpRequest.userGetUserBaseInfo();
      this.CHANGEUSERINFO(userInfo.data);
    }
  },
  components: {
    loginBox
  },
  methods: {
    ...mapMutations([
      'CAHNGELOGINSHOW',
      'CHANGEUSERINFO'
    ]),
    selectSearchType(item) {
      this.searchTypeText = item.searchType
      this.searchTypeId = item.id
    },
    loginHandle() {
      this.CAHNGELOGINSHOW(true);
    },
    rouerTo(item) {
      if (item.url !== "" && this.$route.path !== item.url) {
        this.$router.push({ path: `${item.url}` });
        this.navShow = false
      } else if (item.pathName === '产品中心' || item.pathName === '个人中心') {
        item.zd = !item.zd
      }
    },
    async handkeSearchCom() {
      const res = await httpRequest.listCommodityByKeyword({
        keyword: this.keyword,
        typeId: this.searchTypeId,
        pageData: {
          pageNum: 1,
          pageSize: this.searchTypeId === 1 ? 8 : 6
        }
      });
      if (res) {
        if (res.data.list.length !== 0) {
          switch (this.searchTypeId) {
            case 1:
              this.$router.push({
                name: 'fullCourse',
                query: {
                  data: JSON.stringify(res.data)
                }
              });
              break
            case 2:
              this.$router.push({
                name: 'audioSeries',
                query: {
                  id: res.data.list[0].lessonType
                }
              });
              break
            case 3:
              this.$router.push({
                name: 'reportSeries',
                query: {
                  id: res.data.list[0].lessonType
                }
              });
              break
          }
        } else {
          Toast.fail('暂无相关商品')
        }
      }
    },
    rouerToZX() {
      Dialog.confirm({
        width: 280,
        message: '是否注销当前登录账户'
      }).then(() => {
        this.CHANGEUSERINFO(null)
        localStorage.setItem('token', '')
        this.$router.push({ path: `/` });
      }).catch(() => {
        // on cancel
      });
    },
    userCenter() {
      this.$router.push({ path: `/userInfo/basicInfo` });
    }
  }
}
