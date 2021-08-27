<template>
  <div class="advert-content">
    <el-button @click="addContent">{{ treeData.name }}广告</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column
        prop="url"
        label="访问地址"
        min-width="240"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片地址"
        min-width="240"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="contentVisible" width="40%">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>PID</p>
          <el-input
            v-model="contentInfo.pid"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>名称</p>
          <el-input
            v-model="contentInfo.name"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>访问地址</p>
          <el-input
            v-model="contentInfo.url"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>图片地址</p>
          <el-input
            v-model="contentInfo.image"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-col>
      <el-button @click="tijiao">添加</el-button>
      <el-button @click="quxiao">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Object,
      default: function () {
        return { name: "按钮" };
      },
    },
  },
  data() {
    return {
      contentVisible: false,
      tableData: [],
      contentInfo: {
        pid: "",
        name: "",
        url: "",
        image: "",
      },
      val: "",
    };
  },
  watch: {
    treeData: function (val) {
      this.tableData = [];
      this.http(val);
      this.val = val;
    },
  },
  methods: {
    http(val) {
      this.$api
        .addAdvertContent({
          pid: val.pid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.result;
          }
        });
    },
    handleDelete(index, val) {
      console.log(index);
      console.log(val);
      this.$api
        .deleteContentByIds({
          id: val.id,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
            window.location.reload()
             http(val.pid)
          }
        });
    },
    //增加广告内容--弹框
    addContent() {
      if (this.treeData.name != "按钮") {
        this.contentVisible = true;
      }
    },
    //添加
    tijiao() {
      // console.log(this.tableData);
      let { pid, name, url, image } = this.contentInfo;
      this.$api
        .addContent({
          pid,
          name,
          url,
          image,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.contentVisible = false;
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
            window.location.reload();
            this.contentInfo = {
              pid: "",
              name: "",
              url: "",
              img: "",
            };
          }
        });
    },
    //取消
    quxiao() {
      this.contentVisible = false;
      window.location.reload();
      this.contentInfo = {
        pid: "",
        name: "",
        url: "",
        img: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-content {
  text-align: center;
}
::v-deep .el-dialog {
  height: 200px !important;
  overflow: hidden;
  p {
    margin-bottom: 10px;
  }
  button {
    margin-top: 10px;
    float: right;
    margin-right: 10px;
  }
}
</style>