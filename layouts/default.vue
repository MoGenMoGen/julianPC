<template>
  <div
    id="container"
  >
    <my-header :width="width"
               :bWidth="bWidth"></my-header>
       <nuxt/>
    <myFooter
      :width="width"
      :bWidth="bWidth"
    ></myFooter>
  </div>
</template>
<script>
// import homeTop from "@/components/homeTop";
import myHeader from "@/components/myHeader";
import myFooter from "@/components/myFooter";

import codeBig from "./img/bigcode.png";
import line from "./img/line.png";
export default {
  provide () {
    return {
      width: this.width,
      bWidth: this.bWidth
    };
  },
  data() {
    return {
      width: 0,
      bWidth: 0,
      line,
      ddCode: "",
      currentNav: "",
      currentTab: 0,
      navList: [
        {
          title: "首页",
          cd: "home",
          url: "/",
          showType: 0,
        },
      ],
      key: "",
      maList: [],
      codeBig,
      title: "投稿信息",
      iScur: 4,
      declare: false, //是否是申报页面，是的话头部底部都不显示
      ifHeader: true, //是否显示头部，
      ifTopic: false, //是否专题
    };
  },
  computed: {},
  async mounted() {

    this.changeRoute();
    // this.$nextTick(() => {
      this.getWidth();
    // });
    window.onresize = () => {
      return (() => {
        this.getWidth();
        // this.ifPC();
      })();
    };

  },

  methods: {
    ifPC() {
      let appUrl = "http://zjfyweb.jinkworld.com/";
      // let appUrl = 'http://192.168.0.67:8080/'
      console.log(this.App.IsPC());
      if (!this.App.IsPC()) {
        //不是PC端打开
        if (window.location.pathname === "/zjfy/") {
          //首页
          window.location.href = appUrl;
          //window.location.href='https://fzol.jiaxiangtech.com/wx/index.html'
        }
        if (window.location.pathname.indexOf("newList") > -1) {
          //新闻列表
          if (window.location.search.indexOf("detailId") > -1) {
            window.location.href =
              appUrl +
              "#/list?title=" +
              this.until.getQueryString2("nm") +
              "&id=" +
              this.until.getQueryString2("id");
          } else {
            window.location.href = appUrl + "#/list?title=新媒矩阵";
          }
          // window.location.href = window.location.origin+'/wx/list.html?pid='+this.until.getQueryString2('id')+'&nm='+this.until.getQueryString2('nm')
        }
        if (
          window.location.pathname.indexOf("newList") > -1 &&
          window.location.search.indexOf("detailId") > -1
        ) {
          //新闻详情
          window.location.href =
            appUrl + "#/newsDetail?id=" + this.until.getQueryString2("id");
        }

      }
    },

    getWidth() {
      let width = document.documentElement.clientWidth;
      if (width < 1000) {
        this.width = 1000;
        this.bWidth = 1000;
      }
      if (width >= 1000 && width <= 1200) {
        this.width = 1000;
        this.bWidth = width;
      }
      if (width > 1200) {
        this.width = 1200;
        this.bWidth = width;
      }
      console.log(this.bWidth)
    },

    changeRoute() {
      if (window.location.pathname.indexOf("/topic") > -1) {
        this.ifTopic = true;
        document.getElementsByTagName("html")[0].style.height = "100%";
      } else {
        this.ifTopic = false;
      }
      if (window.location.pathname.indexOf("/declare") > -1) {
        this.declare = true;
        document.getElementsByTagName("html")[0].style.height = "100%";
      } else {
        this.declare = false;
      }
    },
  },
  components: {
    myHeader,
    myFooter,
  },
  watch: {
    $route(to) {
      this.changeRoute();
    },
  },
};
</script>

<style lang="less" scoped>
@base: 18rem;
@import url("../assets/css/init.less");

#container {
  // background: url("./img/bg.png") repeat center;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  min-width:1000px;
}
</style>
