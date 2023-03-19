<template>
  <div class="flex_center" style="background-color: #eae4d7;min-height: 100vh ">
    <div style="position:relative;background-color: black;width:60px;height: 300px;top:30px;right:15px">
<!--      58*60-->
      <div style="width: 60px;height: 60px;background-color: blue;border-bottom: 1px solid #ccc">

        <i class="iconfont icon-mulu" style="font-size: 30px"></i>
      </div>

    </div>
    <div v-if="!isLoading" style="width: 55%;background-color: #f6f1e7;padding: 80px 60px 30px 60px">
      <div style="font-size: 24px;font-weight: bold;margin-bottom: 30px">{{book.chapter.title}}</div>
      <div class="flex" style="margin-bottom: 40px;font-size: 12px">
        <div >{{book.title}}</div>
        <div style="margin: 0 10px">{{book.author}}</div>
        <div>{{(new Date(book.chapter.updated_time)).pattern("yyyy-MM-dd hh:mm:ss")}}</div>
      </div>
      <div v-html="book.content" style="font-size: 16px"></div>

      <div style="margin-top: 80px;width:55%;padding-left: 25%;padding-right: 25%">
<!--        v-if="lastChapter_id === undefined"-->
        <button @click="lastChapter" class="btn_last"  style="cursor: pointer;border-radius: 20px;
              border: none;width: 150px;background-color: #f6f1e7;height: 30px;margin-right: 100px"  >
          上一章</button>
        <button @click="nextChapter" style="cursor: pointer;border-radius: 20px;
              border: 1px solid #ff7300;width: 150px;height: 30px;background-color: #ff7300;">
          下一章</button>




      </div>
    </div>

  </div>

</template>

<script setup>


import { useTitle } from '@vueuse/core'

const title = useTitle()
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
                                  title.value = book.value.chapter.title +"    "+book.value.title
                                }).finally(() => {
                                  isLoading.value = false
                                })

get_book_content()

//上一章下一章
const lastChapter_id = ref(undefined)

const lastChapter = () =>{
  axios.post("/book/last_chapter_id",{
    id: route.params.chapter_id,
    book_id: book_id
  }).then(res =>{
    lastChapter_id.value = res.data.data.chapter_id

      router.push({ path: `/book/${book_id}/${lastChapter_id.value}` })
  })
}

const nextChapter_id = ref(undefined)

const nextChapter = () =>{
  axios.post("/book/next_chapter_id",{
    id: route.params.chapter_id,
    book_id: book_id
  }).then(res =>{
    nextChapter_id.value = res.data.data.chapter_id

    router.push({ path: `/book/${book_id}/${nextChapter_id.value}` })
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
.btn_last:hover{
  background-color: #ccc !important;
}

</style>
