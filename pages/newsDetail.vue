<template>
  <div id="home" :style="{ width: width + 'px' }">
    <div class="left">
      <div class="topbox">
        <div class="title">{{ info.title }}</div>
        <div class="date">{{ info.releTm }}</div>
      </div>
      <div class="main">
        <div class="left_content">
          <div class="btn_share">分享至</div>
          <img src="../img/wx_icon.png" alt="" style="margin-bottom: 20px" />
          <img src="../img/wb_icon.png" alt="" />
        </div>
        <div class="right_content" v-html="info.cont"></div>
      </div>
    </div>
    <div class="right">
      <div class="new_title">新闻推荐</div>
      <div class="new_list">
        <div class="new_item" v-for="(item, index) in newList" :key="index">
          <div class="item_title">{{ item.title }}</div>
          <div class="item_date">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>




<script type="text/ecmascript-6">
//注册自定义组件
import components from "@/components/";
export default {
  head: {
    script: [],
  },

  components: components,
  data() {
    return {
      bWidth: 1200,
      width: 1200,
      name: "",
      info: {
        title: "商汤被迫推迟IPO！美国精准打压再得逞，公告：仍坚定推进上市",
        date: "2021-12-12 18:20:33",
      },
      newList: [
        {
          title: "浙江3地累计确诊138例，严控庙会及大型演出等",
          date: "2021-12-13 11:54",
        },
        {
          title: "浙江3地累计确诊138例，严控庙会及大型演出等",
          date: "2021-12-13 11:54",
        },
        {
          title: "浙江3地累计确诊138例，严控庙会及大型演出等",
          date: "2021-12-13 11:54",
        },
      ],
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  async mounted() {
    this.getWidth();
    this.info = await this.api.getDetail(this.id);
    if(this.info.cont){
      this.info.cont = this.info.cont.replace(
      /<img[^>]*>/gi,
      function (match, capture) {
        return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
      }
    );
    this.info.cont = this.info.cont.replace(
      /<img[^>]*>/gi,
      function (match, capture) {
        return match.replace(
          /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
          'style="max-width:100%;height:auto;"'
        ); // 替换style
      }
    );
    }
    
    console.log(1111, this.info);
    window.onresize = () => {
      return (() => {
        this.getWidth();
      })();
    };
  },
  computed: {},
  watch: {},
  methods: {
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
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/init.less");
#home {
  // min-width: 1000px;
  // overflow: hidden;
  margin: 20px auto;
  display: flex;
  display: -webkit-flex;
  .left {
    width: 75%;
    background: #ffffff;
    box-sizing: border-box;
    overflow: auto;
    margin-right: 20px;
    .topbox {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .title {
        font-size: 36px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303030;
        line-height: 42px;
      }
      .date {
        font-size: 18px;
        font-family: Arial;
        font-weight: 400;
        color: #606060;
        line-height: 42px;
      }
    }
    .main {
      width: 100%;
      padding: 12px 27px 80px;
      box-sizing: border-box;
      display: flex;
      .left_content {
        width: 66px;
        margin-right: 40px;
        .btn_share {
          font-size: 14px;
          color: #909090;
          line-height: 42px;
          text-align: center;
        }
      }
      .right_content {
        width: calc(~"100% - 104px");
      }
    }
  }
  .right {
    // overflow: hidden;
    // flex: 1;
    width: calc(~"25% - 20px");
    background: #fff;
    .new_title {
      font-size: 18px;
      font-weight: bold;
      color: #303030;
      line-height: 42px;
    }

    .new_list {
      .new_item {
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .item_title {
          font-size: 16px;
          color: #606060;
          line-height: 24px;
        }
        .item_date {
          font-size: 12px;
          color: #909090;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
