<template>
  <div class="list containerAll"
       :style="myStyle"
  >
    <div class="search" v-if="info.titleShow">

    </div>
    <div class="main" :style="{width:width+'px'}">

      <div class="item" v-for="(item,index) in list"
           @click="toDetail(item)"
           :key="index"
           :style="{
             width:listWidth+'px',
             marginLeft:index%myNum>0 ? info.itemMargin? info.itemMargin+'px' : myMargin+'px' : '0',
             ...itemStyle
           }"
      >
        <p class="date">
          <span>{{item.month}}</span>
          {{item.year}}
        </p>
        <img :src="item.imgUrl" :style="imgStyle"/>
        <p :style="titleStyle">{{item.nm}}</p>
        <p :style="contStyle">{{item.content.substring(0,35)}}</p>
      </div>
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
        keyWords:'',
      };
    },
    computed:{
      //图片样式
      imgStyle(){
        return {
          "height" : parseFloat(this.info.imgHeight) ? this.info.imgHeight+'px' : 'auto',
        }
      },
      //标题样式
      titleStyle(){
        return {
          "fontSize" : this.info.titleFontSize+'px',
          "color" : this.info.titleColor ? this.info.titleColor : '#303030',
          "paddingTop":this.info.titlePaddingTop ? this.info.titlePaddingTop+'px' : '20px',
          "paddingBottom":this.info.titlePaddingBottom ? this.info.titlePaddingBottom+'px' : '10px'
        }
      },
      //内容样式
      contStyle(){
        return {
          "fontSize" : this.info.contFontSize ? this.info.contFontSize+'px' : '14px',
          "color" : this.info.contColor ? this.info.contColor : '#606060',
          "lineHeight" : this.info.contLineHeight ? this.info.contLineHeight+'px' : '24px',
        }
      },

      //列表宽度
      listWidth(){
        let num = this.info.num ? parseInt(this.info.num) : this.myNum
        let margin = this.info.itemMargin ? parseFloat(this.info.itemMargin) : this.myMargin
        let width = (this.width-(num-1)*margin)/num
        return width
      },
      //列表样式
      itemStyle(){
        return {
          height: parseFloat(this.info.itemHeight) ? this.info.itemHeight+'px' : 'auto',
          marginBottom: this.info.itemMarginBottom+'px',
          backgroundColor:this.info.itemBg,
          borderColor: this.info.borderColor,
          paddingBottom: this.info.itemPaddingBottom ? this.info.itemPaddingBottom+'px' : '30px',
          borderRadius:this.info.radius+'px'
        }
      },
      //总列表的样式
      myStyle(){
        return {
          marginTop:this.info.marginTop+'px',
          marginBottom:this.info.marginBottom+'px',

        }
      },
    },
    async created() {

      this.myNum = this.info.num ? this.info.num : 1
      this.myMargin = parseFloat(this.info.margin)
      // console.log(this.info)
      console.log(this.list)

    },
    methods: {
      toDetail(item){
        this.$emit('toDetail',item)
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
        overflow: hidden;
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
          object-fit: cover;
        }


      }
    }
  }
</style>
