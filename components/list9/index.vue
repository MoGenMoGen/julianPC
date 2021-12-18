<template>
  <div class="list containerAll"
       :style="myStyle"
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
    <div class="main" :style="{width:width+'px',height: parseFloat(info.itemHeight)*2+parseFloat(info.itemMarginBottom)+'px'}">
      <div class="mainLeft" :style="{width:listWidth+'px'}"  v-if="list.length>0">
        <img :src="list[0].imgUrl"/>
        <div class="mainLeftMain" :style="leftStyle">
          <p class="mainLeftNm" :style="leftTitle">{{list[0].nm}}</p>
          <p class="mainLeftCont" :style="leftCont">{{list[0].content}}</p>
        </div>
      </div>
      <div class="mainRight">
        <div class="item" v-for="(item,index) in list"
             :key="index"
             :style="{
             width:listWidth*3/myNum+'px',
             marginLeft: myMargin+'px',
             marginBottom: index-1>myNum ? 0 : info.itemMarginBottom+'px',
             ...itemStyle
           }"
        >
          <p :style="titleStyle" class="nm">{{item.nm}}<span v-if="info.tipText" :style="tipStyle">{{info.tipText}}</span></p>
          <p :style="contStyle">{{item.content}}</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import img from './images/img.png'
  //行业解决方案
  export default {
    name: "list9",
    props: ['pageInfo','width','bWidth'],
    data() {
      return {
        myNum:3,
        myMargin:20,
        img,
        list:[],
        info:{},
        myList:[{
          nm:'定制化',
          cont:'企业专属素材库，更高效完成设计',
        },{
          nm:'安全',
          cont:'产品包、风格模板等高阶设计能力',
        },{
          nm:'交付',
          cont:'线上线下，专业培训助力企业成功',
        },{
          nm:'人员',
          cont:'强大对接能力，提供专业定制服务',
        },{
          nm:'定制化',
          cont:'企业专属素材库，更高效完成设计',
        },{
          nm:'安全',
          cont:'产品包、风格模板等高阶设计能力',
        }]
      };
    },
    computed:{
      //标签样式
      tipStyle(){
        return {
          backgroundColor : this.info.tipBgColor,
          fontSize :this.info.tipFontSize+'px',
          color:this.info.tipColor,
          width:this.info.tipWidth+'px',
          height:this.info.tipHeight+'px',
          lineHeight:this.info.tipHeight+'px',
          borderRadius: this.info.tipRadius+'px',
          top:this.info.tipTop+'px',
          right:this.info.tipRight+'px'
        }
      },
      //左边主体样式
      leftStyle(){
        return {
          backgroundColor:this.info.leftBgColor,
          padding:this.info.leftPadding
        }
      },
      //左边标题
      leftTitle(){
        return{
          fontSize:this.info.leftTitleFontSize+'px',
          color:this.info.leftTitleColor,
          fontWeight: this.info.leftTItleWeight=='1' ? 'bold' : 'normal',
          paddingBottom : this.info.leftTitlePaddingBottom+'px'
        }
      },
      //左边内容
      leftCont(){
        return{
          fontSize:this.info.leftContFontSize+'px',
          color:this.info.leftContColor,
          lineHeight: this.info.leftContLineHeight+'px'
        }
      },
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

      //列表宽度
      listWidth(){
        let num = this.info.num ? parseInt(this.info.num) : this.myNum
        let margin = this.info.listMargin ? parseFloat(this.info.listMargin) : this.myMargin
        let width = (this.width-num*margin)/4    //左右比是1：3
        return width
      },
      //列表样式
      itemStyle(){
        return {
          textAlign:this.info.itemAlign,
          backgroundColor:this.info.itemBg,
          borderColor: this.info.borderColor,
          padding: '0 '+this.info.listPaddingBottom+'px '+this.info.listPaddingBottom+'px',
          borderRadius:this.info.radius+'px',
          height:this.info.itemHeight?this.info.itemHeight+'px' : 'auto'
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
        }
      },
    },
    async created() {
      this.pageInfo.configs.forEach(item=>{
        this.info[item.name] = item.value
        this.$set(this.info,item.name,item.value)
      })
      // console.log(this.info)
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
      p{
        line-height: 1;
      }
    }
    .main{
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      display: -webkit-flex;
      .mainLeft{
        overflow: hidden;
        img{
          width: auto;
          max-width: 100%;
          display: block;
        }
        .mainLeftMain{
          box-sizing: border-box;
          overflow: hidden;

        }
      }
      .mainRight{
        flex: 1;
        overflow: hidden;
        .nm{
          position: relative;
          span{
            position: absolute;
            display: block;
            right: 0;
            top: 0;
            text-align: center;
          }
        }
      }
      .item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;
        border-left:1px solid var(--borderColor);
        border-top: 1px solid var(--borderColor);
        img{
          width: auto;
          max-width: 100%;
        }
      }
    }
  }
</style>
