<template>
  <div style="height: 100vh;">
    <el-container>
      <el-header style="height: 60px;border-bottom: 1px solid #ccc;padding: 0;float: left">
        <div style="width: 180px;padding: 15px 0 20px 20px;font-size: 20px;float: left">小说后台管理系统</div>
        <div style="float: right;margin: 20px 30px 20px 0">
          <el-icon><BellFilled /></el-icon>
          <span style="margin:0 20px 0 30px">老张</span>
          <el-icon><Avatar /></el-icon>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: calc(100vh - 60px) ;overflow-x: hidden;border-right: 1px solid #a8afc0">
          <el-menu
              @select="on_select"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>小说管理</span>
              </template>
              <el-menu-item index="/addnovel_manage">小说</el-menu-item>
              <el-menu-item index="2">小说分类管理</el-menu-item>
              <el-menu-item index="3">item three</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/author_manage">
              <el-icon><icon-menu /></el-icon>
              <span>作家管理</span>
            </el-menu-item>
            <el-menu-item index="/user_manage">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>

          </el-menu>

        </el-aside>
        <el-main>
<!--          面包屑-->
<!--          <el-breadcrumb :separator-icon="ArrowRight">-->
<!--            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>promotion management</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>promotion list</el-breadcrumb-item>-->
<!--          </el-breadcrumb>-->


          <div style="font-size: 25px" v-if="$route.path === '/admin'">
            欢迎来到小说后台管理系统
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useRouter} from "vue-router"
import {useRoute} from "vue-router"
import {
  ArrowRight,
  Menu as IconMenu,
  Location,
  Avatar,
  BellFilled,
  Setting,
} from '@element-plus/icons-vue'

let router = useRouter();
const route = useRoute()

const activeIndex = ref('1')
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const on_select = (index) => {
  console.log(index)
  router.push("/admin" + index)
}
</script>

<style scoped>

</style>