<template>
  <div class="library_container" style="padding: 40px;margin: 0 9%;">
    <div class="library_typeblock" style="padding: 12px 0 6px 0;background-color: #fafafa;">

      <div class="block" v-for="item in blocklist">
        <div class="block_condition" >
          <div class="block_title">{{item.title}}：</div>
          <span v-for="childitem in item.tags" >

<!--          	<div class="block_item" @click="click_tag" >{{childitem}}</div>-->
             <el-check-tag :checked="check_tag.includes(childitem)"
                           @change="(status) => {
                             // status 是新的状态
                             if(status) {
                               if(!check_tag.includes(childitem)) {
                                 check_tag.push(childitem)
                               }
                             } else {
                               check_tag = check_tag.filter(e => e != childitem);
                             }
                           }"
                           @click="click_tag"
                            style="margin-right: 10px">
<!--             {{ childitem.replace(/^.*?-/, "") }}-->
               {{childitem}}
             </el-check-tag>
<!--      :class="{block_active}"      {{childitem}}-->
          </span>
        </div>
      </div>

    </div>
<!--    主要内容-->
    <div class="library_main" style="margin-top: 50px;">
      <div class="main_type">
        <div class="type" style="border-bottom: 1px solid #999999">
          <div class="type_title" @click="hot_sort">最热</div>
          <div class="type_title" @click="new_sort">最新</div>
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
      <!--    分页-->
      <div style="margin-top: 50px">
        <el-pagination
            style="justify-content: center;"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[12, 24, 36]"
            background
            layout=" total, sizes,prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>

    </div>

  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import {axios} from "../api";

import { useTitle } from '@vueuse/core'

const title = useTitle("书库-小说网")
const books = ref([])
const route = useRoute()
const blocklist = ref([
  {
    title:"读者",
    tags:["男频","女频"]
  },
  {
    title:"分类",
    tags:["都市","玄幻","历史","网游","修真","科幻","重生","校园"]
  },
  {
    title:"状态",
    tags:["连载中","已完结"]
  },
  {
    title:"字数",
    tags:["30万以下","30-50万","50-100万","100-200万","200万以上"]
  }
])

//选择标签
const checked = ref(false)
const check_tag = ref([])
const click_tag = () => {
  if(check_tag.value.length === 0){
    searchBook()
  }else{
    console.log("valuesa",check_tag.value)
    axios.post("/book/scalptag",{
      check_tag:check_tag.value,
      currentPage:currentPage.value,
      pageSize:pageSize.value
    }).then(res =>{
      books.value = res.data.data.c_tag
      total.value = res.data.data.total
    })
  }

}




//最新
const new_sort = () => {
  axios.post("/book/new_sort",{
    currentPage:currentPage.value,
    pageSize:pageSize.value
  }).then(res =>{
    books.value = res.data.data.new_sort
    total.value = res.data.data.total
  })
}


//最热
const hot_sort = () => {
  axios.post("/book/hot_sort",{
    currentPage:currentPage.value,
    pageSize:pageSize.value
  }).then(res =>{
    books.value = res.data.data.hot
    total.value = res.data.data.total
  })
}


//分页

const currentPage = ref() //当前位于哪页
const pageSize = ref(12)  //一页显示几条
const total = ref(0)  //总数

//监听page size改变的事件
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  searchBook()
}
//监听当前页数改变的事件
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  searchBook()

}


//搜索
const searchBook = () => {
  if(route.query.likebook == undefined){
    axios.post("/book/hot_sort",{
      currentPage:currentPage.value,
      pageSize:pageSize.value
    }).then(res =>{
      books.value = res.data.data.hot
      total.value = res.data.data.total
    })
  }else {
    axios.post('/book/inquire',{
      likebook:route.query.likebook
    }).then(res =>{
      books.value = res.data.data
      console.log(res.data.data)
    })
  }
}
//route.query.likebook 路由传入的参数值
watch(()=> route.query.likebook,
    searchBook
)


onMounted(searchBook)



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
  margin:10px 40px;
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