<template>
  <div >
<!--    <el-button type="primary">添加用户</el-button>-->
    <el-input
        style="width: 300px;margin-right: 15px;margin-left: 460px"
    ></el-input>
    <el-button type="primary">搜索</el-button>
  </div>
  <div style="display: inline-block;width: 100%">
    <div v-for="item in users"
      style="width: 270px;background-color: #ffffff;display: inline-block;
      margin: 30px 20px 0 10px;padding: 10px;box-shadow: 0 0 8px #E1DFDF">

      <div style="height: 25px;border-bottom: 1px solid #999;margin-bottom: 10px">
        <div style="float: left">{{item.name}}</div>
        <div style="float: right;cursor: pointer">
          <Delete style="width: 1em; height: 1em; margin-right: 8px;color: maroon" />
        </div>
      </div>

      <div style="font-size: 14px;">
        <div style="margin-left: 100px;margin-bottom: 10px">
          <img :src="item.avatar" style="width: 70px;height: 70px">
        </div>
        <div>用户名：{{item.name}}</div>
        <div style="margin-top: 2px">邮箱：{{item.email}}</div>
        <div style="margin-top: 2px">创建时间：{{item.created_time}}</div>
        <div style="margin-top: 2px">权限：{{item.permission}}</div>
        <div>
          用户状态：
          <el-switch
              v-model="value"
              class="mb-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="启用"
              inactive-text="禁用"
          />
        </div>
        <div>备注：</div>
      </div>


<!--      <div>{{item.email}}</div>-->
<!--      <div>{{item.created_time}}</div>-->
<!--      <div>-->
<!--        <img :src="item.avatar">-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useRoute} from "vue-router";
import {axios} from "../../api";
import {Delete} from '@element-plus/icons-vue'

const value = ref(true)
const users =ref([])

axios.post("/user/admin/list").then(({data}) =>{
  users.value = data.data
})
</script>

<style scoped>

</style>