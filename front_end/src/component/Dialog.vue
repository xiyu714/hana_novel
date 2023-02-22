<template>
  <div :class="{dialog_visible: dialog_visible}" class="dialog">
    <div class="dialog__body" style="width: 500px;height: 450px; margin-left: 30%;">
      <div>
        <slot></slot>
      </div>
      <div class="close_button" @click="dialog_visible = false" style="position: absolute; right: 10px; top: 10px; cursor: pointer;">
        <icon-close theme="outline" size="24" fill="#333"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

let dialog_visible = ref(false);

defineExpose({
  dialog_visible
})
</script>

<style>

.close_button:hover {
  color: red;
}

.dialog_visible {
  display: block !important;
}

.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #333333ee;
  display: none;
  z-index: 1000;
}

.dialog__body {
  background: white;
  width: 80%;
  margin-left: 10%;
  height: 500px;
  margin-top: 100px;
  position: relative;
}

</style>
