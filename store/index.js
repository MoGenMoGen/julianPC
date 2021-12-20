import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = ()=>new Vuex.Store({
  state: {
    pageId:'',  //自有商品的购物车
  },
  mutations:{
    setPageId:(state,data)=>{
      state.pageId = data
    },
  },
});
export default store
