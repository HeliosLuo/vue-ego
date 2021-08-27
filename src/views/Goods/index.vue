<template>
  <div>
    <!-- 搜索 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="goChange"
      ></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="addition">添加</el-button>
    </div>
    <!-- 商品列表 -->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        @select="selectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="num" label="商品数量" width="100">
        </el-table-column>
        <el-table-column prop="category" label="规格类目" width="150">
        </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="datchDelete">批量删除</el-button>
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">
          切换第二、第三行的选中状态
        </el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <!-- 分页 -->
    <MyPaging
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changeCurrent"
    />
    <!-- 弹框 -->
    <GoodsDialog ref="dialog" :title="title" :rowData="rowData" :ye="ye" />
  </div>
</template>

<script>
import GoodsDialog from "./GoodsDialog.vue";
import MyPaging from "../../components/MyPaging.vue";
export default {
  components: {
    MyPaging,
    GoodsDialog,
  },
  data() {
    return {
      tableData: [],
      pageSize: 1,
      total: 1,
      search: "",
      ye: "",
      ele: [],
      title: "",
      rowData: {},
    };
  },
  created() {
    this.http(1);
  },
  methods: {
    /**
     * 选中
     */
    selectionChange(selection, row) {
      console.log(selection);
      let arr = [];
      selection.forEach((ele) => {
        console.log(ele.id);
        arr.push(ele.id);
      });
      //  console.log(arr);
      this.ele = arr;
    },
    /**
     * 批量删除
     */
    datchDelete() {
      if (this.ele.length <= 0) {
        this.$message.error("错了哦，必须选中至少一个商品才可以删除");
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .getBatchDelete({
              idArr: this.ele,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  message: "恭喜你，删除成功",
                  type: "success",
                });
                this.http(this.ye);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 选择
     */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 添加
     */
    addition() {
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加商品";
    },
    /**
     * 搜索
     */
    goChange(val) {
      if (this.search) {
        this.$api
          .getSearch({
            search: val,
          })
          .then((res) => {
            // console.log(res);
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.pageSize = 8;
              this.total = res.data.result.length;
            } else {
              console.log("查无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 0;
            }
          });
      } else {
        this.http(1);
      }
    },
    // 编辑
    handleEdit(index, row) {
      console.log(row);
      this.title = "编辑商品";
      this.$refs.dialog.dialogVisible = true;
      // this.rowData = { ...row };

      this.$nextTick(() => {
        this.$refs.dialog.ruleForm = row;
        this.$refs.dialog.$refs.wang.editor.txt.html(row.descs);
        if (row.paramsInfo && row.paramsInfo != "") {
          this.$refs.dialog.isShow = true;
          this.$refs.dialog.paramsInfo = JSON.parse(row.paramsInfo);
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      // getDeleteGoods
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .getDeleteGoods({
              id: row.id,
            })
            .then((res) => {
              // console.log(this.ye);
              if (res.status === 200) {
                this.http(this.ye);
                this.$message({
                  message: "恭喜你，删除成功",
                  type: "success",
                });
              } else {
                this.$message.error("错了哦，删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changeCurrent(val) {
      console.log(val);
      this.ye = val;
      this.http(val);
    },
    http(page) {
      this.$api
        .getProductList({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            this.total = res.total;
            this.pageSize = res.pageSize;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  margin: 20px 40px 30px 40px;
  button {
    margin-left: 20px;
  }
}
</style>