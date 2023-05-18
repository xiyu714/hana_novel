<template>
  <div class="header_container">
    <div class="header">
      <img src="@/assets/logo.png" alt="Novel logo" class="header_logo">
      <div class="header_nav">
        <ul>
          <li v-for="item in NavList" >
            <span class="nav_a" :class="{nav_active:item.name === route.name}">
              <router-link :to="item.url" >{{item.title}}</router-link>
            </span>
          </li>
        </ul>
      </div>
      <div class="header_icon">
        <div class="search">
          <input placeholder="请输入书名或者作者名" v-model="likebook" @keyup.enter.native="searchBook"/>
          <span class="icon-search" @click="searchBook">
            <el-icon ><Search /></el-icon>
          </span>
        </div>
        <div style="float: right;padding: 5px 8px 0 8px">
          <div v-if="globalStore.user === undefined">

            <a class="header_font" href="#" @click="login" >登录</a>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
            <a class="header_font" href="#" @click="register" >注册</a>
          </div>
          <div v-else >
            <el-dropdown>
              <div class="el-dropdown-link" style="display: flex;align-items: center">
                <img :src="globalStore.user.avatar" style="width: 32px;height: 32px;border-radius: 50%;">
                <span style="margin:0 7px 0 6px" >{{globalStore.user.name}}</span>
                <el-icon><CaretBottom /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
<!--                  <el-dropdown-item>Action 1</el-dropdown-item>-->
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>

            </el-dropdown>
          </div>

          <Dialog ref="dialog">
            <div style="padding: 30px 40px 30px 40px;">
              <!--  切换登录和注册-->
              <div style="font-size: 25px;font-family: PingFangSC">
                <div style="display: flex; cursor: pointer" >
                  <div class="login" @click="isLogin = true" :class="{active: isLogin}" style="padding-bottom: 8px;margin-right: 30px;">登录</div>
                  <div class="register" @click="isLogin = false" :class="{active: !isLogin}" style="padding-bottom: 8px;">注册</div>
                </div>
<!--                登录-->
                <div v-if="isLogin" class="dialog_desc">
                  <el-form
                      ref="loginForm"
                      label-width="90px"
                      :model="loginUser"
                      class="demo-dynamic"
                      style="margin-top: 55px"
                  >
                    <el-form-item
                        prop="name"
                        label="用户名:"
                        :rules="[
                      {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                      }
                    ]"
                    >
                      <el-input style="width: 220px;" v-model="loginUser.name" />
                    </el-form-item>
                    <el-form-item
                        prop="password"
                        label="密码:"
                        :rules="[
                      {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                      }
                    ]"
                    >
                      <el-input type="password" style="width: 220px;" v-model="loginUser.password" />
                    </el-form-item>
                    <el-button style="width: 220px;margin:8px 0 10px 90px;" @click="login_in(loginForm)">登录</el-button>
                  </el-form>


<!--                  <div class="login_input1">-->
<!--                    <input type="text" placeholder="请输入用户名">-->
<!--                  </div>-->
<!--                  <div class="login_input2">-->
<!--                    <input type="text" placeholder="请输入密码">-->
<!--                  </div>-->
<!--                  <button @click="Login_button">登录</button>-->

                </div>
<!--                注册-->
                <div v-else class="dialog_desc">
                  <el-form
                      ref="registerForm"
                      label-width="90px"
                      :model="registerUser"
                      class="demo-dynamic"
                  >
                    <el-form-item
                        prop="name"
                        label="用户名:"
                        :rules="[
                      {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                      }
                    ]"
                    >
                      <el-input style="width: 220px;" v-model="registerUser.name" />
                    </el-form-item>


                    <el-form-item
                        prop="email"
                        label="邮箱:"
                        :rules="[
                      {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur',
                      },
                      {
                        type: 'email',
                        message: '请输入正确的邮箱格式',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    >
                      <el-input style="width: 220px;" v-model="registerUser.email" />
                    </el-form-item>

                    <el-form-item
                        prop="password"
                        label="密码:"
                        :rules="[
                      {
                        required: true,
                        message: '请输入6-8位密码',
                        trigger: 'blur',
                      },{
                          min:6,
                          max:10,
                          trigger: 'blur',
                          message: '请输入6-8位密码',
                      }
                    ]"
                    >
                      <el-input type="password" style="width: 220px;" v-model="registerUser.password" />
                    </el-form-item>

                    <el-form-item
                        prop="password2"
                        label="确认密码:"
                        :rules="[
                      {
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur',
                      },{
                          validator: confirmPass2,
                          trigger: 'blur'
                      }]"
                    >
                      <el-input type="password" style="width: 220px;" v-model="registerUser.password2" />
                    </el-form-item>


                    <el-button style="width: 220px;margin:8px 0 10px 90px;" @click="register_in(registerForm)">注册</el-button>
                  </el-form>



