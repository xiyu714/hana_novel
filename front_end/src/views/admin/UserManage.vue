<template>
  <div style="margin-bottom: 15px;height: 30px">
    <div style="float: left">
      <el-input style="width: 300px;margin-right: 12px" placeholder="请输入用户名"
                v-model="likeUsername"></el-input>
      <el-button type="primary" @click="getUserlist">
        搜索
      </el-button>
    </div>
    <div style="float: right">
      <el-button type="success">
        导出数据
      </el-button>
      <el-button type="primary" @click="dialogAddUser = true">添加用户</el-button>
<!--      添加用户弹窗-->
      <el-dialog v-model="dialogAddUser" >
        <el-form
            ref="AddForm"
            label-width="90px"
            :model="AddUser"
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
            <el-input style="width: 220px;" v-model="AddUser.name" placeholder="请输入用户名"/>
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
            <el-input style="width: 220px;" v-model="AddUser.email" placeholder="请输入邮箱"/>
          </el-form-item>

<!--          <el-form-item-->
<!--              prop="permission"-->
<!--              label="用户权限:"-->
<!--              :rules="[-->
<!--                      {-->
<!--                        required: true,-->
<!--                        message: '请选择用户权限',-->
<!--                        trigger: 'blur'-->
<!--                      }-->
<!--                    ]"-->
<!--          >-->
<!--            <el-select v-model="AddUser.permission" placeholder="请选择用户权限"  style="width: 220px;">-->
<!--              <el-option label="普通用户" value="user"></el-option>-->
<!--              <el-option label="管理员" value="admin"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->


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
            <el-input type="password" style="width: 220px;" v-model="AddUser.password" placeholder="请输入6-8位密码"/>
          </el-form-item>
<!--          <el-button style="width: 220px;margin:8px 0 10px 90px;" @click="Add_User(AddForm)">注册</el-button>-->
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogAddUser = false">取消</el-button>
            <el-button type="primary" @click="dialogAddUser = false;Add_User(AddForm)" >
              添加用户
            </el-button>
          </span>
        </template>

      </el-dialog>

    </div>
  </div>
<!--  用户信息表格-->
  <div>
    <el-table
        :data="usersData"
        stripe
        border
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0.8)"
        style="width: 100%;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="用户ID" width="150" />
      <el-table-column prop="name" label="用户名" width="150" />
      <el-table-column prop="email" label="邮箱" width="180"/>
<!--      <el-table-column prop="permission" label="用户权限" width="180" />-->
      <el-table-column prop="avatar" label="头像" width="70" >
        <template #default="scope">
          <div style="display: flex;align-items: center">
            <img :src="scope.row.avatar" style="width: 32px;height: 32px;border-radius: 50%;">
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="permission" label="用户状态" width="180" >

      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" width="220" />

      <el-table-column fixed="right"  label="操作">
        <template #default="scope">
          <el-button style="padding: 3px;width: 70px;margin-right: 10px" @click="dialogAddUser = true;Edit_User(scope.$index, scope.row)" type="primary">编辑</el-button>
          <el-button style="padding: 3px;width: 70px" type="danger" @click="Delete_User(scope.$index, scope.row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
<!--    编辑弹窗-->

  </div>
</template>

<script setup>
import {reactive, ref, getCurrentInstance, onMounted} from "vue";
import {useRoute} from "vue-router";
import {axios} from "../../api";
import {Delete} from '@element-plus/icons-vue'

//搜索功能
// const likeUsername = ref()
//
// const searchUserlist = () =>{
//   axios.post("/user/admin/list",{
//     name:likeUsername.value
//   }).then(res =>{
//
//   })
// }


//编辑用户
const Edit_User = (scope,AddUser) =>{
  axios.post("/user/edit",{
    id:scope.row.id,
    name:scope.row.name,
    email:scope.row.email
  }).then(res =>{
    proxy.$message({
      message:'编辑成功！',
      type:"success"
    });
  })

}


//删除用户
const Delete_User = (index, row) =>{
  axios.post("/user/delete",{
    id:row.id
  })
      .then(res =>{
        proxy.$message({
          message:'删除成功！',
          type:"success"
        });
        getUserlist()
      })
}


//注册弹窗
const dialogAddUser = ref(false)
const { proxy } = getCurrentInstance();
const AddForm = ref(null);
const AddUser = reactive({
  email:'',
  name:'',
  password:''
})

const Add_User = (AddForm) =>{
  AddForm.validate((valid) => {
    if(valid){
      axios.post("/user/register",AddUser)
          .then(res => {
            //注册成功
            console.log(res)
            if(res.data.status_code === 200){
              AddForm.resetFields()
              proxy.$message({
                message:'账号注册成功，请登录！',
                type:"success"
              });
              getUserlist()
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





const value = ref(true)
const usersData =ref([])


const likeUsername = ref()

const getUserlist = () =>{
  //获取用户信息数据
  axios.post("/user/admin/list",{
    //给后端传likeUsername的值（搜索值）
    likeUsername:likeUsername.value
  }).then(({data}) =>{
    //从后端传过来的数据赋值给列表
    usersData.value = data.data
  })
}

onMounted(()=>{
  getUserlist()
})
</script>

<style scoped>

</style>