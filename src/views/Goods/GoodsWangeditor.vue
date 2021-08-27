<template>
  <div>
    <div id="wang"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data(){
    return{
      editor:""
    }
  },
  mounted() {
    this.editor = new E("#wang");
      // 配置 onchange 回调函数
    this.editor.config.onchange =  (newHtml)=> {
    //   console.log("change 之后最新的 html", newHtml);
      //传递输入的内容
      this.$emit('getWangData',newHtml)
    };
    this.editor.create();
  },
};
</script>

<style>
</style>