/**
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import {component} from "v-viewer";

import banner from '../banner';
import newsList1 from './list1';
import newsList2 from './list2';
import newsList3 from './list3';
import newsList4 from './list4';


export default (() => {
  const list = [
    banner,newsList1,
    newsList3,
    newsList2,
    newsList4,
  ]
  let result = {}
  //循环注册组件
  list.forEach(ele => {
    result[`${ele.name}`] = ele
  })
  return result
})()
