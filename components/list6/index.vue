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
        <img :src="item.imgUrl"/>
      </div>
    </div>

  </div>
</template>
<script>
  import img1 from './images/1.png'
  import img2 from './images/2.png'
  import img3 from './images/3.png'
  import img4 from './images/4.png'
  export default {
    name: "list6",
    props: ['pageInfo','width','bWidth'],
    data() {
      return {
        myNum:4,
        myMargin:0,
        info:{},
        list:[],
        myList:[{
          nm:'定制化',
          cont:'企业专属素材库，更高效完成设计',
          imgUrl:img1
        },{
          nm:'安全',
          cont:'产品包、风格模板等高阶设计能力',
          imgUrl:img2
        },{
          nm:'交付',
          cont:'线上线下，专业培训助力企业成功',
          imgUrl:img3
        },{
          nm:'人员',
          cont:'强大对接能力，提供专业定制服务',
          imgUrl:img4
        },{
          nm:'定制化',
          cont:'企业专属素材库，更高效完成设计',
          imgUrl:img1
        },{
          nm:'安全',
          cont:'产品包、风格模板等高阶设计能力',
          imgUrl:img2
        },{
          nm:'交付',
          cont:'线上线下，专业培训助力企业成功',
          imgUrl:img3
        },{
          nm:'人员',
          cont:'强大对接能力，提供专业定制服务',
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
          paddingBottom: this.info.listPaddingBottom ? this.info.listPaddingBottom+'px' : '30px',
          borderRadius:this.info.radius+'px',
          height:this.info.itemHeight+'px'
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

          "--itemBorderColor":this.info.borderColor,

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
    padding-top: var(--paddingTop);
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
      border-bottom: 1px solid var(--itemBorderColor);
      border-right:1px solid var(--itemBorderColor);
      .item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        border-left:1px solid var(--itemBorderColor);
        border-top: 1px solid var(--itemBorderColor);
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
