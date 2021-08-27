<template>
  <div class="params">
    <!-- 搜索 -->
    <div class="header">
      <el-input v-model="search" placeholder="请输入内容" @change="goChange" />
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table :data="tableData">
        <el-table-column prop="itemCatId" label="规格参数ID" width="120">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="120">
        </el-table-column>
        <el-table-column prop="specsName" label="规格名称" width="120">
        </el-table-column>
        <el-table-column
          prop="paramData"
          label="规格参数"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
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
    </div>
    <!-- 分页 -->
    <MyPaging
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changeCurrent"
    />
    <!-- 弹框 -->
    <ParamsDialog ref="myDialog" :title="title" />
  </div>
</template>

<script>
import MyPaging from "../../components/MyPaging.vue";
import ParamsDialog from "./ParamsDialog.vue";
export default {
  components: {
    MyPaging,
    ParamsDialog,
  },
  data() {
    return {
      tableData: [],
      pageSize: 1,
      total: 1,
      ye: "",
      search: "",
      title: "",
    };
  },
  methods: {
    //搜索
    goChange(val) {
      // console.log(val);
      this.$api
        .getParamsSearch({
          search: val,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.tableData = res.result;
            this.pageSize = 1;
            this.total = res.result.length;
          } else {
            this.tableData = [];
            this.pageSize = 1;
            this.total = 0;
          }
        });
    },
    //添加
    showDialog() {
      this.title = "商品规格参数配置";
      this.$refs.myDialog.outerVisible = true;
    },
    //编辑
    handleEdit(index, row) {
      console.log(row);
      this.title = "编辑商品规格参数配置";
      this.$refs.myDialog.outerVisible = true;
      this.$nextTick(() => {
        this.$refs.myDialog.innerVisible = true;

        this.$refs.myDialog.dynamicValidateForm.domains = JSON.parse(
          row.paramData
        );
        this.$refs.myDialog.passInfo.itemCatId = row.itemCatId;
        this.$refs.myDialog.passInfo.specsName = row.specsName;
        this.$refs.myDialog.passInfo.id = row.id;
      });
    },
    //删除
    handleDelete(index, row) {
      console.log(row.id);
      this.$api
        .getParamsDelete({
          id: row.id,
        })
        .then((res) => {
          if (res.status === 200) {
            this.http(this.ye);
          }
        });
    },
    //分页
    changeCurrent(val) {
      console.log(val);
      this.ye = val;
      this.http(val);
    },
    http(page) {
      this.$api
        .getParams({
          page,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            this.pageSize = res.pageSize;
            this.total = res.total;
          }
        });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang='scss' scoped>
.params {
  padding: 10px;
}
.header {
  display: flex;
  margin-bottom: 20px;
  margin-top: 10px;
  button {
    margin-left: 20px;
  }
  margin-right: 40px;
}
</style>