<template>
  <div class="User">
    <!-- 个人中心 -->
    <el-button @click="look" class="btn">查看合同</el-button>
    <div id="main" style="width: 600px; height: 400px;float: left;"></div>
    <div id="main2" style="width: 600px; height: 400px;float: right;"></div>
    <Userpdf ref="getpdf" />
  </div>
</template>

<script>
import Userpdf from "./Userpdf.vue";

export default {
  components: {
    Userpdf,
  },
  methods: {
    look() {
      this.$refs.getpdf.dialogVisible = true;
    },
  },
  mounted() {
    this.$echarts.line('main');
    this.$echarts.bintu('main2')
  },
};
</script>

<style lang="scss" scoped>
.User{
  overflow: hidden;
}
.btn{
  display: block;
}
</style>