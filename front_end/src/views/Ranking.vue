<template>

<div v-if="books !== undefined" style="background-color: #eef3fa;padding: 3% 10%;">
  <div style="padding: 20px 40px 40px 40px;background-color: #ffffff">
    <div class="man_rank">
      <div class="man_rank_block">
        <div class="rank_block_title">
          <span style="font-weight: bold">点击榜</span>
          <a style="cursor: pointer" @click="$router.push({path:`/library`})">
            更多
          </a>
        </div>
        <div class="rank_booklist">
          <div class="rank_item" v-for="(item,index) in books.slice(0,10)"
               @click="$router.push({ path: `/book/${books[index].id}` }) "
          >
            <a>
              <div class="rank" style="background-color:rgb(191, 44, 36)"></div>
              <span class="rank_item_title">
                    {{ books[index].title }}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="man_rank_block">
        <div class="rank_block_title">
          <span style="font-weight: bold">潜力作品榜</span>
          <a style="cursor: pointer" @click="$router.push({path:`/library`})">
            更多
          </a>
        </div>
        <div class="rank_booklist">
          <div class="rank_item" v-for="(item,index) in books.slice(10,20)"
               @click="$router.push({ path: `/book/${books.slice(10,20)[index].id}` }) "
          >
            <a>
              <div class="rank" style="background-color:rgb(230, 114, 37)"></div>
              <span class="rank_item_title">
                    {{ books.slice(10,20)[index].title }}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="man_rank_block">
        <div class="rank_block_title">
          <span style="font-weight: bold">收藏榜</span>
          <a style="cursor: pointer" @click="$router.push({path:`/library`})">
            更多
          </a>
        </div>
        <div class="rank_booklist">
          <div class="rank_item" v-for="(item,index) in books.slice(20,30)"
               @click="$router.push({ path: `/book/${books.slice(20,30)[index].id}` }) "
          >
            <a>
              <div class="rank" style="background-color:rgb(230, 191, 37)"></div>
              <span class="rank_item_title">
                    {{ books.slice(20,30)[index].title }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script setup>
import {axios} from "../api";
import {onMounted, reactive, ref} from "vue";
import { useTitle } from '@vueuse/core'

const title = useTitle("排行榜-小说网")
var manranklist = reactive([
  {
    rank:'1',
    bgColor:'background-color:rgb(191, 44, 36)'
  },
  {
    rank:'2',
    bgColor:'background-color:rgb(230, 114, 37)'
  },
  {
    rank:'3',
    bgColor:'background-color:rgb(230, 191, 37)'
  },
  {
    rank:'4',
    bgColor:'background-color:rgb(204, 204, 204)'
  },
  {
    rank:'5',
    bgColor:'background-color:rgb(204, 204, 204)'
  },
  {
    rank:'6',
    bgColor:'background-color:rgb(204, 204, 204)'
  },
  {
    rank:'7',
    bgColor:'background-color:rgb(204, 204, 204)'
  },
  {
    rank:'8',
    bgColor:'background-color:rgb(204, 204, 204)'
  },
  {
    rank:'9',
    bgColor:'background-color:rgb(204, 204, 204)'
  },
  {
    rank:'10',
    bgColor:'background-color:rgb(204, 204, 204)'
  }
])






const currentPage = ref() //当前位于哪页
const pageSize = ref()  //一页显示几条

const books = ref()
axios.post("/book/list",{
  currentPage:currentPage.value,
  pageSize:pageSize.value
}).then(res =>{
  books.value = res.data.data.books
  console.log("books",books.value)
})


</script>

<style scoped>
.man_rank{
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  /*background-color: blue;*/
}
.man_rank_block{
  width: 27%;
  /*height: 640px;*/
  padding: 17px 10px;
  display: inline-block;
  vertical-align: top;
  background-color: #f7f7f7;
  border-radius: 2px;
  /*background-color: chocolate;*/
}
.rank_block_title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-size: 20px;
  padding-bottom: 20px;
  /*border-bottom: 1px solid #DCDCDC;*/
}
.rank_block_title a{
  color: #999;
  font-size: 14px;
}
.rank_booklist{
  /*margin-top: 12px;*/
  /*background-color: chartreuse;*/
}
.rank_item{
  border-top: 0;
  border-top: 1px solid #DCDCDC;
  /*  background-color: darkolivegreen;*/
}
.rank_item a{
  display: flex;
  position: relative;
  cursor: pointer;
  padding: 14px 0 14px 3px;
  font-size: 16px;
  line-height: 22px;
}
.rank{
  width: 20px;
  height: 20px;
  font-weight: bold;
  background-color: rgb(191, 44, 36);
  color: white;
  text-align: center;
  margin-right: 10px;
}

</style>