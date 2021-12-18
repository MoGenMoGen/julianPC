<template>
  <div id="footer">
    <div class="main" :style="{width:width+'px'}">
      Copyight©2004-2019  宁波聚联科技有限公司

    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  props: ["width", "bWidth"],
  data() {
    return {
      // img:[],
    };
  },
  mounted() {
    // this.cnzz()
    this.getImg();

  },
  methods: {
    async getImg() {
      // this.img = await this.api.getAdr('PAGOFFICE')
    },
    toPage(url) {
      this.until.href(url);
    },
    toWebMap() {
      this.$router.push({
        path: "/webMap",
      });
    },
    cnzz() {
      var cnzz_protocol =
        "https:" == document.location.protocol ? "https://" : "http://";
      // document.write(unescape("%3Cspan id='cnzz_stat_icon_1278902410'%3E%3C/span%3E%3Cscript src='"+cnzz_protocol+"+v1.cnzz.com/z_stat.php%3Fid%3D1278902410%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"))
      const script = document.createElement("script");
      let html = `document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1278902410\'%3E%3C/span%3E%3Cscript src=\'${cnzz_protocol}v1.cnzz.com/z_stat.php%3Fid%3D1278902410%26show%3Dpic\' type=\'text/javascript\'%3E%3C/script%3E"))`;
      script.language = "JavaScript";
      script.innerHTML = html;
      // document.getElementById('cnzz').appendChild(script)
    },

  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/init.less");
@import url("../assets/css/config.less");

#footer {
  background: #ffffff;
  color: #666;
  .main{
    margin: 40px auto;
    text-align: center;
  }
}
</style>

