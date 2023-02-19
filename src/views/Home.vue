<template>
    <div class="header_container">
      <div class="header">
        <img src="src/assets/logo.png" alt="Novel logo" class="header_logo">
        <div class="header_nav">
          <ul>
            <li v-for="item in NavList" >
            <span class="nav_a">
              <router-link :to="item.url">{{item.title}}</router-link>
            </span>
            </li>
          </ul>
        </div>
        <div class="header_icon">
          <div class="search">
            <input placeholder="请输入书名或者作者名" />
            <span class="icon-search">
              <icon-search theme="outline" size="18" fill="#000"/>
            </span>
          </div>
          <div style="float: right;padding: 5px 8px 0 8px">
            <a class="header_font" href="#" @click="login" >登录</a>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
            <a class="header_font" href="#" @click="register" >注册</a>
          </div>
        </div>
      </div>
    </div>
<!--    主要显示区域-->
  <div class="main_container">
    <div class="banner" v-if="this.$route.path === '/'">
      <img style="width: 100%" src="https://p3-novel.byteimg.com/origin/novel-static/e7b2b79a8a53a0043505eea55a15c6d7">
    </div>





    <RouterView />
  </div>

</template>

<script>
import {reactive} from "vue";
export default {
  name:'Home',
  setup(){
    //数据
    var NavList = reactive([
      {
        title:'首页',
        url:'/'
      },
      {
        title:'书库',
        url:'/library'
      },{
        title:'排行榜',
        url:'/ranking'
      }, {
        title: '分类',
        url:'/sort'
      },{
        title: '作家专区',
        url:'/authorcolumn'
      }
    ])


    //方法

    //登录
    function login(){
      alert("登录")
    }
    //注册
    function register(){
      alert("注册")
    }

    //返回对象
    return{
      NavList,
      login,
      register
    }
  }
}
</script>

<style scoped>
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
  width: 500px;
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
  margin-right: 50px;
}
.nav_a{
  margin-top: 17px;
  height: 43px;
  display: inline-block;
  text-align: center;
  letter-spacing: 3px;
}
.router-link-active {
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
  color: black;
}
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
/*.icon-search a:hover{*/
/*  fill: chocolate;*/
/*}*/

.header_icon{
  float: right;
  padding: 10px 12px 12px 12px;
  margin-left: 5px;
}
.header_font{
  font-size: 15px;
}
</style>