<!--                  <div class="login_input1">-->
<!--                    <input type="text" placeholder="请输入用户名">-->
<!--                  </div>-->
<!--                  <div class="login_input1">-->
<!--                    <input type="text" placeholder="请输入邮箱">-->
<!--                  </div>-->
<!--                  <div class="login_input1">-->
<!--                    <input type="text" placeholder="请输入密码">-->
<!--                  </div>-->
<!--                  <button>注册</button>-->



                </div>


              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
  <!--    主要显示区域-->

  <div class="banner" v-if="$route.path === '/'">
    <ul class="banner_list">
      <li><img src="https://p1-tt.byteimg.com/origin/novel-static/8687331804a7858aa0ab37dbdb7095dc"></li>
      <li><img src="https://p1-tt.byteimg.com/origin/novel-static/4b1a463683e5e2f34408260b230cab67"></li>
      <li><img src="https://p3-novel.byteimg.com/origin/novel-static/25d7260d2112b1a4055c2fb1c323f132"></li>
      <li><img src="https://p6-novel.byteimg.com/img/novel-static/9a490d64772ab5d9be8f2835dd2e50e8~2880x0.jpeg"></li>
    </ul>
  </div>
  <div v-if="!isLoading" class="main_container">
    <div class="main_notice" v-if="$route.path === '/'">
<!--      专区小框-->
      <div class="notice_left">
        <div class="notice_left_woman">
          <div class="woman_bg">
            <div class="woman_title" @click="$router.push({path:`/library`});">
              <p>女生专区</p>
                <el-icon size="20"><ArrowRightBold /></el-icon>
            </div>
          </div>
        </div>
        <div class="notice_left_man">
          <div class="man_bg">
            <div class="man_title"  @click="$router.push({path:`/library`});">
              <p>男生专区</p>
              <el-icon size="20"><ArrowRightBold /></el-icon>
            </div>
          </div>
        </div>
      </div>
      <!--      公告栏-->
      <div class="notice_right">
        <div class="notice_title">
          <p>最新资讯</p>
          <a href="#">
            更多
            <span >
              <el-icon size="10" ><ArrowRight /></el-icon>
              <el-icon size="10" ><ArrowRight /></el-icon>
            </span>
          </a>

        </div>
<!--        公告内容-->
        <div class="notice_list">
          <a>【热门】《狂飙》官方授权同名小说</a>
          <a>「资讯」我最白：兼职艺术家</a>
          <a>【公告】2022年度盛典获奖名单！</a>
          <a>「资讯」七月未时：儒剑仙</a>
        </div>
      </div>
    </div>
    <div class="home_container" v-if="$route.path === '/'">
      <div class="recommend_block">
<!--        主编力荐-->
        <div class="recommend_left">
          <p class="recommend_left_title">主编力荐</p>
          <div class="recommend_left_booklist">
            <div class="recommend_booklist_first"
              @click="$router.push({ path: `/book/${books[0].id}` }) "
            >
              <div class="booklist_first_top">
                <img :src="books[0].cover_url">
              </div>
              <div class="booklist_first_bottom">
                <div class="title">{{books[0].title}}</div>
                <div class="author">{{books[0].author}}</div>
                <div class="desc">{{books[0].description}}</div>
              </div>
            </div>
            <div class="recommend_booklist_group" >
