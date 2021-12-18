<template>
  <div class="list containerAll"
       :style="myStyle"
  >
    <div class="title" v-if="info.titleShow" :style="levelTitle">
      <p v-if="info.title" :style="{fontWeight:this.info.levelFontWeight==1 ? 'bold':'normal',color:this.info.color,fontSize:this.info.fontSize+'px'}">{{info.title}}</p>
      <img :src="info.img" v-if="info.img" :style="{paddingTop:this.info.imgPaddingTop+'px',paddingBottom:this.info.imgPaddingBottom+'px'}"/>
      <p v-if="info.title2">{{info.title2}}</p>
    </div>
    <div class="main" :style="{width:width+'px'}">

      <div class="item" v-for="(item,index) in list"
           :key="index"
           :style="{
             width:listWidth+'px',
             marginLeft:index%myNum>0 ? info.listMargin? info.listMargin+'px' : myMargin+'px' : '0',
             ...itemStyle
           }"
      >
        <p class="date">
          <span>07.07</span>
          2021
        </p>
        <img :src="item.active && item.imgUrl2 ? item.imgUrl2 : item.imgUrl"/>
        <p :style="titleStyle">{{item.nm}}</p>
        <p :style="contStyle">{{item.content}}</p>
      </div>
    </div>
    <div class="btn" :style="btnStyle">
      <p @click="toPage()">查看更多 ></p>
    </div>
  </div>
</template>
<script>
  import img1 from './images/1.png'
  import img2 from './images/2.png'
  import img3 from './images/3.png'
  import img4 from './images/4.png'
  export default {
    name: "list5",
    props: ['pageInfo','width','bWidth'],
    data() {
      return {
        myNum:4,
        myMargin:20,
        info:{},
        list:[],
        myList:[{
          nm:'曾因涨价被北大抵制的中国知网',
          cont:'曾因频繁涨价被北京大学图书馆、武汉理工大 学图书馆抵制的中国知网，栽在了中南...',
          imgUrl:img1
        },{
          nm:'抖音回应两员工收钱帮人上热搜...',
          cont:'11月30日，红星资本局从裁判文书网获悉，字 节跳动两名员工王某迪与张某迎因非法收...',
          imgUrl:img2
        },{
          nm:'30年前，钱学森为什么将VR译为...',
          cont:'1990年11月27日，钱学森给时任国家863计划 智能计算机专家组组长、同时也是自己的',
          imgUrl:img3
        },{
          nm:'36氪独家 字节跳动2021广告收入...',
          cont:'11月23日，36氪从多个信源处了解到，字节跳 动今年上半年完成广告营收约1150亿元人...',
          imgUrl:img4
        }]
      };
    },
    computed:{
      //组件标题总体样式
      levelTitle(){
        return {
          "background": this.info.levelTitleBg,
          "fontSize" : this.info.titleFontSize ,
          "color" : this.info.titleColor,
          "paddingTop":this.info.levelTitlePaddingTop+'px' ,
          "paddingBottom":this.info.levelTitlePaddingBottom+'px'
        }
      },
      //标题样式
      titleStyle(){
        return {
          "textAlign":this.info.itemAlign,
          "fontSize" : this.info.titleFontSize+'px',
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
          paddingBottom: this.info.listPaddingBottom ? this.info.listPaddingBottom+'px' : '30px',
          borderRadius:this.info.radius+'px'
        }
      },
      //总框架的样式
      myStyle(){
        return {
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
          "--itemActiveBg":this.info.itemActiveBg ? this.info.itemActiveBg : this.info.itemBg,
          "--itemActiveColor":this.info.itemActiveColor ? this.info.itemActiveColor :this.info.titleColor,
          "--itemTitleColor":this.info.titleColor,
        }
      },
    },
    async created() {
      this.pageInfo.configs.forEach(item=>{
        this.info[item.name] = item.value
        this.$set(this.info,item.name,item.value)
      })
      this.myNum = this.info.num ? this.info.num : 1
      this.myMargin = parseFloat(this.info.margin)
      // console.log(this.info)

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
        let list2 = list && list.length>0 ? list : this.myList
        list2.forEach(item=>{
          item.nm = item.nm.length > 15 ? item.nm.slice(0,15)+'...' : item.nm
          item.content = item.content.length > 40 ? item.content.slice(0,40)+'...' : item.content
        })
        this.list = list2
        // console.log(this.list)
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
    .btn{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      p{
        height: 38px;
        line-height: 38px;
        border: 1px solid;
        border-radius: 19px;
        width: auto;
        padding: 0 20px;
      }

    }
    .title{
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      p{
        line-height: 1;
      }
    }
    .main{
      overflow: hidden;
      margin: 0 auto;
      .item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        cursor: pointer;
        .date{
          color: #909090;
          font-size: 14px;
          padding-bottom: 8px;
          span{
            color: #606060;
            font-size: 24px;
            display: block;
            padding-bottom: 8px;
          }
        }
        img{
          width: auto;
          max-width: 100%;
        }


      }
    }
  }
</style>
