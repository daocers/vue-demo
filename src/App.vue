<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'

  Vue.use(Element)
  export default {
    name: 'app',
    data: function () {
      return {
//        heightInfo: 500,
//        active: true,
//        menuClass: {
//          width: '240px',
//          height: '500px',
//        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

    },

    created: function () {
//      let height = document.documentElement.clientHeight;
//      console.log("height:::", height);
////      this.heightInfo = parseInt(height) - 50;
//      let res = parseInt(height) - 50 + 'px';
//      console.log("res:::", res);
//      this.menuClass.height = res;
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  /*解决表格位置错位*/
  td, th {
    display: table-cell !important;
  }

  #app {
    /*min-width: 1200px;*/
    margin: 0 auto;
    /*font-family: "Microsoft YaHei UI"*/
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table .danger-row {
    background: #f5dbe5;
  }


  /*  表格扩展 */
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 10px;
    /*width: 50%;*/
    width: 650px;
  }
</style>

