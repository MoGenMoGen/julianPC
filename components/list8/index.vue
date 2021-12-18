<template>
  <div class="list containerAll"
       :style="myStyle"
  >
    <div class="main" :style="{width:width+'px'}">
      <div class="title" :style="listTitle">
        <p>{{info.title ? info.title : '如何您的企业更数字化'}}</p>

      </div>
      <div class="item" v-for="(item,index) in list"
           :key="index"
           :style="{
             width:listWidth+'px',
             marginLeft:index%myNum>0 ? info.listMargin? info.listMargin+'px' : myMargin+'px' : '0',
             ...listStyle
           }"
      >
        <img :src="item.img"/>
        <p class="nm" :style="titleStyle">{{item.nm}}</p>
        <p class="cont" :style="contStyle">{{item.cont}}</p>
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
  import img6 from './images/6.png'
  export default {
    name: "list8",
    props: ['info','width','bWidth'],
    data() {
      return {
        myMargin:20,
        myNum:3,
        myList:[{
          img:img1,
          nm:'金融/银行/保险系统咨询',
          cont:'我们是专业的银行业IT解决方案和服务提供商',
        },{
          img:img2,
          nm:'ERP开发与实施',
          cont:'助力企业智能管理，赢在数字经济时代',
        },{
          img:img3,
          nm:'网站/APP/小程序开发与运维',
          cont:'专注企业定位，打造具备价值体现的网站及App，助力业务可持续性增长',
        },{
          img:img4,
          nm:'数字化平台及数字化',
          cont:'利用大数据、云计算技术，提供专业的数字化服务，加速数字化转型',
        },{
          img:img5,
          nm:'CRM与SCRM客户管理信息开发与实施',
          cont:'针对不同行业特性，进行业务及产品的全生命周期的管理，驱动企业商业模式创新',
        },{
          img:img6,
          nm:'更多功能',
          cont:'多项功能持续开发中，敬请期待...',
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
          "fontSize" : this.info.titleFontSize ? this.info.titleFontSize+'px' : '18px',
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
           backgroundColor: this.info.listbgColor,
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
          backgroundImage:this.info.bgImg || '',
          "--borderColor": this.info.listBorderColor || '#EAEAEA',
          "--paddingTop":this.info.paddingTop?this.info.paddingTop+'px' : '10px',
          "--paddingBottom":this.info.paddingBottom?this.info.paddingBottom+'px' : '20px',
          "--marginTop":this.info.marginTop?this.info.marginTop+'px' : '0',
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
    padding-bottom: var(--paddingBottom);
    margin: var(--marginTop) auto var(--marginBottom);

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
      .item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        text-align: center;
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
