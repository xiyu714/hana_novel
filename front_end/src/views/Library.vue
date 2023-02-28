<template>
  <div class="library_container">
    <div class="library_typeblock">
      <div class="block">
        <div class="block_condition">
          <div class="block_title">读者：</div>
          <div class="block_item">全部</div>
          <div class="block_item">男生</div>
          <div class="block_item">女生</div>
        </div>
      </div>
      <div class="block">
        <div class="block_condition">
          <div class="block_title">分类：</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
        </div>
      </div>
      <div class="block">
        <div class="block_condition">
          <div class="block_title">状态：</div>
          <div class="block_item">全部</div>
          <div class="block_item">已完结</div>
          <div class="block_item">连载中</div>
        </div>
      </div>
      <div class="block">
        <div class="block_condition">
          <div class="block_title">字数：</div>
          <div class="block_item">全部</div>
          <div class="block_item">30万以下</div>
          <div class="block_item">30-50万</div>
          <div class="block_item">50-100万</div>
          <div class="block_item">100-200万</div>
          <div class="block_item">200万以上</div>
         </div>
      </div>
    </div>
<!--    主要内容-->
    <div class="library_main">
      <div class="main_type">
        <div class="type">
          <div class="type_title">最热</div>
          <div class="type_title">最新</div>
          <div class="type_title">字数</div>
        </div>
      </div>
<!--      <div class="main_block">-->
<!--        -->
<!--      </div>-->
    </div>
<!--&lt;!&ndash;    分页&ndash;&gt;-->
<!--    <div>-->

<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "Library"
}
</script>

<style scoped>
.library_container{
  padding: 40px;
  background-color: chocolate;
  margin: 0 9%;
}
.library_typeblock{
  padding: 12px 0 6px 0;
  background-color: #fafafa;
}
.block{
  margin-bottom: 25px;
}
.block_condition{
  width: 1180px;
  display: flex;
  font-size: 14px;
}
.block_title{
  color: rgb(153, 153, 153);
  margin-right: 45px;
  flex-shrink: 0;
}
.block_item{
  margin-right: 50px;
  flex-shrink: 0;
  color: #333;
  cursor: pointer;
}

.library_main{
  margin-top: 50px;
}
.main_type{

}
</style>