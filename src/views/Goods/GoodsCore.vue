<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      ref="tree"
      @node-click="handleNodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
      },
      val: "",
    };
  },

  methods: {
    //获取点击的node的界面的数据--发送给弹框
    handleNodeClick(data) {
      // console.log(data);
      //把点击的tree的数据 传递给父组件弹框组件
      this.$emit("getTreeData", data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getSelectCategory().then((res) => {
          // console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      } else {
        // console.log(node.data.cid);
        this.$api
          .getSelectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>