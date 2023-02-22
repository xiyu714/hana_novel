<template>
  <div class="header_container">
    <div class="header">
      <img src="@/assets/logo.png" alt="Novel logo" class="header_logo">
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

  <div class="banner" v-if="this.$route.path === '/'">
    <ul class="banner_list">
      <li><img src="https://p1-tt.byteimg.com/origin/novel-static/8687331804a7858aa0ab37dbdb7095dc"></li>
      <li><img src="https://p1-tt.byteimg.com/origin/novel-static/4b1a463683e5e2f34408260b230cab67"></li>
      <li><img src="https://p3-novel.byteimg.com/origin/novel-static/25d7260d2112b1a4055c2fb1c323f132"></li>
      <li><img src="https://p6-novel.byteimg.com/img/novel-static/9a490d64772ab5d9be8f2835dd2e50e8~2880x0.jpeg"></li>
    </ul>
  </div>
  <div class="main_container">
    <div class="main_notice" v-if="this.$route.path === '/'">
<!--      专区小框-->
      <div class="notice_left">
        <div class="notice_left_woman">
          <div class="woman_bg">
            <div class="woman_title">
              <p>女生专区</p><icon-right-c theme="outline" size="20" fill="#333"/>
            </div>
          </div>
        </div>
        <div class="notice_left_man">
          <div class="man_bg">
            <div class="man_title">
              <p>男生专区</p><icon-right-c theme="outline" size="20" fill="#333"/>
            </div>
          </div>
        </div>
      </div>
      <!--      公告栏-->
      <div class="notice_right">
        <div class="notice_title">
          <p>最新资讯</p>
          <a href="#">
            更多<icon-right theme="outline" size="12" fill="#333"/>
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
    <div class="home_container" v-if="this.$route.path === '/'">
      <div class="recommend_block">
<!--        主编力荐-->
        <div class="recommend_left">
          <p class="recommend_left_title">主编力荐</p>
          <div class="recommend_left_booklist">
            <div class="recommend_booklist_first">
              <div class="booklist_first_top">
                <img src="https://p1-tt.byteimg.com/img/novel-pic/2e9dbaef02e682e88dd606aee1ff6e5d~600x828.jpg">
              </div>
              <div class="booklist_first_bottom">
                <div class="title">特工易冷</div>
                <div class="author">骁骑校</div>
                <div class="desc">爱国好武功好好公关稿考拉海购规划阿罗汉果考入，这边仓库</div>
              </div>
            </div>
            <div class="recommend_booklist_group" >
<!--              小书集-->
              <div class="booklist_one"  v-for="item in booklist1">
                <div class="booklist_one_left">
                  <img :src="item.url">
                </div>
                <div class="booklist_one_right">
                  <div class="title">{{item.title}}</div>
                  <div class="author">{{item.author}}</div>
                  <div class="desc">{{item.desc}}</div>
                </div>
              </div>




            </div>
          </div>
        </div>
        <div class="recommend_right">

        </div>
      </div>
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
    var booklist1 = reactive([
      {
        title:'反骨',
        url:'https://p1-tt.byteimg.com/img/novel-pic/cfedd22da7b04e2692957c005c533ef9~180x234.jpg',
        author:'Aarhus',
        desc:'案件改哈甲方根据卡拉改变回家萨芬故该规范客流高'
      },{
        title:'反骨',
        url:'https://p1-tt.byteimg.com/img/novel-pic/cfedd22da7b04e2692957c005c533ef9~180x234.jpg',
        author:'Aarhus',
        desc:'案件改哈甲方根据卡拉改变回家萨芬故该规范客流高'
      },{
        title:'反骨',
        url:'https://p1-tt.byteimg.com/img/novel-pic/cfedd22da7b04e2692957c005c533ef9~180x234.jpg',
        author:'Aarhus',
        desc:'案件改哈甲方根据卡拉改变回家萨芬故该规范客流高'
      },{
        title:'反骨',
        url:'https://p1-tt.byteimg.com/img/novel-pic/cfedd22da7b04e2692957c005c533ef9~180x234.jpg',
        author:'Aarhus',
        desc:'案件改哈甲方根据卡拉改变回家萨芬故该规范客流高'
      },{
        title:'反骨',
        url:'https://p1-tt.byteimg.com/img/novel-pic/cfedd22da7b04e2692957c005c533ef9~180x234.jpg',
        author:'Aarhus',
        desc:'案件改哈甲方根据卡拉改变回家萨芬故该规范客流高'
      },{
        title:'反骨',
        url:'https://p1-tt.byteimg.com/img/novel-pic/cfedd22da7b04e2692957c005c533ef9~180x234.jpg',
        author:'Aarhus',
        desc:'案件改哈甲方根据卡拉改变回家萨芬故该规范客流高'
      }
    ])
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
      // ,{
      //   title: '话题',
      //   url:'/'
      // }
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
      register,
      booklist1
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

.banner{
  float: left;
  width: 1536px;
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
  width: 6400px;
  position: absolute;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  animation: mymove 10s linear 1s infinite alternate;
}
.banner ul li{
  width: 1600px;
  height: 300px;
  float: left;
}
@keyframes mymove {
  0%,20%{left: 0px;}
  25%,45%{left: -1600px;}
  50%,70%{left: -3200px;}
  75%,100%{left: -4800px;}
}

.main_container{
  margin: 0px 9%;
}

.main_notice{
  display: flex;
  /*background-color: maroon;*/
  height: 250px;
  padding: 0 20px;
}
.notice_left{
  position: relative;
  overflow: hidden;
  width: 680px;
  height: 250px;
  border-radius: 15px;
  top: -30px;
}
.notice_left_woman{
  width: 340px;
  height: 250px;
  background-color: #fbf6ea;
  float: left;
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
  float: left;
  background-color: #eaf5f4;
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
  margin-left: 5%;
  background-color: #fcfcfc;
  border-radius: 15px;
  width: 380px;
  height: 200px;
  padding: 20px 40px 30px 40px;
  /*float: right;*/
  top: -30px;
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
  margin: 0 auto;
  color: #333;
  padding: 0 20px;
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
  height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;
  font-size: 12px;
  line-height: 17px;
  margin-top: 6px;
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
  font-size: 12px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  text-align: left;
}

</style>