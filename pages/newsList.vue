<template>
  <div id="home" >
    <banner :pageInfo="bannerInfo" v-if="bannerInfo.bindId"></banner>
    <div class="newsListMain" :style="{width:width+'px'}">
      <div class="search" v-if="pageInfo.hasSearchBox==1">
        <el-input
          @change="toSearch"
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          v-model="keyWords">
        </el-input>
      </div>
      <component
        :width="width"
        :is="pageInfo.url"
        :info="info"
        :list="list"
        :pageInfo="pageInfo"
        @toDetail="toDetail"
        @choose="choose"
      />
      <div class="pageNo" :style="{textAlign:pageAlign}">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="current"
          :page-size="size"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  //注册自定义组件
  import components from '@/components/newsList';
export default {
  head: {
    script: [],
  },

  components: components,
  data() {
    return {
      bannerInfo:{
        bindId:'',
      },
      pageAlign:'left',
      width:1200,
      pageInfo: {},
      list:[],
      current:1,
      size:12,
      info:{},
      total:0,
      keyWords:'',
    };
  },

  async mounted() {
    this.getInfo()
    this.getWidth()
    window.onresize = () => {
      return (() => {
        this.getWidth();
      })();
    };

  },
  computed:{

  },
  watch: {},
  methods: {
    choose(id) {
      this.getList(id)
    },
    toDetail(item){
      this.until.href('./newsDetail?id='+item.id)
    },
    toSearch(){
      this.current = 1
      this.getList()
    },
    async getInfo(){
        let id = this.until.getQueryString('pageId')
        this.pageInfo = await this.api.getMenuDetail(id)
        this.bannerInfo.bindId = this.pageInfo.advertPosId
        this.pageInfo.configs.forEach(item=>{
          this.info[item.name] = item.value
          this.$set(this.info,item.name,item.value)
        })
        this.size = this.info.total ? parseInt(this.info.total) : 12
        console.log(1111,this.pageInfo.url);
        this.getList()
    },
    //更改一页多少个
    handleSizeChange(val){
        this.size = val
       this.getList()
    },
    //切换页面
    handleCurrentChange(val){
      this.current = val
      this.getList()
    },
    getList(id){
        this.api.getNews({
          current:this.current,
          size:this.size,
          cids_like:id ? id : this.pageInfo.bindId
        }).then(res=>{
          res.records.forEach(item=>{
            let date = item.releTm.split(' ')[0]
            item.year = date.split('-')[0]
            item.month = date.split('-')[1]+'.'+date.split('-')[2]
            item.nm = item.title
            item.content = item.cont.replace(/<\/?[^>]*>/g, "").replace(/&nbsp;/ig, "");
            // item.content = item.content.slice(0,35)+'...'
          })
          this.list = res.records
          this.total = res.total
        })
    },
    getWidth() {
      let width = document.documentElement.clientWidth;
      if (width < 1000) {
        this.width = 1000;
        this.bWidth = 1000;
      }
      if (width >= 1000 && width <= 1200) {
        this.width = 1000;
        this.bWidth = width;
      }
      if (width > 1200) {
        this.width = 1200;
        this.bWidth = width;
      }
    },

  },
};
</script>
<style lang="less">
#home {
}
</style>
<style lang="less" scoped>
@import url("../assets/css/init.less");
#home {
  width: 100%;
  min-width:1000px;
  .newsListMain{
    margin: 0 auto;
  }
  .search{
     display: block;
     width: 285px;
     margin: 30px 0;
  }

}
</style>
