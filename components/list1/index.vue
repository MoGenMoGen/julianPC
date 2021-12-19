<template>
  <div class="list containerAll"
       :style="{...myStyle}"
  >
    <div class="title" v-if="info.titleShow" :style="levelTitle">
      <p v-if="info.title" :style="{
        color:this.info.color,
        fontSize:this.info.fontSize+'px',
        fontWeight:this.info.levelFontWeight==1 ? 'bold':'normal'
      }">{{info.title}}</p>
      <img :src="info.img" v-if="info.img" :style="{paddingTop:this.info.imgPaddingTop+'px',paddingBottom:this.info.imgPaddingBottom+'px'}"/>
      <p v-if="info.title2">{{info.title2}}</p>
    </div>
    <div class="main" :style="{width:width+'px'}">
      <div class="item" v-for="(item,index) in list"
           :key="index"
           :class="{active:item.active}"
           @mousemove="item.active= info.itemActiveBg && info.itemActiveBg!=' ' ? true : false"
           @mouseout="item.active=false"
           :style="{
             width:listWidth+'px',
             marginLeft:index%myNum>0 ? info.listMargin? info.listMargin+'px' : myMargin+'px' : '0',
             ...itemStyle
           }"
      >
        <img :src="item.active && item.imgUrl2 ? item.imgUrl2 : item.imgUrl" v-if="info.itemAlign=='right'" style="float: right"/>
        <img :src="item.active && item.imgUrl2 ? item.imgUrl2 : item.imgUrl" v-else-if="info.itemAlign=='center'" style="margin: 0 auto;"/>
        <img :src="item.active && item.imgUrl2 ? item.imgUrl2 : item.imgUrl" v-else="info.itemAlign=='left'"/>
        <p :style="titleStyle">{{item.nm}}</p>
        <p :style="contStyle">{{item.content}}</p>
        <p :style="btnStyle" class="btn" v-if="info.btnText">{{info.btnText}}</p>
      </div>
    </div>

  </div>
