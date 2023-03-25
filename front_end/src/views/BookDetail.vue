<template>
  <div class="book">
    <el-skeleton v-if="isLoading" :rows="5" animated />
    <div v-else-if="book_details !== undefined" class="book_container">
      <div class="book_top">
        <div class="book_img">
          <img :src="book_details.cover_url">
        </div>
        <div class="book_right">
          <div class="book_title">
           {{book_details.title}}
            <div class="book_author">
              <span>{{book_details.author}}</span>
              著
            </div>
          </div>
          <div class="book_type">
            <div class="block_item">读者</div>
            <div class="block_item">全部</div>
            <div class="block_item">全部</div>
            <div class="block_item">全部</div>
          </div>
          <div class="book_count">
            <div class="count_item">
              <span>{{book_details.words_account.wordTotal}}</span>字
            </div>
            <div class="count_item" style="width: 2px;height: 20px;background-color: #fafafa;margin: 5px 20px 0 20px"></div>
            <div class="count_item">
              <span>351</span>万人在读
            </div>
          </div>
          <div class="book_update">
            最近更新：第1718章 深空中的精神病院
            <span>2023-02-26 19:00</span>
          </div>
          <div class="book_button">
            <button @click="$router.push({ path: `/book/${$route.params.id}/${book_details.chapter[0].id}` })">开始阅读</button>
            <button>加入书架</button>
          </div>
        </div>
      </div>

      <div class="book_bottom">
    <!--    书籍简介-->
        <div class="book_desc">
          <div class="desc_title">作品简介</div>
          <div class="desc">
            {{book_details.description}}
          </div>
        </div>
    <!--    书籍目录-->
        <div class="book_chapter">
          <div class="chapter_title">
            目录 ·
            <span>{{book_details.chapter.length}}章</span>
          </div>

          <div class="chapter_list">
            <div v-for="item in book_details.chapter" class="list_item">
              <a  @click="$router.push({ path: `/book/${$route.params.id}/${item.id}` })">{{item.title}}</a>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else>
      不能找到对应的书籍
    </div>
  </div>
</template>

<script setup>
import { useTitle } from '@vueuse/core'

const title = useTitle()
import {ref} from "vue";
import { ElMessage } from 'element-plus'
import {axios} from "../api";
import {useRoute} from "vue-router";

const route = useRoute()

let book_details = ref(null);
let isLoading = ref(true)

axios.post("book/details", {
  id: route.params.id
}).then(respone => {
  book_details.value = respone.data.data
  if(book_details.value === undefined) {
    ElMessage.error(respone.data.message)
  }
  title.value = book_details.value.title
  isLoading.value = false;
})

</script>

<style scoped>
.book{
  padding: 0 9%;
  background-color: rgb(246, 246, 246);
}
.book_container{
  padding: 40px;
  background-color: rgb(246, 246, 246);
}
.book_top{
  /*height: 300px;*/
  background-color: white;
  display: flex;
  padding: 20px 0;

}
.book_img{
  margin-left: 30px;
  width: 186px;
  /*height: 260px;*/
  flex-shrink: 0;
  margin-right: 100px;
}
.book_img img{
  width: 186px;
  height: 248px;
  border-radius: 4px;
}

.book_right{
  /*height: 230px;*/
  /*background-color: darkred;*/
  flex-shrink: 0;
  /*margin-top: 5px;*/
}
.book_title{
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 3px;
}
.book_author{
  margin-left: 30px;
  display: inline-block;
  /*color: rgb();*/
  font-weight: normal;
  font-size: 14px;
}
.book_type{
  font-size: 14px;
  margin-bottom: 25px;
}
.block_item{
  width: 50px;
  border: chocolate 1px solid;
  border-radius: 5px;
  text-align: center;
  margin-right: 10px;
  padding: 3px;
  display: inline;
}
.book_count{
  font-size: 14px;
  color: rgb(179, 179, 179);
  margin-bottom: 30px;
}
.count_item{
  display: inline-block;
}
.count_item span{
  font-size: 28px;
  color: black;
  margin-right: 5px;
}
.book_update{
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 25px;
}
.book_update span{
  margin-left: 8px;
  letter-spacing: 2px;
}
.book_button{
  margin-left: 5px;
}
.book_button button{
  background-color: rgb(250, 103, 37);
  border: none;
  color: white;
  padding: 8px 45px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 20px;
  margin-right: 8px;
  cursor: pointer;
}


/*bottom*/
.book_bottom{
  margin-top: 70px;
  /*height: 300px;*/
  background-color: white;
  padding: 50px 30px 0 30px;
}


.desc_title{
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: #999999 1px solid;
}
.desc{
  margin: 60px 35px;
  color: rgb(102, 102, 102);
  line-height:25px;
  letter-spacing: 1.3px;
}

.chapter_title{
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: #999999 1px solid;
}
.chapter_list{
  padding: 30px;
}
.list_item{
  color: rgb(102, 102, 102);
  /*background-color: chocolate;*/
  display: inline-block;
  margin-bottom: 20px;
  width: 268px;
  height: 20px;
  line-height: 20px;
  margin-right: 80px;
  font-size: 14px;
}
.list_item >a{
  color: rgb(102, 102, 102);
  cursor: pointer;
}
.list_item >a:hover{
  color: chocolate;
}

</style>
