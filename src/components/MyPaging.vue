<template>
  <div class="paging">
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total='total'
      :page-size="pageSize"
      @current-change='handleCurrentChange'
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  methods:{
     handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$emit('changeCurrent',val)
      }
  }
};
</script>

<style lang="scss" scoped>
.paging {
  text-align: center;
  padding: 40px 0;
}
</style>