<!--              小书集-->
              <div class="booklist_one" v-for="item in books.slice(1,7)"
                @click="$router.push({ path: `/book/${item.id}` }) "
                >
                <div class="booklist_one_left">
                  <img :src="item.cover_url">
                </div>
                <div class="booklist_one_right">
                  <div class="title">{{item.title}}</div>
                  <div class="author">{{item.author}}</div>
                  <div class="desc">{{item.description}}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
<!--       本周推荐 -->
        <div class="recommend_right">
          <p class="recommend_left_title">本周推荐</p>
          <div class="recommend_weeklist_group">
            <div class="weeklist_one" v-for="item in books.slice(1,10)"
                 @click="$router.push({ path: `/book/${item.id}` }) "
            >
              <a>{{item.title}}</a>
              <span style="padding-left: -30px">{{item.author}}</span>

            </div>
          </div>
        </div>
      </div>
<!--      男频精选-->
      <div class="man">
        <div class="man_list">
          <p class="recommend_left_title">男频精选</p>
          <div class="manlist">
            <div class="manlist_item" v-for="item in books.slice(11, 17)" @click="$router.push({ path: `/book/${item.id}` }) ">
              <div class="manlist_item_top">
                <img :src="item.cover_url">
              </div>
              <div class="manlist_item_bottom">
                <div class="title">{{ item.title }}</div>
                <div class="author">{{ item.author }}</div>
                <div class="desc">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="man_rank">
          <div class="man_rank_block">
            <div class="rank_block_title">
              周收藏榜
              <a>
                更多
              </a>
            </div>
            <div class="rank_booklist">
              <div class="rank_item" v-for="item in books.slice(17, 27)"
                   @click="$router.push({ path: `/book/${item.id}` }) "
              >
                <a>
                  <div class="rank" style="background-color:rgb(191, 44, 36)"></div>
                  <span class="rank_item_title">
                    {{ item.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="man_rank_block">
            <div class="rank_block_title">
              周点击榜
              <a href="#">
                更多
              </a>
            </div>
            <div class="rank_booklist">
              <div class="rank_item" v-for="item in books.slice(17, 27)"
                   @click="$router.push({ path: `/book/${item.id}` }) "
              >
                <a>
                  <div class="rank" style="background-color:rgb(230, 114, 37)"></div>
                  <span class="rank_item_title">
                    {{ item.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="man_rank_block">
            <div class="rank_block_title">
              潜力作品表
              <a href="#">
                更多
              </a>
            </div>
            <div class="rank_booklist">
              <div class="rank_item" v-for="item in books.slice(17, 27)"
                   @click="$router.push({ path: `/book/${item.id}` }) "
              >
                <a>
                  <div class="rank" style="background-color:rgb(230, 191, 37)"></div>
                  <span class="rank_item_title">
                    {{ item.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--女频精选-->
      <div class="man">
        <div class="man_list">
          <p class="recommend_left_title">女频精选</p>
          <div class="manlist">

            <div class="manlist_item" v-for="item in books.slice(0, 6)" >
              <div class="manlist_item_top">
                <img :src="item.cover_url">
              </div>
              <div class="manlist_item_bottom">
                <div class="title">{{ item.title }}</div>
                <div class="author">{{ item.author }}</div>
                <div class="desc">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="man_rank">
          <div class="man_rank_block">
            <div class="rank_block_title">
              周收藏榜
              <a>
                更多
              </a>
            </div>
            <div class="rank_booklist">
              <div class="rank_item" v-for="item in books.slice(17, 27)"
                   @click="$router.push({ path: `/book/${item.id}` }) "
              >
                <a>
                  <div class="rank" style="background-color:rgb(191, 44, 36)"></div>
                  <span class="rank_item_title">
                    {{ item.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="man_rank_block">
            <div class="rank_block_title">
              周点击榜
              <a href="#">
                更多
              </a>
            </div>
            <div class="rank_booklist">
              <div class="rank_item" v-for="item in books.slice(17, 27)"
                   @click="$router.push({ path: `/book/${item.id}` }) "
              >
                <a>
                  <div class="rank" style="background-color:rgb(230, 114, 37)"></div>
                  <span class="rank_item_title">
                    {{ item.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="man_rank_block">
            <div class="rank_block_title">
              潜力作品表
              <a href="#">
                更多
              </a>
            </div>
            <div class="rank_booklist">
              <div class="rank_item" v-for="item in books.slice(17, 27)"
                   @click="$router.push({ path: `/book/${item.id}` }) "
              >
                <a>
                  <div class="rank" style="background-color:rgb(230, 191, 37)"></div>
                  <span class="rank_item_title">
                    {{ item.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <RouterView />
  </div>
  <div class="footer">
    footer
  </div>

</template>

<script setup>
import { useTitle } from '@vueuse/core'

const title = useTitle("小说网")

import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import {reactive, ref,getCurrentInstance} from "vue";
import {axios} from "../api";
import Dialog from "../component/Dialog.vue";
import {useGlobalStore} from "../store";
import {Search,ArrowRightBold,ArrowRight,CaretBottom} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";


const globalStore = useGlobalStore();

const router = useRouter()
const route = useRoute()

const { proxy } = getCurrentInstance();
//数据

//搜索功能
const likebook = ref()
const searchBook = () =>{
  axios.post('/book/inquire',{
    likebook:likebook.value
  }).then(res =>{
    //query:{参数名：参数值}
    router.push({path:'/library',query:{likebook:likebook.value}})
  })
}


//退出登录
const logout = async () =>{
  await axios.post("/user/logout")
  globalStore.user = undefined
}


// let users = ref([])
//判断有没有登录
axios.post("/user/base_info").then(res =>{
  console.log(res)
  if(res.data.status_code === 200){
    globalStore.user = res.data.data
  }else {
    globalStore.user = undefined
  }
})


//登录
const loginForm = ref(null);
const loginUser = reactive({
  name:'',
  password:''
})


let isLogin = ref(true)
let dialog = ref(null)
const login_in = (loginForm) =>{
  loginForm.validate((valid) =>{
    if(valid){
      axios.post("/user/login",loginUser)
      .then(res =>{
        if(res.data.status_code === 200){
          loginForm.resetFields()
          proxy.$message({
            message:'登陆成功',
            type:"success"
          });
          // 保存登录状态
          globalStore.user = res.data.data
          // 关闭
          dialog.value.dialog_visible = false
        }else {
          ElMessage.error(res.data.message)
        }
      })
    }
  })
}


//注册
const registerForm = ref(null);
const registerUser = reactive({
  email:'',
  name:'',
  password:'',
  password2:''
})

const register_in = (registerForm) =>{
  registerForm.validate((valid) => {
    if(valid){
      axios.post("/user/register",registerUser)
          .then(res => {
            //注册成功
            console.log(res)
            if(res.data.status_code === 200){
              registerForm.resetFields()
              proxy.$message({
                message:'账号注册成功，请登录！',
                type:"success"
              });
              isLogin.value = true
            }else {
              proxy.$message.error({
                message:res.data.message
              });
            }
          })
          .catch(err => {
            console.log(err)
            proxy.$message.error("注册失败！")
          });
    }else {
      proxy.$message({
        type:"error",
        message:"表单填写错误"
      });
      return false
    }
  })
}

//校验password2
const confirmPass2 = (rule,value, callback) =>{
    if (value !== registerUser.password){
      callback(new Error('两次输入的密码不一致！'))
    }else {
      callback()
    }
}

const currentPage = ref() //当前位于哪页
const pageSize = ref()  //一页显示几条

let books = ref([])
let isLoading = ref(true)
axios.post("book/list",{
  currentPage:currentPage.value,
  pageSize:pageSize.value
}).then(({data}) => {
  books.value = data.data.books;
  console.log(books.value)
}).finally(() => isLoading.value = false)

var NavList = reactive([
  {
    title:'首页',
    url:'/',
    name: "home"
  },
  {
    title:'书库',
    url:'/library',
    name: "library"
  },{
    title:'排行榜',
    url:'/ranking',
    name: "ranking"
  },{
    title: '我的书架',
    url:'/bookshelf',
    name: "bookshelf"
  }
])


//登录
function login(){
  isLogin.value = true
  dialog.value.dialog_visible = true
}
function Login_button(){
  dialog.value.dialog_visible = false
  //消息弹窗
}
//注册
function register(){
  isLogin.value = false
  dialog.value.dialog_visible = true
}
</script>

<style scoped>

/*.example-showcase .el-dropdown-link {*/
/*  cursor: pointer;*/
/*  color: var(--el-color-primary);*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
.nav_active > a{
  color: chocolate !important;
  font-weight: bold;
}
.nav_active {
  border-bottom:1px solid rgb(250, 103, 37) ;
}
.header_container{
  height: 60px;
  border-bottom: 1px solid #DCDCDC ;
}
.header{
  margin: 0 9%;
}
.header_logo{
  height: 50px;
  width: 170px;
  display: inline;
  float: left;
  margin-right: 6%;
}
.header_nav{
  float: left;
  /*width: 500px;*/
  height: 60px;
}
.header_nav ul{
  padding: 0;
  margin: 0;
  list-style-type: none;
  /*background-color: chocolate;*/
}
.header_nav ul li{
  float: left;
  /*width: 90px;*/
  margin-right: 100px;
}

.nav_a{
  margin-top: 17px;
  height: 43px;
  display: inline-block;
  text-align: center;
  letter-spacing: 3px;
}
/*.router-link-active {*/
/*  text-decoration: none;*/
/*  color: black;*/
/*}*/
/*a {*/
/*  text-decoration: none;*/
/*  color: black;*/
/*}*/
a:hover{
  color: chocolate;
}

.search{
  float: left;
  /*border: 1px solid #ccc;*/
  border-radius: 25px;
  padding-right: 25px;
  height: 28px;
  background-color:#fafafa;
  margin-right: 60px
}
.search input{
  margin: 6px 3px 0px 14px;
  border: 0;
  outline: none;
  width: 140px;
  background-color:#fafafa;
  color: #a4a4a4;
}
.icon-search{
  margin-top: 5px;
  position: absolute;
  cursor: pointer;
  fill: #000;
}
.icon-search :hover{
  color: chocolate;
}

.active{
  color: chocolate;
  border-bottom: 2px solid chocolate;
}
.dialog_desc{
  margin-top: 20px;
  /*background-color: chocolate;*/
}
.login_input1,.login_input2{
  width: 100%;
  /*float: left;*/
  border: 1px solid #ccc;
  border-radius: 5px;
  /*padding-right: 25px;*/
  height: 40px;
  /*background-color:#fafafa;*/
  margin-right: 60px;
  margin-top: 20px;
}

.login_input1 input,.login_input2 input{
  width: 94%;
  height: 23px;
  margin-left: 10px;
  outline: none;
  border: 0;
  font-size: 16px;
  /*background-color:#fafafa;*/
}

.dialog_desc button{
  width: 100%;
  /*height: 40px;*/
  margin-top: 20px;
  border-radius: 6px;
  /*border-color: #fafafa;*/
  /*background-color: chocolate;*/
  /*color: #fafafa;*/

  background-color: rgb(250, 103, 37);
  border: none;
  color: white;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;




}

.header_icon{
  float: right;
  padding: 10px 12px 12px 12px;
  margin-left: 5px;
}
.header_font{
  font-size: 15px;
}

.banner{
  /*float: left;*/
  --width: 1519px;
  width: var(--width) ;

  height: 300px;
  /*margin: 50px auto;*/
  position: relative;
  overflow: hidden;
}
.banner img{
  width: 1600px;
  height: 300px;
}
.banner ul{
  list-style: none;
  width: calc(var(--width) *4);
  position: absolute;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  animation: mymove 10s linear 1s infinite alternate;
}
.banner ul li{
  width: var(--width) ;
  height: 300px;
  float: left;
  overflow: hidden;
}

@keyframes mymove {
  0%,20%{left: 0;}
  25%,45%{left:  calc(0px - var(--width));}
  50%,70%{left:  calc(0px - (var(--width) * 2));}
  75%,100%{left:  calc(0px - (var(--width) * 3));}
}

.main_container{
  /*margin: 0px 9%;*/
}

.main_notice{
  display: flex;
  /*background-color: maroon;*/
  height: 250px;
  padding: 0 20px;
  margin: 0px 9%;
}
.notice_left{
  position: relative;
  /*overflow: hidden;*/
  width: 680px;
  height: 250px;
  border-radius: 15px;
  top: -30px;
  flex-shrink: 0;
}
.notice_left_woman{
  width: 340px;
  height: 250px;
  background-color: #fbf6ea;
  border-radius: 15px 0 0 15px;
  /*overflow: hidden;*/
  /*float: left;*/
  /*display: flex;*/
}
.woman_bg{
  width: 340px;
  height: 250px;
  position: absolute;
  background-image: url("https://lf-cdn-tos.bytescm.com/obj/static/toutiao/muye/build/f150893cb27a54c4a9d5aff0f85c2ae9.png");
  background-size: 340px 250px;
  background-repeat: no-repeat;
}
.woman_title,.man_title{
  width: 22px;
  display: block;
  font-size: 22px;
  margin-left: 40px;
  margin-top: -4px;
  position: relative;
  cursor: pointer;
}
.woman_title p,.man_title p{
  margin-bottom: 2px;
}
.woman_title:hover,.man_title:hover{
  color: chocolate;
}
.notice_left_man{
  position: relative;
  width: 340px;
  height: 250px;
  background-color: #eaf5f4;
  top: -250px;
  left: 340px;
  border-radius:0 15px 15px 0;
}
.man_bg{
  width: 340px;
  height: 250px;
  position: absolute;
  background-image: url("https://lf-cdn-tos.bytescm.com/obj/static/toutiao/muye/build/d69cc444ef5cd81be9eccb1791591bbf.png");
  background-size: 340px 250px;
  background-repeat: no-repeat;
}

.notice_right{
  position: relative;
  margin-left: 70px;
  background-color: #fcfcfc;
  border-radius: 15px;
  width: 380px;
  height: 200px;
  padding: 20px 40px 30px 40px;
  top: -30px;
  overflow: hidden;
  flex-shrink: 0;
}
.notice_title{
  float: left;
  width: 380px;
  margin-bottom: 20px;
}
.notice_title p{
  margin: 0;
  font-size: 20px;
  display: inline;
}
.notice_title a{
  margin-top: 6px;
  float: right;
  font-size: 14px;
}
.notice_list{
  font-size: 14px;
  cursor: pointer;
  float: left;
}
.notice_list a{
  display: flex;
  margin-top: 16px;
  font-size: 14px;
}
.home_container{
  position: relative;
  width: 1220px;
  /*margin: 0 auto;*/
  color: #333;
  padding: 0 20px;
  margin: 0px 9%;
}
.recommend_block{
  margin-top: 40px;
  /*margin-bottom: 40px;*/
  height: 550px;
  display: flex;
  justify-content: space-between;

}
.recommend_left{
  width: 870px;
  height: 100%;
  padding: 0;
}
.recommend_left_title{
  font-size: 20px;
  margin: 0;
  padding-bottom: 15px;

  border-bottom: 1px #ccc solid;
}
.recommend_left_booklist{
  width: 870px;
  height: calc(100% - 82px);
  margin-top: 20px;
  /*background-color: blue;*/
}
.recommend_booklist_first{
  margin-top: 20px;
  width: 214px;
  height: 415px;
  background-color: #f4f4f4;
  float: left;
  border-radius: 3px;
  cursor: pointer;
}
.booklist_first_top{
  width: 214px;
  height: 295px;
  border-radius: 3px;
}
.booklist_first_top img{
  /*margin-left: 4px;*/
  width: 214px;
  height: 295px;
  border-radius: 3px;
  /*box-shadow: -3px 0px 2px #d9c0a0;*/
}
.booklist_first_bottom{
  width: 190px;
  padding: 12px 12px 15px 12px;
}
.booklist_first_bottom .title{
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.booklist_first_bottom .author{
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  font-weight: 400;
  line-height: 17px;
}
.booklist_first_bottom .desc{
  width: 190px;
  height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;
  font-size: 12px;
  line-height: 17px;
  margin-top: 6px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.recommend_booklist_group{
  display: inline-block;
  width: 550px;
  height: 435px;
  padding-left: 40px;
  margin-left: 66px;
}
.booklist_one{
  width: 252px;
  display: inline-block;
  vertical-align: top;
  height: 117px;
  position: relative;
  cursor: pointer;
  margin-right: 22px;
  margin-top: 20px;
}
.booklist_one_left{
  position: relative;
  float: left;
  width: 90px;
  height: 117px;
}
.booklist_one_left img{
  width: 90px;
  height: 117px;
}
.booklist_one_right{
  position: relative;
  float: left;
  width: 150px;
  height: 102px;
  cursor: pointer;
  /*background-color: darkgreen;*/
  padding-left: 10px;
}
.booklist_one_right .title{
  font-size: 18px;
  padding-top: 6px;
  cursor: pointer;
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;


}
.booklist_one_right .author{
  font-size: 12px;
  margin-top: 10px;
  color: #666;
  font-weight: 400;
  line-height: 17px;
}
.booklist_one_right .desc{
  width: 150px;
  /*height: 50px;*/
  font-size: 12px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.recommend_right{
  width: 250px;
  height: 500px;
}
.recommend_weeklist_group{
  padding-top: 25px;
}
.weeklist_one{
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 14px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weeklist_one span{
  width: 90px;
  color: #999;
  display: inline-block;
  white-space: nowrap;
}
.weeklist_one a{
  width: 100%;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author_wrapper{
  width: 1220px;
  height: 260px;
  /*background-color: blue;*/
  overflow: hidden;
  margin: 0 auto;
}

.author_item{
  width: 168px;
  height: 180px;
  margin-right: 15px;
  /*background-color: maroon;*/
  vertical-align: middle;
  text-align: center;
  line-height: 180px;
  float: left;
  cursor: pointer;
}
@keyframes authormove {
  from{right: 0px;}
  to{right: 600px}
}
.author_avatar{
  width: 72px;
  height: 72px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: inline-block;
  top: -24px;
}
.author_avatar img{
  display: flex;
  width: 72px;
  height: 72px;
}
.author_bottom{
  position: absolute;
  bottom: 0;
  width: 168px;
  height: 150px;
  border-radius: 12px;
}
.author_name{
  cursor: pointer;
  outline: none;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  text-align: center;
  margin-top: 68px;
  color: #000;
}
.author_desc{
  cursor: pointer;
  outline: none;
  padding: 0;
  box-sizing: border-box;
  width: 140px;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  text-align: center;
  margin-top: 6px;
  color: #666;
}
.man{
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0;
  box-sizing: border-box;

}
.manlist{
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
}

.manlist_item{
  width: 128px;
  height: 270px;
  display: inline-block;
  text-align: left;
  cursor: pointer;
  margin-right: 90px;
}
.manlist_item_top{
  width: 120px;
  height: 156px;
  border-radius: 3px;
}
.manlist_item_top img{
  width: 120px;
  height: 156px;
  border-radius: 3px;
}
.manlist_item_bottom{
  width: 128px;
  height: 96px;
  padding-top: 18px;
}
.manlist_item_bottom .title{
  width: 100%;
  font-size: 18px;
  overflow: hidden;
  line-height: 28px;
  font-weight: 500;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.manlist_item_bottom .author{
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  font-weight: 400;
  line-height: 17px;
}
.manlist_item_bottom .desc{
  height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;
  font-size: 12px;
  margin-top: 10px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.man_rank{
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  /*background-color: blue;*/
}
.man_rank_block{
  width: 27%;
  /*height: 640px;*/
  padding: 17px 1px;
  display: inline-block;
  vertical-align: top;
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


.footer{
  width: 100%;
  height: 60px;
  text-align: center;
  padding-top: 40px;
  background-color: rgb(250, 250, 250);
}

</style>
