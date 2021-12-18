<template>
  <div id="home" >
    <component
      :width="width"
      :bWidth="bWidth"
      v-for="(item,index) in pageList"
      :key="index"
      :is="item.url"
      :pageInfo="item"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  //注册自定义组件
  import components from '@/components/';
export default {
  head: {
    script: [],
  },

  components: components,
  data() {
    return {
      bWidth:1200,
      width:1200,
      name: "",
      pageList:[{
        name:'banner',
        info:{}
      },{
        name:'list1',
        info:{}
      },{
        name:'list2',
        info:{}
      },{
        name:'list3',
        info:{}
      },{
        name:'list4',
        info:{}
      },{
        name:'list5',
        info:{}
      },{
        name:'list6',
        info:{}
      },{
        name:'list7',
        info:{}
      },{
        name:'list8',
        info:{}
      },{
        name:'list9',
        info:{}
      },{
        name:'list10',
        info:{}
      },{
        name:'list11',
        info:{}
      },{
        name:'list12',
        info:{}
      }],
      banner: [],
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
        this.pageList = await this.api.getPageInfo(1)
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

