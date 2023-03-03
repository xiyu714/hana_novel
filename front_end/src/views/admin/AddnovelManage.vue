<template>
  <div>
<!--    搜索区域-->
    <el-input
      placeholder="输入id爬取"
      v-model="book_id"
      :suffix-icon="Search"
    >
    </el-input>
    <el-button @click="get_details">获取基本信息</el-button>
    <el-button>爬取</el-button>
    <div>
      <div v-if="book_details != null">
        <div>
          <img :src="book_details.封面_URL" alt="">
          <div>{{book_details.标题}}</div>
          <div>{{book_details.简介}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {axios} from "../../api";
const book_id = ref('')
const is_get_book_details = ref(false)
const book_details = ref(null)


const get_details = async () => {
  let axiosResponse = await axios.post("book/craw/details", {
    book_id : book_id.value
  });
  console.log(axiosResponse.data)
  book_details.value = axiosResponse.data.data;
}
</script>

<style scoped>

</style>