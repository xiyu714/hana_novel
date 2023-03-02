<template>
  <div>
    <div class="flex">
      <div>后台管理</div>

    </div>

    <div style="display: flex; margin-top: 20px;">
      <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="on_select"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>小说管理</span>
          </template>
            <el-menu-item index="/addnovel_manage">添加小说</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-3">item three</el-menu-item>

        </el-sub-menu>
        <el-menu-item index="/authorcolumn">
          <el-icon><icon-menu /></el-icon>
          <span>作家管理</span>
        </el-menu-item>
        <el-menu-item index="/user_manage">
          <el-icon><icon-menu /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import {useRouter} from "vue-router"

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

let router = useRouter();

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