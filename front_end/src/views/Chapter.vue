<template>
<!-- background-color: #e8e2d5; -->
  <div class="flex_center" :style="{backgroundColor:active_bgColor}"  style="min-height: 100vh ">
    <div style="position:fixed;background-color:#f6f1e7;width:60px;height: 280px;top:40px;left:202px">

      <div @click="show_list" class="icon" style="cursor:pointer;width: 60px;height: 59px;background-color: #f6f1e7;border-bottom: 1px solid #ccc;text-align: center;margin-top: 10px">
        <i class="iconfont icon-mulu" style="font-size: 30px;"></i>
        <div class="icon_title"   style="font-size: 12px;padding-top: 3px;">目录</div>
      </div>

<!--详细目录-->
      <div v-if="isshow_list === true" style="width: 800px;height: 370px;position: absolute;background-color: #fcfbf5;margin: -70px 0  0 80px;padding: 50px 0 0 20px;box-shadow: 2px 3px 9px #ccc" >
<!--       关闭X-->
        <div class="close_button" @click="isshow_list = false"  style="position: absolute; right: 10px; top: 10px; cursor: pointer;">
          <el-icon><CloseBold /></el-icon>
        </div>

        <div style="font-size: 18px;margin-bottom: 25px;">
          <a style="border-bottom: 1px solid #ed4259;cursor: pointer;color: #ed4259;font-weight: bold">目录</a>
        </div>
        <div style="width: 800px;height: 325px;overflow-y: scroll;">
          <div class="chapter_list" v-if="isshow_list === true"  v-for="item in chapter_list" style="border-top: 1px solid #e5e5e5;padding-top: 10px;display: inline-block;margin-bottom: 10px;width: 50%;line-height: 20px;height: 20px;">
            <a @click="jump_chapter(item.id)" style="cursor: pointer;color: #262626">{{item.title}}</a>
          </div>
        </div>
      </div>


      <div @click="show_install" class="icon" style="cursor:pointer;width: 60px;height: 59px;background-color: #f6f1e7;border-bottom: 1px solid #ccc;text-align: center;margin-top: 10px">
        <i class="iconfont icon-quanjushezhi_o" style="font-size: 30px;"></i>
        <div class="icon_title" style="font-size: 12px;padding-top: 5px">设置</div>
      </div>
<!--      设置详情-->
      <div  v-if="isshow_install === true" style="width: 400px;height: 500px;position: absolute;background-color: #fdfcf6;margin: -140px 0  0 80px;padding: 50px 0 0 30px;box-shadow: 2px 3px 9px #ccc">

        <div class="close_button" @click="isshow_install= false"   style="position: absolute; right: 10px; top: 10px; cursor: pointer;">
          <el-icon><CloseBold /></el-icon>
        </div>
        <div style="font-weight: bold;font-size: 18px;margin-bottom: 35px">设置</div>
        <div>


          <div style="margin-bottom: 30px;" >
            <div style="display: inline-block;margin-right: 20px;font-size: 14px">阅读主题</div>
            <div style="display: inline-block;" v-for="item in color_list" >
              <span :style="{backgroundColor:item}" @click="changeBgcolor(item)" style="cursor: pointer;display: inline-block;border: 1px solid #ccc;width: 40px;height: 40px;border-radius: 50%;margin-right: 20px;vertical-align: middle">
                  <el-icon v-if="item == active_bgColor" style="padding: 12px"><Check /></el-icon>
              </span>

            </div>
          </div>
          <div style="margin-bottom: 30px">
            <div style="display: inline-block;margin-right: 20px;font-size: 14px">正文字体</div>

            <div style="display: inline-block;">
              <span style="display: inline-block;font-family: 微软雅黑;border: 1px solid #000;padding: 10px 15px">微软雅黑</span>
            </div>



          </div>
