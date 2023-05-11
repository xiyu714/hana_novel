<template>
  <div v-if="globalStore.user === undefined" style="height: 800px"></div>
  <div v-else style="background-color: #f7f6f2;height: 100%;width: 100%">
  <div style="margin: 0 13% 0 13%;padding-top: 40px;height: 800px">
<!--    导航-->
    <div style="float:left;width: 200px;">
      <ul style="padding: 0;margin: 0;list-style-type: none">
        <li style="padding: 10px 0 10px 30px;margin: 0;" >
            <span >
              <router-link to="/bookshelf">书架详情</router-link>
            </span>
        </li>
        <li style="padding: 10px 0 10px 30px;margin-top: 10px;" >
            <span>
              <router-link to="/bookshelf/historybook">最近阅读</router-link>
            </span>
        </li>

      </ul>
    </div>
    <div style="margin-left: 250px;">
      <div v-if="$route.path === '/bookshelf'">
<!--        搜索框-->
        <div style="display: inline">
          <el-input style="width: 300px" placeholder="请输入书本名或作者名搜索"></el-input>
          <el-button type="primary">搜索</el-button>

<!--          编辑-->


        </div>
<!--    书架 书本详情-->
        <div style="display: inline-block;margin-top: 20px">

          <div style="display: inline-block;cursor: pointer;margin:0 30px 20px 0;text-align: center" v-for="item in books"
               @click="$router.push({ path: `/book/${item.id}` }) ">

              <img style="width: 140px;height: 180px;border-radius: 3px" :src="item.cover_url">
              <div>{{item.title}}</div>
              <div>1章/章</div>

          </div>



        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
  </div>

</template>

<script setup>
import {getCurrentInstance, ref} from "vue";
import {axios} from "../api";
import {useGlobalStore} from "../store";


const { proxy } = getCurrentInstance();
const globalStore = useGlobalStore();
//判断用户有没有登录
if(globalStore.user === undefined){
  proxy.$message({
    message:'请先登录',
    type:"error"
  });
}


const books = ref([])

axios.post("book/list").then(({data}) => {
  books.value = data.data;
})



</script>

<style scoped>

</style>