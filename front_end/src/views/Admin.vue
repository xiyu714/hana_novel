<template>
  <div v-if="globalStore.user === undefined" style="height: 100vh;background-color: #337ecc">
      <div style="font-size: 25px; position: absolute; top: 25%;left: 35%;width: 450px;height: 300px;background-color: #fafafa" >
        <div style="display: flex; cursor: pointer" >
          <div class="login"
               style="padding-bottom: 8px;padding-top: 10px;padding-left: 10px;color: chocolate;">
            登录</div>
        </div>
        <div v-if="isLogin" class="dialog_desc" style=" margin-top: 10px;margin-left: 40px">
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

        </div>
      </div>
  </div>
  <div v-else  style="height: 100vh;">
    <el-container>
      <el-header style="height: 60px;border-bottom: 1px solid #ccc;padding: 0;float: left">
        <div style="width: 180px;padding: 15px 0 20px 20px;font-size: 20px;float: left">小说后台管理系统</div>
        <div style="float: right;margin: 20px 30px 20px 0">
<!--          <el-icon><BellFilled /></el-icon>-->
<!--          <span style="margin:0 20px 0 30px">{{ global }}</span>-->
<!--          <el-icon><Avatar /></el-icon>-->
          <el-dropdown>
            <div class="el-dropdown-link" style="display: flex;align-items: center">
              <img :src="globalStore.user.avatar" style="width: 32px;height: 32px;border-radius: 50%;">
              <span style="margin:0 7px 0 6px" >{{globalStore.user.name}}</span>
              <el-icon><CaretBottom /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>

          </el-dropdown>

        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: calc(100vh - 60px) ;overflow-x: hidden;border-right: 1px solid #a8afc0">
          <el-menu
              @select="on_select"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>小说管理</span>
              </template>
              <el-menu-item index="/addnovel_manage">添加小说</el-menu-item>
              <el-menu-item index="/novel_manage">小说增删改查</el-menu-item>
              <el-menu-item index="/tagnovel_manage">小说标签管理</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/user_manage">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>

          </el-menu>

        </el-aside>
        <el-main>

          <div style="font-size: 25px" v-if="$route.path === '/admin'">
            欢迎来到小说后台管理系统
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Dialog from "../component/Dialog.vue";
import {getCurrentInstance, reactive, ref} from 'vue'
import {useRouter} from "vue-router"
import {useRoute} from "vue-router"
import {
  Menu as IconMenu,
  Location,
  CaretBottom
} from '@element-plus/icons-vue'
import {useGlobalStore} from "../store";
import {axios} from "../api";

let router = useRouter();
const route = useRoute()

const activeIndex = ref('1')
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const on_select = (index) => {
  console.log(index)
  router.push("/admin" + index)
}


const globalStore = useGlobalStore();
const { proxy } = getCurrentInstance();

//后台登录
const loginForm = ref(null);
const loginUser = reactive({
  name:'',
  password:''
})
let isLogin = ref(true)
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
              // dialog.value.dialog_visible = false
            }
          })
    }
  })
}

//退出登录
const logout = async () =>{
  await axios.post("/user/logout")
  globalStore.user = undefined
}

// //判断有没有登录
// const { proxy } = getCurrentInstance();
// const globalStore = useGlobalStore();
// if(globalStore.user === undefined){
//   proxy.$message({
//     message:'请先登录',
//     type:"error"
//   });
// }
</script>

<style scoped>
.dialog_desc button{
  width: 100%;
  margin-top: 20px;
  border-radius: 6px;
  background-color: rgb(250, 103, 37);
  border: none;
  color: white;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

}
</style>