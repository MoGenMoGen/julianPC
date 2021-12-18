<template>
  <div class="banner"
       :style="myStyle"
  >
    <el-carousel
      :trigger="this.info.trigger"
      :autoplay = "this.info.autoplay==='true'"
      :indicator-position="this.info.indicatorPosition"
      :interval="parseInt(this.info.interval)"
      :arrow="this.info.arrow"
      :type="this.info.type"
      :loop="this.info.loop==='true'"
      :direction="this.info.direction"
      :height="this.info.height+'px'"
    >
      <el-carousel-item v-for="(item,index) in bannerList" :key="index">
        <div
          class="bannerItem"
        @click="toPage(item)"
        :style="{
          backgroundImage:'url(\''+item.imgUrl+'\')',
        }"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  import bannerImg from './images/banner.png'
export default {
  name: "banner",
  props:['pageInfo',"width", "bWidth"],
  data() {
    return {
      info: {},
       myList:[{
         imgUrl:bannerImg
       }],
      list:null,
    };
  },

  computed:{

    myStyle(){
      return {
        width: this.bWidth + 'px',
        paddingTop:this.info.paddingTop+'px',
        paddingBottom:this.info.paddingBottom+'px',
      }
    },
    bannerList(){
        return this.list && this.length>0 ? this.list : this.myList
    }
  },
  async mounted() {
    this.setData()
  },
  methods: {
    async setData(){
      // console.log('banner')
      this.list = await this.api.getBannerById(this.pageInfo.bindId)
       this.pageInfo.configs.forEach(item=>{
         this.info[item.name] = item.value
       })
    },
    toPage(item){
        if(item.locUrl){
          this.until.href(item.locUrl)
        }
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/init.less");
.banner {
  .bannerItem{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
}
</style>
