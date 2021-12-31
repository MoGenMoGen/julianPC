<template>
  <div id="header" :style="myStyle">
    <div class="headerMain" :style="{ width: width + 'px' }">
      <div class="logo">
        <img :src="info.logo ? info.logo : logo" alt="">
      </div>
      <ul>
        <li v-for="(item,index) in navList" :key="index"
            :class="{active:item.id==pageId || item.active}"
            @mouseenter="mouseItem(item)"
            @mouseleave="item.active=false">
          <p  @click="toPage(item)">{{item.name}}</p>
          <div class="itemList" v-show="item.active && currentList.length">
            <p v-for="(v,i) in currentList" :key="i" @click="toPage(v,item.id)">{{v.name}}1</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import logo from "./images/logo.png";
export default {
  name: "App",
  props: [ "width", "bWidth","navList"],
  data() {
    return {
      currentList:[],
      info:{
        logo,
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
    },
    pageId(){
      return this.$store.state.pageId
    }
  },
  async mounted() {
    this.changeRoute();

  },
  methods: {
    async mouseItem(item){
      if(item.hasChildren){
        this.currentList = await this.api.getMenuNav(item.id);
      }else {
        this.currentList = []
      }
      item.active=true
    },
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
      console.log(this.navList)
    },

    toPage(item,id) {

      console.log(item)
      if(id) {
        this.$store.commit('setPageId',id)
      } else {
        this.$store.commit('setPageId',item.id)
      }
      console.log(this.pageId)
      if (item.types==9){//自定义页面
        window.location.href = "./?pageId="+item.id;
      } else if(item.types == 2) { //栏目
        window.location.href = "./newsList?pageId=" + item.id;
      }else if(item.types == 3){ //内容
        window.location.href = "./pageInfo?pageId=" + item.id;
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
      // flex: 1;
      img{
        max-width: 200px;
      }
    }
    ul{
      li{
        margin-left: 20px;
        display: inline-block;
        height: 50px;
        width: 100px;
        text-align: center;
        line-height: 50px;
        color: var(--fontColor);
        font-size: var(--fontSize);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        position: relative;
        .itemList{
          position: absolute;
          left: 0;
          top:52px;
          width: 100%;
          z-index: 10000;
          background: #ffffff;
          font-size: 14px;
          p:hover{
            color: var(--activeColor);
          }
        }
      }
      li:hover,li.active{
        >p{
          color: var(--activeColor);
        }
        border-bottom: 2px solid var(--activeColor);
      }
    }
  }
}
</style>
