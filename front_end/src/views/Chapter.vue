<template>
  <div class="flex_center" style="background-color: #eae4d7; ">
    <div v-if="!isLoading" style="width: 55%;background-color: #f6f1e7;padding: 80px 60px 30px 60px">
      <div style="font-size: 24px;font-weight: bold;margin-bottom: 30px">{{book.chapter.title}}</div>
      <div class="flex" style="margin-bottom: 40px;font-size: 12px">
        <div >{{book.title}}</div>
        <div style="margin: 0 10px">{{book.author}}</div>
        <div>{{(new Date(book.chapter.updated_time)).pattern("yyyy-MM-dd hh:mm:ss")}}</div>
      </div>
      <div v-html="book.content" style="font-size: 16px"></div>
    </div>
  </div>

</template>

<script setup>

import {useRoute} from "vue-router";
import {axios} from "../api";
import {ref} from "vue";

const route = useRoute()
let isLoading = ref(true);
let book = ref(null);

axios.post("book/content", {
  id: route.params.chapter_id,
  book_id: route.params.id
}).then(({data}) => {
  let book_data = data.data;
  let ident = "&nbsp;&nbsp;&nbsp;&nbsp;";
  book_data.content = ident + book_data.chapter.content.replaceAll("\n", "</br></br>" + ident);

  book.value = book_data;
}).finally(() => {
  isLoading.value = false
})
</script>

<style scoped>

</style>
