<template>
  <div class="list containerAll"
       :style="myStyle"
  >
    <div class="main" :style="{width:width+'px'}">
      <div class="title" :style="listTitle">
        <p>{{info.title ? info.title : '服务介绍'}}</p>

      </div>
      <div class="item" v-for="(item,index) in list"
           :key="index"
           :style="{
             width:listWidth+'px',
             marginLeft:index%myNum>0 ? info.listMargin? info.listMargin+'px' : myMargin+'px' : '0',
             ...listStyle
           }"
      >
        <img :src="item.imgUrl"/>
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
  import img5 from './images/5.png'

  import bg from './images/bg.png'
  export default {
    name: "list2",
    props: ['info','width','bWidth'],
    data() {
      return {
        bg,
        myMargin:20,//默认间距
        myNum:5,//默认一行个数
        myList:[{
          nm:'7x24h五星售后服务',
          cont:'24小时全天侯服务',
          imgUrl:img1
        },{
          nm:'10年沉淀系统稳定',
          cont:'系统稳定无bug',
          imgUrl:img2
        },{
          nm:'一流团队质量保证',
          cont:'精英团队打造',
          imgUrl:img3
        },{
          nm:'多重认证安全可靠',
          cont:'安全无风险',
          imgUrl:img4
        },{
          nm:'专利技术品效更佳',
          cont:'技术可靠有保障',
          imgUrl:img5
        }]
      };
    },
    computed:{
      listTitle(){
        return {
          "fontSize" : this.info.fontSize ? this.info.fontSize+'px' : '28px',
          "color" : this.info.color ? this.info.color : '#ffffff',
          "paddingTop":this.info.listTitlePaddingTop ? this.info.listTitlePaddingTop+'px' : '49px',
          "paddingBottom":this.info.listTitlePaddingBottom ? this.info.listTitlePaddingBottom+'px' : '40px'
        }
      },
      //标题样式
      titleStyle(){
        return {
          "fontSize" : this.info.titleFontSize ? this.info.titleFontSize+'px' : '16px',
          "color" : this.info.titleColor ? this.info.titleColor : '#303030',
          "paddingTop":this.info.titlePaddingTop ? this.info.titlePaddingTop+'px' : '20px',
          "paddingBottom":this.info.titlePaddingBottom ? this.info.titlePaddingBottom+'px' : '10px'
        }
      },
      //内容样式
      contStyle(){
        return {
          "fontSize" : this.info.contFontSize ? this.info.contFontSize+'px' : '14px',
          "color" : this.info.contColor ? this.info.contColor : '#909090',
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
      listStyle(){
        return {
           backgroundColor: this.info.listbgColor || '#fff',
           paddingTop: this.info.listPaddingTop ? this.info.listPaddingTop+'px' : '50px',
           paddingBottom: this.info.listPaddingBottom ? this.info.listPaddingBottom+'px' : '30px'
        }
      },
      height(){
        return this.info.height ? this.info.height : '550'
      },
      //楼层的样式
      myStyle(){
        return {
          width: this.bWidth + 'px',
          backgroundColor:this.info.bgColor || '#F4F4F4',
          backgroundImage:this.info.bg ? "url('"+this.info.bg+"')" : "url('"+this.bg+"')",
          "--paddingTop":this.info.paddingTop?this.info.paddingTop+'px' : 0,
          "--paddingBottom":this.info.paddingBottom?this.info.paddingBottom+'px' : '50px',
          "--marginTop":this.info.marginTop?this.info.marginTop+'px' : '40px',
          "--marginBottom":this.info.marginBottom?this.info.marginBottom+'px' : '0',
        }
      },
      //数据列表
      list(){
        return this.info.list ? this.info.list : this.myList
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
    background-position: top center;
    background-repeat: no-repeat;
    background-size: 100%;
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
        .btn{
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
