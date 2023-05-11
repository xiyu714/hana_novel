<template>
  <div>
  <!--  左边-->
    <div style="display: inline;margin-right: 330px">
      <el-button type="primary" @click="dialogFormVisible = true">
        <el-icon style="margin:0 5px 0 -5px"><Plus /></el-icon>
        添加书籍
      </el-button>
<!--      添加书籍弹窗-->
      <el-dialog v-model="dialogFormVisible" title="添加书籍">
        <el-form
            label-width="auto"
        >

          <el-form-item label="书本id:" >
            <el-input  type="text" autocomplete="off" style="width: 200px;margin-right: 30px" />
            <el-button type="primary">获取基本信息</el-button>
          </el-form-item>
        </el-form>

<!--        添加书本id:-->
<!--        <el-input-->
<!--            placeholder="输入id爬取"-->

<!--        ></el-input>-->



        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>


    </div>
<!--    搜索框-->
    <div style="display: inline">
      <el-input
        style="width: 300px"
        v-model="likebook"
        placeholder="请输入书名"
        @keyup.enter.native="searchBook"
      ></el-input>
      <el-button type="primary" @click="searchBook">搜索</el-button>
    </div>
  </div>

<!--  具体书籍-->

  <div class="main_block" style="display: inline-block;
      width: 100%;">

    <div class="booklist_one" v-for="item in books">
<!--         @click="$router.push({ path: `/book/${item.id}` }) "-->

      <div class="booklist_one_left">
        <img :src="item.cover_url">
      </div>
      <div class="booklist_one_right">
        <div class="title" >
          <div style="float: left">{{item.title}}</div>
          <div style="float: right;cursor: pointer">
            <Delete @click="Delete_Book(item)" style="width: 1em; height: 1em; margin-right: 8px;color: maroon" />
          </div>
        </div>
        <div class="author">作者：{{item.author}}</div>
        <div class="desc">{{item.description}}</div>
      </div>
    </div>
<!--    分页-->
    <div style="margin-top: 10px">
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



</template>

<script setup>
import {Plus} from '@element-plus/icons-vue'
import {ref, getCurrentInstance, onMounted} from "vue";
import {axios} from "../../api";
import {Delete} from '@element-plus/icons-vue'

const dialogFormVisible = ref(false)
const books = ref([])
const { proxy } = getCurrentInstance();

//搜索书籍
const likebook = ref()
const searchBook = () =>{
  axios.post("/book/inquire",{
    likebook:likebook.value
  }).then(({data}) =>{
    books.value = data.data
  })
}

//删除书本
const Delete_Book = (books) =>{

  axios.post("/book/delete",{id:books.id})
    .then(res =>{
      proxy.$message({
        message:'删除成功！',
        type:"success"
      });
      getBooklist()
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
  getBooklist()
}
//监听当前页数改变的事件
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  getBooklist()

}

//获取所有书本信息
const getBooklist = () =>{
  axios.post("book/list",{
    currentPage:currentPage.value,
    pageSize:pageSize.value
  }).then(({data}) => {
    books.value = data.data.books
    total.value = data.data.total
  })
}

onMounted(()=>{
  getBooklist()
})
</script>

<style scoped>
.booklist_one{
  width: 388px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  /*cursor: pointer;*/
  /*margin-right: 22px;*/
  margin-top: 40px;
  margin-left: 20px;
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
  /*cursor: pointer;*/
  /*background-color: darkgreen;*/
  padding-left: 20px;
}
.booklist_one_right .title{
  font-size: 18px;
  /*cursor: pointer;*/
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  height: 25px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;

  line-height: 17px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>