/**
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import {component} from "v-viewer";

import banner from './banner/';

import list1 from './list1/';
import list2 from './list2/';
import list3 from './list3/';
import list4 from './list4/';
import list5 from './list5/';
import list6 from './list6/';
import list7 from './list7/';
import list8 from './list8/';
import list9 from './list9/';
import list10 from './list10/';
import list11 from './list11/';
import list12 from './list12/';

export default (() => {
  const list = [
    banner,list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12
  ]
  let result = {}
  //循环注册组件
  list.forEach(ele => {
    result[`${ele.name}`] = ele
  })
  return result
})()
