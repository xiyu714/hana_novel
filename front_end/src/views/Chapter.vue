<template>
  <div v-if="!isLoading">
    <h1>{{chapter.title}}</h1>
    <div v-html="chapter.content"></div>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";
import {axios} from "../api";
import {ref} from "vue";

const route = useRoute()
let isLoading = ref(true);
let chapter = ref(null);

axios.post("book/content", {
  id: route.params.chapter_id,
  book_id: route.params.id
}).then(({data}) => {
  let chapter_data = data.data;
  chapter_data.content = chapter_data.content.replaceAll("\n", "</br></br>");
  chapter.value = chapter_data;
}).finally(() => {
  isLoading.value = false
})
</script>

<style scoped>

</style>
