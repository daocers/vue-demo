<template>
  <el-meun theme="dark" default-active="1" class="ele-menu-demo" mode="horizontal" :router="true">
    <el-menu-item index="/elindex/hot">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
  </el-meun>
</template>
