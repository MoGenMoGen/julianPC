import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = ()=>new Vuex.Store({
  state: {
    pageId:'',  //当前栏目id
  },
  mutations:{
    setPageId:(state,data)=>{
      state.pageId = data
    },
  },
});
export default store
