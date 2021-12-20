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
          <span>{{item.month}}</span>
          {{item.year}}
        </p>
        <img :src="item.active && item.imgUrl2 ? item.imgUrl2 : item.imgUrl"/>
        <p :style="titleStyle">{{item.nm}}</p>
        <p :style="contStyle">{{item.content}}</p>
      </div>
    </div>
    <div class="btn">
      <p @click="toPage()"  :style="btnStyle">查看更多 ></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "newsList1",
    props: ['info','width','list'],
    data() {
      return {
        myNum:4,
        myMargin:20,
      };
    },
    computed:{

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
          height: this.info.itemHeight ? this.info.itemHeight+'px' : 'auto',
          marginBottom: this.info.itemMarginBottom+'px',
          backgroundColor:this.info.itemBg,
          borderColor: this.info.borderColor,
          paddingBottom: this.info.itemPaddingBottom ? this.info.itemPaddingBottom+'px' : '30px',
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

      this.myNum = this.info.num ? this.info.num : 1
      this.myMargin = parseFloat(this.info.margin)
      // console.log(this.info)

    },
    methods: {
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
