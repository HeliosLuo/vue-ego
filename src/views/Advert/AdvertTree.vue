<template>
  <div class="advert-left">
    <el-tree
      :data="data"
      node-key="pid"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :props="props"
      :load="loadNode"
      :default-expanded-keys="[1001]"
      lazy
      @node-click="handleNodeClick"
    >
    </el-tree>
    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <p>当前广告位置：{{ advertInfo.name }}</p>
      <el-input type="text" v-model="advertName" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdvert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, //弹框状态关闭
      title: "添加广告",
      advertName: "", //广告名字
      advertInfo: {}, //点击广告节点内容
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      data: [],
    };
  },
  methods: {
    http() {
      this.$api.getAdvertlist().then((res) => {
        // console.log("广告分类", res);
        this.data = res.result;
      });
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getAdvertlist().then((res) => {
          // console.log();
          return resolve(res.result);
        });
      }
      if (node.level >= 1) {
        this.$api
          .getAdvertlist({
            id: node.data.pid,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
    //添加按钮
    append(data) {
      this.dialogVisible = true;
      this.title = "添加广告";
      //获取点击的节点内容
      this.advertInfo = data;
    },

    //添加确定
    submitAdvert() {
      if (this.title == "添加广告") {
        console.log("添加事件");
        this.$api
          .addvertChild({
            pid: this.advertInfo.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              //添加成功
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              //隐藏弹框--清空数据
              this.dialogVisible = false;
              this.advertName = "";
              //更新tree
              this.http();
            } else {
              this.$message.error("错了哦，这是一条错误消息");
            }
          });
      } else {
        // console.log("修改事件");
        console.log(this.advertInfo.data.pid);
        console.log(this.advertName);
        this.$api
          .updateContent({
            pid: this.advertInfo.data.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              //添加成功
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              //隐藏弹框--清空数据
              this.dialogVisible = false;
              this.advertName = "";
              //更新tree
              this.http();
            }
          });
      }
    },
    //显示内容
    handleNodeClick(data) {
      this.$emit("getTreeData", data);
    },
    //删除
    remove(node, data) {
      console.log(data.pid);
      this.$api
        .deleteContent({
          pid: data.pid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            //添加成功
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
            this.advertName = "";
            //更新tree
            this.http();
            this.$emit("getTreeData", {name:'按钮'});
          }
        });
    },
    //修改
    update(data) {
      // console.log(data);
      this.dialogVisible = true;
      this.title = "修改广告";
      //获取点击的节点内容
      this.advertName = data.data.name;
      this.advertInfo = data;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style>
</style>