<template>
  <div class="library_container" style="padding: 40px;margin: 0 9%;">
    <div class="library_typeblock" style="padding: 12px 0 6px 0;background-color: #fafafa;">

      <div class="block" v-for="item in blocklist">
        <div class="block_condition" >
          <div class="block_title">{{item.title}}：</div>
          <span v-for="childitem in item.tags" >
<!--        :class="{block_active}"    -->
          	<div class="block_item"  >{{childitem}}</div>
          </span>
        </div>
      </div>

    </div>
<!--    主要内容-->
    <div class="library_main" style="margin-top: 50px;">
      <div class="main_type">
        <div class="type" style="border-bottom: 1px solid #999999">
          <div class="type_title">最热</div>
          <div class="type_title">最新</div>
          <div class="type_title">字数</div>
        </div>
      </div>
<!--      具体书本-->
      <div class="main_block" style="display: inline-block;
      width: 100%;">

        <div class="booklist_one" v-for="item in books"
             @click="$router.push({ path: `/book/${item.id}` }) "
        >
          <div class="booklist_one_left">
            <img :src="item.cover_url">
          </div>
          <div class="booklist_one_right">
            <div class="title">{{item.title}}</div>
            <div class="author">作者：{{item.author}}</div>
            <div class="desc">{{item.description}}</div>
          </div>
        </div>
      </div>

    </div>






  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import {axios} from "../api";

//分页
// const currentPage1 = ref(5)
// const small = ref(false)
// const background = ref(false)
// const disabled = ref(false)
// const handleSizeChange = (val) => {
//   console.log(`${val} items per page`)
// }
// const handleCurrentChange = (val) => {
//   console.log(`current page: ${val}`)
// }

const route = useRoute()
const blocklist = ref([
  {
    title:"读者",
    tags:["全部","男生","女生"]
  },
  {
    title:"分类",
    tags:["全部","全部","全部"]
  },
  {
    title:"状态",
    tags:["全部","连载中","已完结"]
  },
  {
    title:"字数",
    tags:["全部","30万以下","30-50万","50-100万","100-200万","200万以上"]
  }
])
const books = ref([])

//搜索
const likebook = route.query.likebook
const searchBook = () =>{
  axios.post('/book/inquire',{
    likebook:likebook
  }).then(res =>{
    books.value = res.data.data
      console.log(res.data.data)
  })
}
onMounted(searchBook)

axios.post("book/list").then(({data}) => {
  books.value = data.data;
})
</script>

<style scoped>

.block{
  margin-bottom: 25px;
}
.block_condition{
  width: 1180px;
  display: flex;
  font-size: 14px;
}
.block_title{
  color: rgb(153, 153, 153);
  margin-right: 45px;
  flex-shrink: 0;
}
.block_item{
  margin-right: 50px;
  flex-shrink: 0;
  color: #333;
  cursor: pointer;
}

.type_title{
  display: inline-block;
  margin:10px 20px;
  font-size: 14px;
  cursor: pointer;
}
.block_active{
  color: #fa6725;
  background-color: #fef0e9;
  border-radius: 8px;
  padding:3px 8px;
}




.booklist_one{
  width: 388px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  cursor: pointer;
  /*margin-right: 22px;*/
  margin-top: 40px;
}
.booklist_one_left{
  position: relative;
  float: left;
  width: 100px;
  height: 130px;
}
.booklist_one_left img{
  width: 100px;
  height: 130px;
}
.booklist_one_right{
  position: relative;
  float: left;
  width: 210px;
  height: 130px;
  cursor: pointer;
  /*background-color: darkgreen;*/
  padding-left: 20px;
}
.booklist_one_right .title{
  font-size: 18px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.booklist_one_right .author{
  font-size: 12px;
  margin-top: 10px;
  color: #666;
  font-weight: 400;
  line-height: 17px;
}
.booklist_one_right .desc{
  width: 210px;

  font-size: 12px;
  margin-top: 10px;
  line-height: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>