<!--          <div style="margin-bottom: 30px">字体大小</div>-->
<!--          <div style="margin-bottom: 30px">间距设置</div>-->

        </div>

      </div>



      <div class="icon" @click="return_bookshelf" style="cursor:pointer;width: 60px;height: 59px;background-color: #f6f1e7;border-bottom: 1px solid #ccc;text-align: center;margin-top: 10px">
        <i class="iconfont icon-jiarushujia_01" style="font-size: 25px;"></i>
        <div class="icon_title"   style="font-size: 12px;padding-top: 5px">书架</div>
      </div>
      <div class="icon" @click="return_bookdetail" style="cursor:pointer;width: 60px;height: 60px;background-color: #f6f1e7;text-align: center;margin-top: 10px">
        <i class="iconfont icon-fanhui" style="font-size: 23px;"></i>
        <div class="icon_title" style="font-size: 12px;padding-top: 5px">返回</div>
      </div>

    </div>




    <div v-if="!isLoading" style="width: 55%;background-color: rgba(246, 241, 231,0.5);padding: 80px 60px 30px 60px">
      <div style="font-size: 24px;font-weight: bold;margin-bottom: 30px">{{book.chapter.title}}</div>
      <div class="flex" style="margin-bottom: 40px;font-size: 12px">
        <div >{{book.title}}</div>
        <div style="margin: 0 10px">{{book.author}}</div>
        <div>{{(new Date(book.chapter.updated_time)).pattern("yyyy-MM-dd hh:mm:ss")}}</div>
      </div>
      <div v-html="book.content" style="font-size: 16px"></div>

      <div style="margin-top: 80px;width:55%;padding-left: 25%;padding-right: 25%">

        <button @click="lastChapter" class="btn_last" style="cursor: pointer;border-radius: 20px;
              border: none;width: 150px;background-color: #f6f1e7;height: 30px;margin-right: 100px"  >
          上一章</button>
        <button @click="nextChapter" style="cursor: pointer;border-radius: 20px;
              border: 1px solid #ff7300;width: 150px;height: 30px;background-color: #ff7300;">
          下一章</button>
{{lastChapter_id}}
      </div>
    </div>

  </div>

</template>

<script setup>

import {CloseBold,Check} from '@element-plus/icons-vue'
import { useTitle } from '@vueuse/core'

const title = useTitle()
import { useRoute} from "vue-router";
import {axios} from "../api";
import {nextTick, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router"
import {ElMessage} from "element-plus";

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
//先有一个方法（判断上一章章节id是否存在）     点击事件（如果有上一章章节ID 则进行跳转）
const lastChapter_id = ref(undefined)

const lastChapter = () =>{
  axios.post("/book/last_chapter_id",{
    id: route.params.chapter_id,
    book_id: book_id
  }).then(res =>{
    if(res.data.status_code !== 200) {
      ElMessage.error(res.data.message);
      return;
    }
    lastChapter_id.value = res.data.data.chapter_id

      router.push({ path: `/book/${book_id}/${lastChapter_id.value}` })
  })
}


// 要么，都是在点击的时候判断有没有下一章或者上一章 然后进行跳转
// 要么，根据是否有上一章或者下一章，决定是否显示对应的按钮，按钮点击直接跳转

const nextChapter_id = ref(undefined)

const nextChapter = () =>{
  axios.post("/book/next_chapter_id",{
    id: route.params.chapter_id,
    book_id: book_id
  }).then(res =>{
    if(res.data.status_code !== 200) {
      ElMessage.error(res.data.message);
      return;
    }
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
//弹出目录
let isshow_list = ref(false)
let chapter_list = ref(null)
const show_list = () =>{
  if (isshow_list.value == true){       //判断isshow_list.value的值是否为true
    isshow_list.value = false            //若为true,则把false赋值给isshow_list.value
  }else {                  //isshow_list.value == false  ;如果目录是关闭
    axios.post("/book/details",{     //通过book_id 获取章节目录  并显示目录对话框
      id:book_id
    }).then(res =>{
      chapter_list.value = res.data.data.chapter
      isshow_list.value = true
    })
  }

}
//跳转到指定章节
 const jump_chapter = (id) =>{
   isshow_list.value = false
   router.push({path:`/book/${book_id}/${id}`})

 }

//设置详情

let isshow_install = ref(false)
const show_install = () =>{
  if (isshow_install.value == true){
    isshow_install.value = false
  }else {
    isshow_install.value = true
  }
}

  //改变背景颜色
  var color_list =reactive(['#e8e2d5','#dcc794','#d1e4d1','#d0d0d0','#101113'])
  const active_bgColor = ref('#e8e2d5')
  const changeBgcolor = (color_list) =>{
    active_bgColor.value = color_list
  }



//返回书本详情页
const return_bookdetail = () =>{
  router.push({ path: `/book/${book_id}` })
}
//跳转到我的书架页面
const return_bookshelf = () =>{
  router.push({ path: `/bookshelf` })
}
</script>

<style scoped>
.btn_last:hover{
  background-color: #ccc !important;
}
.icon:hover{
  color: #c45656 !important;
}
.chapter_list>a:hover{
  color: #ed4259 !important;
}
li,ul,ol{
  list-style: none outside none;

  padding: 0;
}
</style>
