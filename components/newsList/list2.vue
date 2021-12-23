<template>
  <div class="list containerAll" :style="myStyle">
    <div class="search" v-if="info.titleShow">
    </div>
    <div class="main" :style="{width:width+'px'}">
      <div class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item)" :style="{
             width:listWidth+'px',
             marginRight:index%myNum==0 ? info.itemMargin? info.itemMargin+'px' : myMargin+'px' : '0',
             ...itemStyle
           }">
        <img :src="item.imgUrl" :style="imgStyle"/>
        <div class="item-left">
          <div>
            <p :style="titleStyle">{{item.nm.length>titleLength?item.nm.substring(0,titleLength)+'...':item.nm}}</p>
            <p :style="contStyle">{{item.content.substring(0,contLength)+'...'}}</p>
          </div>
          <p :style="timeStyle">{{item.releTm.substring(0,10)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "newsList2",
    props: ['info', 'width', 'list'],
    data() {
      return {
        myNum: 2,
        myMargin: 50,
        keyWords: '',
      };
    },
    computed: {

      //标题样式
      titleStyle() {
        return {
          "fontSize": this.info.titleFontSize + 'px',
          "color": this.info.titleColor ? this.info.titleColor : '#303030',
          "marginTop": this.info.titleMarginTop ? this.info.titleMarginTop + 'px' : '20px',
          "marginBottom": this.info.titleMarginBottom ? this.info.titleMarginBottom + 'px' : '10px'
        }
      },
      //内容样式
      contStyle() {
        return {
          "fontSize": this.info.contFontSize ? this.info.contFontSize + 'px' : '14px',
          "color": this.info.contColor ? this.info.contColor : '#909090',
          "lineHeight": this.info.contLineHeight ? this.info.contLineHeight + 'px' : '24px',
        }
      },

      //列表宽度
      listWidth() {
        let margin = this.info.listMargin ? parseFloat(this.info.listMargin) : this.myMargin
        let width = (this.width - margin) / this.myNum
        console.log(this.myNum)
        return width
      },
      //列表样式
      itemStyle() {
        return {
          marginBottom: this.info.itemMarginBottom + 'px',
        }
      },
      //总列表的样式
      myStyle() {
        return {
          marginTop: this.info.marginTop + 'px',
          marginBottom: this.info.marginBottom + 'px',
        }
      },
      imgStyle() {
        return {
          marginRight: this.info.imgMarginRight ? this.info.imgMarginRight + 'px' : '20px',
          width: this.info.imgWidth ? this.info.imgWidth + 'px' : '265px',
          height: this.info.imgHeight ? this.info.imgHeight + 'px' : '160px'
        }
      },
      titleLength() {
        return this.info.titleLength ? Number(this.info.titleLength) : 10
      },
      contLength() {
        return this.info.contLength ? Number(this.info.contLength) : 30
      },
      timeStyle() {
        return {
          fontSize: this.info.timeFontSize ? this.info.timeFontSize + 'px' : '14px',
          color: this.info.timeColor ? this.info.timeColor : '#909090',
          lineHeight: this.info.timeLineHeight ? this.info.timeLineHeight + 'px' : '24px',
        }
      }
    },
    async created() {
      console.log(this.info)
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

    .btn {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      p {
        height: 38px;
        line-height: 38px;
        border: 1px solid;
        border-radius: 19px;
        width: auto;
        padding: 0 20px;
      }

    }

    .title {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      p {
        line-height: 1;
      }
    }

    .main {
      overflow: hidden;
      margin: 0 auto;
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      .item {
        display: flex;
        display: -webkit-flex;
        cursor: pointer;
        img {
          // width: 265px;
          // height: 160px;
          // margin-right: 20px;
        }
        .item-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
</style>
