<template>
  <div style="margin-bottom: 15px;height: 30px">
    <div style="float: left">
      <el-input
          style="width: 300px;margin-right: 12px"
      ></el-input>
      <el-button type="primary">搜索</el-button>
    </div>
    <div style="float: right">
      <el-button type="success">
        导出数据
      </el-button>
      <el-button type="primary">添加用户</el-button>
    </div>
  </div>
<!--  用户信息表格-->
  <div>
    <el-table
        :data="usersData"
        stripe
        border
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0.8)"
        style="width: 100%;"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column prop="email" label="邮箱" width="220"/>
      <el-table-column prop="avatar" label="头像url" width="220" />
      <el-table-column prop="permission" label="用户权限" width="180" />
      <el-table-column prop="permission" label="用户状态" width="180" >

      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" width="220" />

      <el-table-column fixed="right" width="200" label="操作">
        <template v-slot="scope">
          <el-button style="padding: 3px;width: 70px;margin-right: 10px" v-model="scope.row.Id" type="primary">编辑</el-button>
          <el-button style="padding: 3px;width: 70px" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


<!--  <div style="display: inline-block;width: 100%">-->
<!--    <div v-for="item in users"-->
<!--      style="width: 270px;background-color: #ffffff;display: inline-block;-->
<!--      margin: 30px 20px 0 10px;padding: 10px;box-shadow: 0 0 8px #E1DFDF">-->

<!--      <div style="height: 25px;border-bottom: 1px solid #999;margin-bottom: 10px">-->
<!--        <div style="float: left">{{item.name}}</div>-->
<!--        <div style="float: right;cursor: pointer">-->
<!--          <Delete style="width: 1em; height: 1em; margin-right: 8px;color: maroon" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div style="font-size: 14px;">-->
<!--        <div style="margin-left: 100px;margin-bottom: 10px">-->
<!--          <img :src="item.avatar" style="width: 70px;height: 70px">-->
<!--        </div>-->
<!--        <div>用户名：{{item.name}}</div>-->
<!--        <div style="margin-top: 2px">邮箱：{{item.email}}</div>-->
<!--        <div style="margin-top: 2px">创建时间：{{item.created_time}}</div>-->
<!--        <div style="margin-top: 2px">权限：{{item.permission}}</div>-->
<!--        <div>-->
<!--          用户状态：-->
<!--          <el-switch-->
<!--              v-model="value"-->
<!--              class="mb-2"-->
<!--              style="&#45;&#45;el-switch-on-color: #13ce66; &#45;&#45;el-switch-off-color: #ff4949"-->
<!--              active-text="启用"-->
<!--              inactive-text="禁用"-->
<!--          />-->
<!--        </div>-->
<!--        <div>备注：</div>-->
<!--      </div>-->



<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import { ref } from 'vue'
import {useRoute} from "vue-router";
import {axios} from "../../api";
import {Delete} from '@element-plus/icons-vue'

const value = ref(true)
const usersData =ref([])

axios.post("/user/admin/list").then(({data}) =>{
  usersData.value = data.data
})
</script>

<style scoped>

</style>