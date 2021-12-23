<template>
  <div id="home" >
    
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
    };
  },

  async mounted() {
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
<style lang="less" scoped>
@import url("../assets/css/init.less");
#home {
  width: 100%;
  min-width:1000px;
}
</style>
