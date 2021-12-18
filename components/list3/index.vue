<template>
  <div class="list containerAll"
       :style="myStyle"
  >
    <div class="main" :style="{width:width+'px'}">
      <div class="title" :style="listTitle">
        <p>{{info.title ? info.title : '项目解决方案'}}</p>

      </div>
      <div class="item" v-for="(item,index) in list"
           :key="index"
           @mousemove="item.active=true"
           @mouseout="item.active=false"
           :style="{
             width:listWidth+'px',
             marginLeft:index%myNum>0 ? info.listMargin? info.listMargin+'px' : myMargin+'px' : '0',
             ...listStyle
           }"
      >
        <img :src="item.active && item.imgUrl2 ? item.imgUrl2 : item.imgUrl"/>
        <p :style="titleStyle">{{item.nm}}</p>
        <p :style="contStyle">{{item.cont}}</p>
      </div>
    </div>

  </div>
</template>
<script>
  import img1 from './images/1.png'
  import img2 from './images/2.png'
  import img3 from './images/3.png'
  import img4 from './images/4.png'
  import img1active from './images/1active.png'
  import img2active from './images/2active.png'
  import img3active from './images/3active.png'
  import img4active from './images/4active.png'
  export default {
    name: "list3",
    props: ['info','width','bWidth'],
    data() {
      return {
        myNum:4,
        myMargin:20,
        myList:[{
          nm:'定制化',
          cont:'企业专属素材库，更高效完成设计',
          imgUrl:img1,
          imgUrl2:img1active,
          active:false,
        },{
          nm:'安全',
          cont:'产品包、风格模板等高阶设计能力',
          imgUrl:img2,
          imgUrl2:img2active,
          active:false,
        },{
          nm:'交付',
          cont:'线上线下，专业培训助力企业成功',
          imgUrl:img3,
          imgUrl2:img3active,
          active:false,
        },{
          nm:'人员',
          cont:'强大对接能力，提供专业定制服务',
          imgUrl:img4,
          imgUrl2:img4active,
          active:false,
        }]
      };
    },
    computed:{
      listTitle(){
        return {
          "fontSize" : this.info.fontSize ? this.info.fontSize+'px' : '28px',
          "color" : this.info.color ? this.info.color : '#303030',
          "paddingTop":this.info.listTitlePaddingTop ? this.info.listTitlePaddingTop+'px' : '29px',
          "paddingBottom":this.info.listTitlePaddingBottom ? this.info.listTitlePaddingBottom+'px' : '40px'
        }
      },
      //标题样式
      titleStyle(){
        return {
          "fontSize" : this.info.titleFontSize ? this.info.titleFontSize+'px' : '20px',
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
      listStyle(){
        return {
           backgroundColor: this.info.listbgColor || '#ffffff',
           borderColor: this.info.listBorderColor || '#EAEAEA',
           paddingTop: this.info.listPaddingTop ? this.info.listPaddingTop+'px' : '20px',
           paddingBottom: this.info.listPaddingBottom ? this.info.listPaddingBottom+'px' : '20px'
        }
      },
      height(){
        return this.info.height ? this.info.height : '550'
      },
      //总楼层的样式
      myStyle(){
        return {
          width: this.bWidth + 'px',
          backgroundColor:this.info.bgColor || '#F4F4F4',

          "--paddingTop":this.info.paddingTop?this.info.paddingTop+'px' : '10px',
          "--paddingBottom":this.info.paddingBottom?this.info.paddingBottom+'px' : '50px',
          "--marginTop":this.info.marginTop?this.info.marginTop+'px' : '0',
          "--marginBottom":this.info.marginBottom?this.info.marginBottom+'px' : '0',
          "--listActiveBgColor":this.info.listActiveBgColor?this.info.listActiveBgColor : '#0096E0',
          "--listActiveFontColor":this.info.listActiveFontColor?this.info.listActiveFontColor : '#ffffff',
        }
      },
      //数据列表
      list(){
        let list = this.info.list ? this.info.list : this.myList
        return list
      }
    },
    async mounted() {

    },
    methods: {
      toPage(){

      }
    },
  };
</script>

<style lang="less" scoped>
  @import url("../../assets/css/init.less");
  .list {
    .main{

      margin: var(--marginTop) auto var(--marginBottom);
      overflow: hidden;
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
      .item{
        float: left;
        border: 1px solid;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-direction: column;
        border-radius: 5px;
        cursor: pointer;
        img{
          width: auto;
          max-width: 100%;
        }
        p{
          padding: 0 30px;
        }

        &:hover{
          background-color:var(--listActiveBgColor)!important;
          p{
            color: var(--listActiveFontColor)!important;
          }
        }

      }
    }
  }
</style>
