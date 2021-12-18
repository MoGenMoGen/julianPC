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
      <el-carousel indicator-position="none" :autoplay="false" :height="info.height+'px'" arrow="always">
        <el-carousel-item v-for="(item,index) in list"
                          :key="index">
          <div class="item" v-for="(v,i) in item"
               @click="toPage(v)"
               :key="i"
               :style="{
                 backgroundImage:'url(\''+v.imgUrl+'\')',
             width:listWidth+'px',
             marginLeft:i>0 ? info.listMargin? info.listMargin+'px' : myMargin+'px' : '0',
             ...itemStyle
           }"
          >
            <img :src="v.imgUrl2"/>
            <p :style="titleStyle" class="itemTitle">{{v.nm}}</p>
            <span></span>
            <p :style="contStyle" class="cont">{{v.content}}</p>
            <p class="btn":style="btnStyle" v-if="info.btnText">{{info.btnText}}</p>
          </div>
        </el-carousel-item>
      </el-carousel>

    </div>

  </div>
</template>
<script>
  import img1 from './images/1.png'
  import img2 from './images/2.png'
  import img3 from './images/3.png'
  import img4 from './images/4.png'
  import bg1 from './images/bg1.png'
  import bg2 from './images/bg2.png'
  import bg3 from './images/bg3.png'
  import bg4 from './images/bg4.png'
  export default {
    name: "list4",
    props: ['pageInfo','width','bWidth'],
    data() {
      return {
        info:{},
        myNum:4,
        myMargin:0,
        list:[],
        myList:[{
          nm:'数字乡村',
          cont:'统筹城乡发展  建设智慧乡村',
          imgUrl:img1,
          bg:bg1,
        },{
          nm:'智能门户',
          cont:'用数字化技术重新定义门户',
          imgUrl:img2,
          bg:bg2,
        },{
          nm:'产业大脑',
          cont:'助力产业协同  赋能产业升级',
          imgUrl:img3,
          bg:bg3,
        },{
          nm:'教育',
          cont:'教育行业IT解决方案服务商、教育 行业数字化专家',
          imgUrl:img4,
          bg:bg4,
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
      this.setData()
    },
    methods: {
      async setData(){
        let list = []
        if(this.pageInfo.types==1){ //广告
          list = await this.api.getBannerById(this.pageInfo.bindId,this.pageInfo.total)
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
        do{
          this.list.push(list2.splice(0, this.myNum))
        }while(list2.length>0)
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
    .title{
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      p{
        line-height: 1;
      }
      p.nm{
        font-weight: bold;
      }
    }
    .main{

      margin: 0 auto;
      margin-top: var(--marginTop);
      margin-bottom:var(--marginBottom);
      overflow: hidden;

      .item{
        height: 100%;
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 5px;
        cursor: pointer;
        background-size: cover;
        text-align: center;
        background-repeat: no-repeat;
        background-position: center center;
        img{
          width: auto;
          max-width: 100%;
          padding-top: var(--contImagePaddingTop);
          padding-bottom: var(--contImagePaddingBottom);
        }
        p{
          padding: 0 30px;
        }
        p.itemTitle{
          padding-top: 40px;
          padding-bottom: 10px;
          line-height: 1;

        }
        span{
          background: var(--itemTitleColor);
          height: 2px;
          width: 36px;
          display: block;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        p.cont{
          height: 40px;
          overflow: hidden;
          flex: 1;
        }
        .btn{
          cursor: pointer;
          margin-bottom: 50px;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
