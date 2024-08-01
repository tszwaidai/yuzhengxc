import './assets/main.css'
import dataV from '@jiaminghi/data-view'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:9090';

app.config.globalProperties.$axios = axios;

app.use(dataV)
app.use(createPinia())
app.use(router)
// app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
})
// app.use(BaiduMap, {
//     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//     ak: 'cd1PcyT5FsmcHm3LuPoSy7yLvwfQoSwc',
//     // v:'2.0',  // 默认使用3.0
//     // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
// });

app.mount('#app')
