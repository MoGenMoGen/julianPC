<template>
  <div id="header" :style="myStyle">
    <div class="headerMain" :style="{ width: width + 'px' }">
      <div class="logo">
        <img :src="info.logo ? info.logo : logo" alt="">
      </div>
      <ul>
        <li v-for="(item,index) in navList" :key="index" :class="{active:item.active}">{{item.nm}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import logo from "./images/logo.png";
export default {
  name: "App",
  props: [ "width", "bWidth"],
  data() {
    return {
      navList: [
        {
          nm: "首页",
          cd: "home",
          url: "/",
        },{
          nm: "行业",
          cd: "home",
          url: "/home",
        },{
          nm: "新闻",
          cd: "home",
          url: "/home",
        },{
          nm: "产品",
          cd: "home",
          url: "/home",
        },{
          nm: "解决方案",
          cd: "home",
          url: "/home",
        },{
          nm: "关于我们",
          cd: "home",
          url: "/home",
        },
      ],
      logo,
      info:{
        logo:''
      }
    };
  },
  watch: {
    $route(to) {
      this.changeRoute();
    },
  },
  computed:{
    myStyle(){
      return{
        "--fontColor" : this.info.color ? this.info.color : '#606060',
        "--fontSize" : this.info.fontSize ? this.info.fontSize+'px' : '18px',
        "--activeColor":this.info.activeColor ? this.info.activeColor : '#0096E0'
      }
    }
  },
  async mounted() {
    this.changeRoute();

  },
  methods: {
    changeRoute() {
      let path = window.location.pathname
      this.navList.forEach((item,index)=>{
        if(path.indexOf(item.url)!=-1){
          item.active = true
        }else {
          item.active = false
        }
        this.$set(this.navList,index,item)
      })
    },
    async getNav() {
      let data = await this.api.getMenuNav({ parentId: 0 });
      data.forEach((item) => {
        if (item.showPos.indexOf("1") > -1) {
          this.navList.push(item);
        }
      });
    },
    toPage(item) {
      if (item.url) {
        window.location.href = "./index.html";
      } else {
        window.location.href =
          "./list.html#/newList?id=" + item.id + "&nm=" + item.nm;
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import url("../assets/css/init.less");
#header {
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  height: auto;
  .headerMain {
    width: 100%;
    min-width: 1000px;
    margin: 0 auto;
    padding: 8px 0;
    box-sizing: border-box;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    .logo{
      flex: 1;
      img{
        max-width: 200px;
      }
    }
    ul{
      li{
        margin-left: 20px;
        display: inline-block;
        padding: 0 10px 15px;
        color: var(--fontColor);
        font-size: var(--fontSize);
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }
      li:hover,li.active{
        color: var(--activeColor);
        border-bottom: 2px solid var(--activeColor);
      }
    }
  }
  .header-content {
    width: 100%;
    background-color: #1e2d4c;
    .cont-wrap {
      width: 1100px;
      margin: 0 auto;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      ul {
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        flex: 1;
        li {
          list-style: none;
          flex: 1;
          text-align: center;
          cursor: pointer;
          height: 76px;
          line-height: 76px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          p {
            text-align: center;
            flex: 1;
          }
        }
        li:hover {
          text-decoration: underline;
          color: @themeColor;
        }
      }
    }
    .search {
      margin-left: 4%;
      margin-right: 1%;
      input {
        border: 0;
        background-color: #8e95a6;
        padding: 5px 0;
      }
      button {
        cursor: pointer;
        margin-left: 10px;
        padding: 5px;
        border: 0;
        background-color: #000;
        color: #fff;
      }
    }
  }
  .index-bg {
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    .company-logo {
      width: 1200px;
      margin: 0 auto;
      height: 300px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding: 0 1%;
      box-sizing: border-box;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      > p {
        flex: 1;
        text-align: right;
        img {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
