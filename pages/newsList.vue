<template>
  <div id="home" >
    <banner :pageInfo="bannerInfo" v-if="bannerInfo.bindId"></banner>
    <component
      :width="width"
      :is="pageInfo.url"
      :info="info"
      :list="list"
    />

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
      width:1200,
      pageInfo: {},
      list:[],
      current:1,
      size:12,
      info:{},
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
    async getInfo(){
        let id = this.until.getQueryString('pageId')
        this.pageInfo = await this.api.getMenuDetail(id)
        this.bannerInfo.bindId = this.pageInfo.advertPosId
        this.pageInfo.configs.forEach(item=>{
          this.info[item.name] = item.value
          this.$set(this.info,item.name,item.value)
        })
        this.size = this.info.total ? this.info.total : 12

        this.getList()
    },
    getList(){
        this.api.getNews({
          current:this.current,
          size:this.size,
          cids_like:this.pageInfo.bindId
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
}
</style>

