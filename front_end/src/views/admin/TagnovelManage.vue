<template>
  <div style="margin-bottom: 15px;height: 30px">
    <div style="float: left">
      <el-input style="width: 300px;margin-right: 12px" placeholder="请输入标签名..."
                v-model="like_tag"
                @keyup.enter="getsearchlist"
                ></el-input>
      <el-button type="primary"
                 @click="getsearchlist"
                 >
        搜索
      </el-button>
    </div>
  </div>
<!--  书本标签信息表格-->
  <div>
    <el-table
        :data="tagsData"
        stripe
        border
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0.8)"
        style="width: 100%;"
    >
      <el-table-column prop="id" label="书本ID" width="150" align="center"/>
      <el-table-column prop="title" label="书名" width="150" align="center"/>

      <el-table-column prop="cover_url" label="封面" width="100" align="center" >
        <template #default="scope">
          <div style="display: flex;text-align: center">
            <img :src="scope.row.cover_url"
                 style="width: 46px;height: 60px;border-radius: 2px;margin-left: 18px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="150" align="center"/>
      <el-table-column prop="tag" label="标签" align="center" width="400" >
        <template #default="scope">

          <span  v-for=" (item,index) in scope.row.tag">
          <el-tag style="margin-left: 10px" size="large">{{scope.row.tag[index]}}</el-tag>

          </span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"  label="操作" align="center">
        <template #default="scope">
          <el-button style="padding: 3px;width: 70px;margin-right: 10px"
                      @click="dialogEditTag = true;currentTag = scope.row"
                     type="primary">编辑</el-button>
<!--          <el-button style="padding: 3px;width: 70px" type="danger" @click="currentTag = scope.row;delete_book(currentTag)">删除</el-button>-->
        </template>
      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" align="center"/>
      <el-table-column prop="visit_count" label="访问量"  align="center" />
    </el-table>
    <!--编辑书本标签的弹窗-->
    <el-dialog v-model="dialogEditTag" >
      <el-form
          ref="AddForm"
          label-width="90px"
          :model="currentTag"
          class="demo-dynamic"
      >
        <el-form-item
            prop="id"
            label="书本id:"
        >
          <el-input disabled v-model="currentTag.id" style="width: 120px" ></el-input>

        </el-form-item>
        <el-form-item
            prop="title"
            label="书本名:"
        >
          <el-input disabled v-model="currentTag.title" style="width: 180px" ></el-input>
        </el-form-item>

<!--        {{currentTag}}-->

        <el-form-item
            prop="tag"
            label="标签:"
        >
          <span  >
            <el-tag style="margin-left: 10px"
                    v-for=" item in currentTag.tag"
                    size="large"
                    closable
                    @close="handleClose(item)">
                {{item}}
            </el-tag>
            <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
                style="margin-left: 10px"
            />
              <el-button v-else
                         class="button-new-tag ml-1"
                         size="small"
                         style="margin-left: 10px"
                         @click="showInput"
              >
                + New Tag
              </el-button>

          </span>
        </el-form-item>

        <el-form-item
            prop="cover_url"
            label="封面:"
        >
          <img :src="currentTag.cover_url"
               style="width: 76px;height: 100px;border-radius: 2px;margin-left: 10px;">
        </el-form-item>

      </el-form>

      <template #footer>
          <span class="dialog-footer">
<!--            <el-button @click="dialogEditTag = false">取消</el-button>-->
            <el-button type="primary" @click="dialogEditTag = false" >
              完成
            </el-button>
          </span>
      </template>

    </el-dialog>

    <!--分页组件-->
    <div style="margin-top: 10px">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15]"
          background
          layout=" total, ->,sizes,prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import {axios} from "../../api";
import { useTitle } from '@vueuse/core'

const title = useTitle("小说标签管理-小说后台管理")
const { proxy } = getCurrentInstance();

//删除书本
// const delete_book = (currentTag) => {
//   console.log(currentTag.value)
//   axios.post("/book/delete",{id:currentTag.value.id})
//       .then(res =>{
//         proxy.$message({
//           message:'删除成功！',
//           type:"success"
//         });
//         getTaglist()
//       })
// }


//查找标签对应的书籍
const like_tag = ref()
const getsearchlist = () => {
  if((like_tag.value !== undefined) && (like_tag.value.length !== 0)){
    // getTaglist()
    console.log("value2",like_tag.value)
    axios.post("/book/searchtag",{
      tag:like_tag.value,
      currentPage:currentPage.value,
      pageSize:pageSize.value
    }).then(res=>{
      console.log("ews",res.data.data.t_tag)
      tagsData.value = res.data.data.t_tag
//获取总数据长度
      total.value = res.data.data.total
    })
  } else{
    getTaglist()
  }

}


//编辑标签dialog
const dialogEditTag = ref(false)
const currentTag =ref()
const inputVisible = ref(false)
const inputValue = ref()

//添加标签
const showInput = () => {
  if(currentTag.value.tag == null){
    currentTag.value.tag = ref([])
    console.log(currentTag.value.tag)
  }
  inputVisible.value = true

}

const handleInputConfirm = () => {
  currentTag.value.tag.push(inputValue.value)
  axios.post("/book/updatetag",{
    book_id:currentTag.value.id,
    tag:currentTag.value.tag
  }).then((res=>{
    proxy.$message({
      message:'添加成功！',
      type:"success"
    });
  }))
  inputVisible.value = false
  inputValue.value = ''
}

//关闭（删除标签）
const handleClose = (item) => {

  let a = currentTag.value.tag.splice(currentTag.value.tag.indexOf(item), 1)
  axios.post("/book/updatetag",{
    book_id:currentTag.value.id,
    tag:a
  }).then(res=>{
    proxy.$message({
      message:'删除成功！',
      type:"success"
    });
  })

}




//分页
const currentPage = ref() //当前位于哪页
const pageSize = ref(5)  //一页显示几条
const total = ref(0)  //总数

//监听page size改变的事件
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  getTaglist()
}
//监听当前页数改变的事件
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  getTaglist()

}


const tagsData =ref([])

//遍历所有小说
const getTaglist = () =>{
  axios.post("/book/new_sort",{
    currentPage:currentPage.value,
    pageSize:pageSize.value
  }).then(res =>{
    tagsData.value = res.data.data.new_sort
    //获取总数据长度
    total.value = res.data.data.total
    console.log(tagsData.value)
  })

}
onMounted(()=>{
  getTaglist()
})
</script>

<style scoped>

</style>