</template>
<script>
  import img1 from './images/1.png'
  import img2 from './images/2.png'
  import img3 from './images/3.png'
  import img4 from './images/4.png'
  export default {
    name: "list1",
    props: ['pageInfo','width','bWidth'],
    data() {
      return {
        myMargin:20,//默认间距
        myNum:4,//默认一行个数
        list:[],
        info:{},
        myList:[{
          nm:'数字营销',
          cont:'智能运维平台、大数据平台开发、商业智能、App开发、ERP',
          imgUrl:img1
        },{
          nm:'Scada系统',
          cont:'一站式运维管理系统，快速高效解决企业增效、增长、管理难题',
          imgUrl:img2
        },{
          nm:'软件开发',
          cont:'企业IT专业合作伙伴，APP开发、微信/小程序开发、网站建设',
          imgUrl:img3
        },{
          nm:'管理咨询',
          cont:'IT咨询 、IT服务、营销推广、云/基础设施的管理、线上营销',
          imgUrl:img4
        }]
      };
    },
    computed:{
      //组件标题总体样式
      levelTitle(){
        return {
          "backgroundColor":this.info.levelTitleBg,
          "fontSize" : this.info.titleFontSize ? this.info.titleFontSize+'px' : '20px',
          "color" : this.info.titleColor ? this.info.titleColor : '#303030',
          "paddingTop":this.info.levelTitlePaddingTop ? this.info.levelTitlePaddingTop+'px' : '20px',
          "paddingBottom":this.info.levelTitlePaddingBottom ? this.info.levelTitlePaddingBottom+'px' : '10px'
        }
      },
      //标题样式
      titleStyle(){
        return {
          "textAlign":this.info.itemAlign,
          "fontSize" : this.info.titleFontSize ? this.info.titleFontSize+'px' : '20px',
          "color" : this.info.titleColor ? this.info.titleColor : '#303030',
          "paddingTop":this.info.titlePaddingTop ? this.info.titlePaddingTop+'px' : '20px',
          "paddingBottom":this.info.titlePaddingBottom ? this.info.titlePaddingBottom+'px' : '10px'
        }
      },
      //内容样式
      contStyle(){
        return {
          "textAlign":this.info.itemAlign,
          "fontSize" : this.info.contFontSize ? this.info.contFontSize+'px' : '14px',
          "color" : this.info.contColor ? this.info.contColor : '#606060',
          "lineHeight" : this.info.contLineHeight ? this.info.contLineHeight+'px' : '24px',
          "paddingBottom":this.info.contPaddingBottom ? this.info.contPaddingBottom+'px' : '32px'
        }
      },
      //了解更多样式
      btnStyle(){
        return {
          "fontSize" : this.info.btnFontSize ? this.info.btnFontSize+'px' : '14px',
          "color" : this.info.btnColor ? this.info.btnColor : '#0096E0'
        }
      },
      //列表宽度
      listWidth(){
        let num = this.info.num ? parseInt(this.info.num) : this.myNum
        let margin = this.info.listMargin ? parseFloat(this.info.listMargin) : this.myMargin
        let width = (this.width-(num-1)*margin)/num
        return width
      },
      //列表样式
      itemStyle(){
        return {
           backgroundColor:this.info.itemBg,
           borderColor: this.info.borderColor,
           paddingBottom: this.info.itemPaddingBottom ? this.info.itemPaddingBottom+'px' : '30px',
           borderRadius:this.info.radius+'px',
           marginBottom: this.info.ItemMarginBottom+'px',
           height:this.info.itemHeight?this.info.itemHeight+'px' : 'auto'
        }
      },
      //总框架的样式
      myStyle(){
        let style = {
          width: this.bWidth + 'px',
          backgroundColor:this.info.bgColor,
          backgroundImage:"url('"+this.info.bgImage+"')",
          paddingTop:this.info.paddingTop+'px',
          paddingBottom:this.info.paddingBottom+'px',
          marginTop:this.info.marginTop+'px',
          marginBottom:this.info.marginBottom+'px',
          "--contPadding":'0 '+this.info.itemPadding+'px',
          "--contImagePaddingTop":this.info.imgPaddingTop+'px',
          "--contImagePaddingBottom":this.info.imgPaddingBottom+'px',
        }
        if(this.info.itemActiveBg){
          style["--itemActiveBg"] = this.info.itemActiveBg
        }
        if(this.info.itemActiveColor){
          style["--itemActiveColor"] = this.info.itemActiveColor
        }
          return style
      },
    },
    async created() {
      this.pageInfo.configs.forEach(item=>{
        this.info[item.name] = item.value
        this.$set(this.info,item.name,item.value)
      })
      this.myNum = this.info.num ? this.info.num : 1
      this.myMargin = parseFloat(this.info.margin)
      this.setData()
    },
    methods: {
      async setData(){
        let list = []
        if(this.pageInfo.types==1){ //广告
          list = await this.api.getBannerById(this.pageInfo.bindId,this.info.total)
        }else { //新闻
          let newsData = await this.api.getNews({
            current:1,
            size:this.info.total,
            cids_like:this.pageInfo.bindId
          })
          newsData.records.forEach(item=>{
            item.nm = item.title
            item.content = item.cont.replace(/<\/?[^>]*>/g, "").replace(/&nbsp;/ig, "");
          })
          list = newsData.records
        }
        list.forEach((item,index)=>{
          item.imgUrl = item.imgUrl ? item.imgUrl.split(',')[0] : ''
          item.imgUrl2 = item.imgUrl2 ? item.imgUrl2.split(',')[0] : ''
          item.active = false
          this.$set(list,index,item)
        })
        this.list = list && list.length>0 ? list : this.myList
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
  .list {
    background-position: top center;
    background-repeat: no-repeat;
    background-size: 100%;
    .title{
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      p{
        line-height: 1;
      }
    }
    .main{
      margin: 0 auto;
      margin-top: var(--marginTop);
      margin-bottom:var(--marginBottom);
      overflow: hidden;
      .item{
        float: left;
        border: 1px solid transparent;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;

        img{
          width: auto;
          max-width: 100%;
          display: block;
          padding-top: var(--contImagePaddingTop);
          padding-bottom: var(--contImagePaddingBottom);
        }
        p{
          width: 100%;
          box-sizing: border-box;
          padding: var(--contPadding);
        }
        .btn{
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .active{
        background-color:var(--itemActiveBg,"inherit")!important;
        p{
          color: var(--itemActiveColor,inherit)!important;
        }
      }
    }
  }
</style>
