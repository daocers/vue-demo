// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import VueRouter from 'vue-router'
import routeConfig from './router/router-config' //引入router-config.js文件
import axios from 'axios'

Vue.config.productionTip = false
//测试使用
// const host = "https://math.testing1.hetao101.com/learning/v1";
// const host = "http://localhost:8080/radar";
const host = "http://www.bugu.co/radar";
// const wsUrl = "ws://localhost:9999/hn";

//线上使用
// const host = "http://www.bugu.co/hn";
// const wsUrl = "ws://www.bugu.co/hn";

// 全局超时时间
const global_timeout = 10000;

Vue.prototype.host = host;
// Vue.prototype.wsUrl = wsUrl;

let loading;

Vue.prototype.loading = function () {
  loading = this.$loading({
    lock: true,
    // text: '加载中',
    // spinner: 'iconfont tes-icon-jiazai',
    // background: 'rgba(188,215,232,0.95)'
  });
  return loading;
}

Vue.prototype.clearLoading = function () {
  if (loading) {
    loading.close();
    loading = null;
  }
}


/**
 * get请求
 **/
Vue.prototype.doGet = async function (url, queryParams) {
  let params = new URLSearchParams();
  for (let key in queryParams) {
    let value = queryParams[key];
    if (!value || value === undefined || value === null || value === "") {
      continue;
    } else {
      params.append(key, queryParams[key]);
    }
  }
  let response = await axios({
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    url: host + url,
    method: 'post',
    data: queryParams,
    timeout: global_timeout
  })
  return await handleResponse(response, this);
};


/**
 * 下载文件
 * @param url
 * @returns {Promise<void>}
 */
Vue.prototype.downloadFile = async function (url) {
  window.location.href = host + url;
}


/**
 * 执行post请求
 * @param url
 * @param data
 * @param type
 * @param timeout
 * @returns {Promise<{}|boolean|*>}
 */
Vue.prototype.doPost = async function (url, data, type, timeout) {

  if (!timeout) {
    timeout = global_timeout;
  }
  if (!type) {
    type = 'JSON';
  }

  let contentType = '';
  if (type.toUpperCase() == "FORM") {
    contentType = 'application/x-www-form-urlencoded';
    let params = new URLSearchParams();
    for (let key in data) {
      if(data[key] == undefined){
        continue;
      }
      params.append(key, data[key]);
    }
    data = params;
  } else {
    contentType = 'application/json;charset=UTF-8';
  }

  let response = await axios({
    headers: {"Content-Type": contentType},
    url: host + url,
    method: 'post',
    data: data,
    timeout: timeout
  })

  console.log("响应数据：", response);
  return handleResponse(response, this);
}


/**
 * 处理请求响应
 * @param response
 * @param vue
 * @returns {Promise<{}|boolean|*>}
 */
function handleResponse(response, vue) {
  console.log("response:", response)
  if (response.status == 200) {
    let data = response.data;
    let code = data.errCode;
    let result = data.data;
    let message = data.errMsg;

    if (!result && result != 0) {
      if (code) {
        //  请求失败，
        if (-100 == code) {
          console.log("参数异常, message", message)
        } else if (-10000 == code) {
          console.log("系统异常", message)
        }
        vue.$notify.error({
          title: '错误',
          message: !message ? "系统异常" : message
        })
        return null;
      } else {
        vue.$notify.error({
          title: "错误",
          message: !message ? "系统异常" : message
        })
        return null;
      }
    }
    return data.data;
  } else {
    vue.$notify.error({
      title: '错误',
      message: '网络异常'
    });
    return {};
  }
}


Vue.prototype.loading = function () {
  const loading = this.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return loading;
}

let urlList = [];

//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})

router.beforeEach((to, from, next) => {
  next();
})

const app = new Vue({
  router,
  // store,
  el: "#app",
  render: h => h(App)
})
