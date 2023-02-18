<template>
<!--  <div class="nav_container">-->
    <div class="nav">
      <div class="nav_logo">
        <img src="../assets/logo.png" alt="Novel logo">
      </div>
      <ul>
        <li v-for="item in NavList" >
          <span class="nav_a">
            <router-link to="item.url">{{item.title}}</router-link>
          </span>
        </li>
      </ul>

    </div>
<!--  </div>-->
</template>

<script setup>
import {reactive} from "vue";

var NavList = reactive([
  {
    title:'首页',
    url:'/'
  },
  {
    title:'书库',
    url:'/'
  }
])
</script>

<style scoped>
.nav{
  margin: 0 10%;
  /*background-color: chartreuse;*/
  display: flex;
}
.nav_logo{
  /*display: inline;*/
  float: left;
  padding-top: 18px;
  margin-right: 8%;
}
.nav_logo img{
  display: block;
  width: 140px;
  height: 35px;
}
.nav ul{
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.nav ul li{
  float: left;
  width: 80px;
}
.nav_a{
  padding-top: 25px;
  height: 43px;
  display: inline-block;
  text-align: center;

  color: black;
}
.nav_a:hover{
  /*background-color: maroon;*/
  color: chocolate;
  border-bottom:3px solid orange ;
  font-weight: bold
}
.router-link-active {
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
  color: black;
}
</style>
