<template>
  <div class="list containerAll"
       :style="myStyle"
  >
<!--    <div class="title" :style="listTitle">-->
<!--      <p>{{info.title ? info.title : ''}}</p>-->

<!--    </div>-->
    <div class="main" :style="mainStyle">
      <div class="cont" :style="contStyle" v-if="myInfo && myInfo.nm">
        <p v-for="(item,index) in myInfo.nm.split('/n')" :key="index">{{item}}</p>
      </div>
      <div class="tel" :style="telStyle">
        <img :src="myInfo.imgUrl2"/>
        {{myInfo.content}}
      </div>
    </div>

  </div>
</template>
<script>
  import tel from './images/tel.png'
  import bg from './images/bg.png'
  export default {
    name: "list7",
    props: ['pageInfo','width','bWidth'],
    data() {
      return {
        tel,
        bg,
        info:{},
        myInfo: {
          nm:'',
        },
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
      //电话样式
      telStyle(){
        return {
          "backgroundColor" : this.info.telBgColor || '#fff',
          "fontSize" : this.info.titleFontSize ? this.info.titleFontSize+'px' : '24px',
          "color" : this.info.titleColor ? this.info.titleColor : '#14358C',
          "borderRadius" : this.info.telRadius ? this.info.telRadius+'px' : '27px',
          "height":this.info.telHeight ? this.info.telHeight+'px' : '56px',
        }
      },
      //内容样式
      contStyle(){
        return {
          "fontSize" : this.info.contFontSize ? this.info.contFontSize+'px' : '28px',
          "color" : this.info.contColor ? this.info.contColor : '#ffffff',
          "lineHeight" : this.info.contLineHeight ? this.info.contLineHeight+'px' : '40px',
          "paddingBottom":this.info.contPaddingBottom ? this.info.contPaddingBottom+'px' : '32px'
        }
      },

      //总楼层的样式
      myStyle(){
        return {
          width: this.bWidth + 'px',
          backgroundColor:this.info.bgColor || '#ffffff',
          "--marginTop":this.info.marginTop?this.info.marginTop+'px' : '0',
          "--marginBottom":this.info.marginBottom?this.info.marginBottom+'px' : '0',
        }
      },
      //内容样式
      mainStyle(){
        return {
          height:this.info.height ?this.info.height+'px' : '400px',
          backgroundImage: "url('"+this.myInfo.imgUrl+"')"
        }
      }
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
          list = await this.api.getBannerById(this.pageInfo.bindId,1)
        }else { //新闻
          let newsData = await this.api.getNews({
            current:1,
            size:1,
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

        this.myInfo = list2[0]
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
    margin: var(--marginTop) auto var(--marginBottom);
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
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
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-size: cover;
      background-position: top center;
      background-repeat: no-repeat;
      p{
        text-align: center;
      }
      .cont{
        font-weight: bold;
      }
      .tel{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        img{
          margin-right: 10px;
        }
      }
    }
  }
</style>
