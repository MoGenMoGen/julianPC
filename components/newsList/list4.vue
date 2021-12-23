<template>
  <div class="list containerAll" :style="myStyle">
    <div class="search" v-if="info.titleShow">
    </div>
    <div class="top-nav" :style="{width:width+'px'}" v-if="navList.length>0">
      <p v-for="(item,index) in navList" :class="{active:item.id==chooseId}" @click="choose(item.id)" :key="index">{{item.title}}</p>
    </div>
    <div class="main" :style="{width:width+'px'}">
      <div class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item)" :style="{
             width:width+'px',
             ...itemStyle
           }">
        <img :src="item.imgUrl" :style="imgStyle"/>
        <div class="item-left">
          <div>
            <p :style="titleStyle">{{item.nm.length>titleLength?item.nm.substring(0,titleLength)+'...':item.nm}}</p>
            <p :style="timeStyle">{{item.releTm.substring(0,10)}}</p>
            <p :style="contStyle">{{item.content.substring(0,contLength)+'...'}}</p>
          </div>
          <p :style="viewStyle">查看详情 ></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "newsList4",
    props: ['info', 'width', 'list','pageInfo'],
    data() {
      return {
        myNum: 1,
        myMargin: 50,
        keyWords: '',
        navList: [],
        chooseId: ''
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
          width: this.info.imgWidth ? this.info.imgWidth + 'px' : '305px',
          height: this.info.imgHeight ? this.info.imgHeight + 'px' : '200px'
        }
      },
      titleLength() {
        return this.info.titleLength ? Number(this.info.titleLength) : 60
      },
      contLength() {
        return this.info.contLength ? Number(this.info.contLength) : 100
      },
      timeStyle() {
        return {
          fontSize: this.info.timeFontSize ? this.info.timeFontSize + 'px' : '14px',
          color: this.info.timeColor ? this.info.timeColor : '#909090',
          lineHeight: this.info.timeLineHeight ? this.info.timeLineHeight + 'px' : '18px',
          marginTop: this.info.timeMarginTop ? this.info.timeMarginTop + 'px' : '20px',
          marginBottom: this.info.timeMarginBottom ? this.info.timeMarginBottom + 'px' : '20px',
        }
      },
      viewStyle() {
        return {
          fontSize: this.info.viewFontSize ? this.info.viewFontSize + 'px' : '14px',
          color: this.info.viewColor ? this.info.viewColor : '#909090',
          lineHeight: this.info.viewLineHeight ? this.info.viewLineHeight + 'px' : '18px',
          marginBottom: this.info.viewMarginBottom ? this.info.viewMarginBottom + 'px' : '20px',
        }
      }
    },
    async created() {
      this.navList = await this.api.getListByParentId(this.pageInfo.bindId)
      this.chooseId = this.navList[0].id
      this.choose(this.chooseId)
      console.log(this.navList)
      console.log(this.info)
    },
    methods: {
      toDetail(item){
        this.$emit('toDetail',item)
      },
      choose(id) {
        this.chooseId = id
        this.$emit('choose',id)
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

    .top-nav {
      margin: 30px auto;
      background-color: #ECECEC;
      height: 50px;
      display: flex;
      align-items: center;
      p {
        color: #606060;
        font-size: 16px;
        line-height: 50px;
        padding: 0 30px;
        cursor: pointer;
      }
      .active {
        background-color: #0096E0;
        color: #fff;
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
