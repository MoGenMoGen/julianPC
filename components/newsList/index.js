/**
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import {component} from "v-viewer";

import banner from '../banner';
import newsList1 from './list1';


export default (() => {
  const list = [
    banner,newsList1
  ]
  let result = {}
  //循环注册组件
  list.forEach(ele => {
    result[`${ele.name}`] = ele
  })
  return result
})()
