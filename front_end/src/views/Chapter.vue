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

      <div style="margin-top: 80px;">
<!--        v-if="lastChapter_id === undefined"-->
        <button @click="lastChapter"  >上一章</button>
<!--        <button @click="nextChapter">下一章</button>-->
      </div>
    </div>
  </div>

</template>

<script setup>

import { useRoute} from "vue-router";
import {axios} from "../api";
import {nextTick, ref, watch} from "vue";
import {useRouter} from "vue-router"

let router = useRouter();
const route = useRoute()
let isLoading = ref(true);
let book = ref(null);

//获取book_id
const book_id = route.params.id

const get_book_content = () => axios.post("book/content", {
                                  id: route.params.chapter_id,
                                  book_id: book_id
                                }).then(({data}) => {
                                  let book_data = data.data;
                                  let ident = "&nbsp;&nbsp;&nbsp;&nbsp;";
                                  book_data.content = ident + book_data.chapter.content.replaceAll("\n", "</br></br>" + ident);

                                  book.value = book_data;
                                }).finally(() => {
                                  isLoading.value = false
                                })

get_book_content()

//上一章下一章
const lastShow = ""
const lastChapter_id = ref(undefined)

const lastChapter = () =>{
  axios.post("/book/last_chapter_id",{
    id: route.params.chapter_id,
    book_id: book_id
  }).then(res =>{
    // console.log(chapter_id)
    // console.log(res.data.data.chapter_id)
    lastChapter_id.value = res.data.data.chapter_id

    // console.log(book_id)

      router.push({ path: `/book/${book_id}/${lastChapter_id.value}` })
  })
}

watch( () => route.params.chapter_id,
  async newId =>{
        await nextTick()
        console.log(route.params.chapter_id, newId)
        get_book_content()
  }
)
</script>

<style scoped>
.noClick{
  pointer-events:none
}
.Click{
  cursor: pointer;
}
</style>
