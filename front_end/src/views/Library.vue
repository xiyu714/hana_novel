<template>
  <div class="library_container">
    <div class="library_typeblock">
      <div class="block">
        <div class="block_condition">
          <div class="block_title">读者：</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
        </div>
      </div>
      <div class="block">
        <div class="block_condition">
          <div class="block_title">读者：</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
        </div>
      </div>
      <div class="block">
        <div class="block_condition">
          <div class="block_title">读者：</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
        </div>
      </div>
      <div class="block">
        <div class="block_condition">
          <div class="block_title">读者：</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
          <div class="block_item">全部</div>
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
  margin: 0px 9%;
}
.library_typeblock{
  padding: 12px 0 0px 0;
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
}

.library_main{
  margin-top: 50px;
}
.main_type{

}
</style>