<template>
  <div v-if="globalStore.user === undefined" style="height: 800px"></div>
  <div v-else style="background-color: #f7f6f2;height: 100%;width: 100%">
  <div style="margin: 0 13% 0 13%;padding-top: 40px;height: 800px">
<!--    导航-->
    <div class="nav" style="float:left;width: 200px;">
      <ul style="padding: 0;margin: 0;list-style-type: none">
        <li @click="isShelf = true,$router.push({ path: `/bookshelf` })" :class="{active: isShelf}"
            style="padding: 10px 0 10px 30px;margin: 0;" >
            <span >
              <router-link to="/bookshelf">书架详情</router-link>
            </span>
        </li>
        <li @click="isShelf = false,$router.push({ path: `/bookshelf/historybook` })" :class="{active: !isShelf}"
            style="padding: 10px 0 10px 30px;margin-top: 10px;" >
            <span>
              <router-link to="/bookshelf/historybook">最近阅读</router-link>
            </span>
        </li>

      </ul>
    </div>
    <div style="margin-left: 250px;">
      <div v-if="$route.path === '/bookshelf'">
<!--        搜索框-->
        <div style="display: inline">
          <el-input v-model="likebook_title" style="width: 300px;margin-right: 5px" placeholder="请输入书本名搜索"></el-input>
          <el-button @click="get_userlist" type="primary" style="margin-right: 220px">搜索</el-button>

<!--          编辑-->
          <el-button  type="primary" @click="isEdit = true">编辑</el-button>
          <div v-if="isEdit === true" style="display: inline-block;margin-left: 18px">
            <el-button type="danger">删除</el-button>
            <el-button type="success" @click="isEdit = false">完成</el-button>
          </div>
        </div>
<!--    书架 书本详情-->
        <div>
        <div style="display: inline-block;margin-top: 20px">
          {{book_idList}}
          <div style="display: inline-block;cursor: pointer;margin:0 30px 20px 0;text-align: center"
               v-for="(item,index) in books"
                @click="book_item = item;enter_bookdetail(book_item)">



              <div style="position: relative">
                <img style="width: 140px;height: 180px;border-radius: 3px" :src="item.cover_url">
                <div v-if="isEdit == true" style="bottom: 10px;right: 10px;position: absolute;height: 20px;width: 20px">
                  <el-icon class="c_color"
                            v-model="item.book_id"
                           :size="20"
                           :class="{clickcolor: book_idList.indexOf(item.book_id) > -1}"
                           @click="change_iconcolor(item)"><CircleCheckFilled /></el-icon>
                </div>
              </div>
              <div>{{item.title}}</div>
              <div>{{ item.chapter_location }}章/章</div>
            {{item.book_id}}
          </div>
        </div>

        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
  </div>

</template>

<script setup>
import {CircleCheckFilled} from '@element-plus/icons-vue'
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {axios} from "../api";
import {useGlobalStore} from "../store";
import { useRouter } from "vue-router";
let isShelf = ref(true)
const books = ref([])
const { proxy } = getCurrentInstance();
const globalStore = useGlobalStore();
const router = useRouter()
const likebook_title = ref()

//编辑  删除   完成
const bgcolor = ref("#d9d9d9")
const isEdit = ref(false)
const book_idList = ref([])
const change_iconcolor = (book_id_item) => {
  //indexOf() 方法返回值在字符串中第一次出现的位置。如果未找到该值，则 indexOf() 方法返回 -1。
  let a = book_idList.value.indexOf(book_id_item.book_id)
  console.log("a",a.value)
  if(a >= 0) {
    //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
    book_idList.value = book_idList.value.filter(e => e !== book_id_item.book_id);
  } else {
    book_idList.value.push(book_id_item.book_id);
  }
}


//进入书本页面
const book_item = ref()
const enter_bookdetail = (book_item) => {
  if(isEdit.value == false){
    router.push( `/book/${book_item.book_id}` )
  }
}

//判断用户有没有登录
if(globalStore.user === undefined){
  proxy.$message({
    message:'请先登录',
    type:"error"
  });
}

const get_userlist = () => {
  axios.post("/book/userlist",{
    user_id: globalStore.user.id,
    likebook_title:likebook_title.value
  }).then(({data}) => {
    // books.value = data.data;
    books.value = data.data
    console.log("111",books.value)
  })
}


onMounted(()=>{
  get_userlist()
})



</script>

<style scoped>
.c_color{
  color: #d9d9d9 ;
}
.clickcolor{
  color:#0bafff;
}
.active{
  background-color: #ffffff;
  border: 1px solid #e0deda;
  border-radius: 5px;
}
</style>