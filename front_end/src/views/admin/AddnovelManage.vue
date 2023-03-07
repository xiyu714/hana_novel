<template>
  <div>
    <div style="margin-bottom: 20px;">当前支持的小说网站：<a href="https://www.xbiquge.so/" target="_blank">https://www.xbiquge.so/</a></div>
<!--    搜索区域-->
    <el-input
      placeholder="输入id爬取"
      v-model="book_id"
      :suffix-icon="Search"
    >
    </el-input>
    <el-button v-loading="is_get_book_details" @click="get_details">获取基本信息</el-button>
    <el-button v-loading="is_get_book_details" @click="craw_book">爬取</el-button>
    <div>
      <div v-if="book_details != null">
        <div class="flex">
          <img :src="book_details.封面_URL" alt="">
          <div>
            <div class="h2">{{book_details.标题}}</div>
            <div>{{book_details.简介}}</div>
          </div>
        </div>
        <div class="chapter_list">
          <div v-for="chapter in book_details.章节列表">
            {{chapter.title}}
          </div>
        </div>
<!--        日志-->
        <div style="background-color: #95d475;">
          <div class="h2">日志</div>
          <div v-html="book_details.log"></div>
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
  is_get_book_details.value = true;
  let axiosResponse = await axios.post("book/craw/details", {
    book_id : book_id.value
  });
  console.log(axiosResponse.data)
  book_details.value = axiosResponse.data.data;
  is_get_book_details.value = false;
}

const craw_book = async () => {
  let axiosResponse = await axios.post("book/craw/start", {
    book_details: book_details.value
  });
  console.log(axiosResponse.data)
  while (true) {
    let statusResponse = await axios.post("book/craw/getStatus", {
      task_id: axiosResponse.data.data.task_id
    });
    console.log(statusResponse.data)
    book_details.value = statusResponse.data.data;
    if(book_details.value.is_完成 === true || book_details.value == undefined) {
      break
    }
    await new Promise(r => setTimeout(r, 300));
  }
}
</script>

<style scoped>
.chapter_list {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
}
</style>
