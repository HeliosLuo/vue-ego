<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="outerVisible"
      :before-close="handleClose"
    >
      <GoodsCore @getTreeData="getTreeData" v-if="outerVisible" />
      <el-dialog
        width="30%"
        title="商品规格参数配置"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>当前选中的商品：{{ passInfo.specsName }}</p>
        <el-button @click="addDomain">新增规格列表</el-button>
        <hr />
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(item, index) in dynamicValidateForm.domains"
            :label="item.title"
            :key="index"
          >
            <div class="list">
              <el-input v-model="item.title"></el-input
              ><el-button @click.prevent="addChildDomain(index)"
                >添加子组</el-button
              >
              <el-button @click.prevent="removeDomain(index)">删除组</el-button>
            </div>

            <el-form-item
              v-for="(ele, n) in item.children"
              :label="ele.title"
              :key="n"
            >
              <div class="list">
                <el-input v-model="ele.title"></el-input
                ><el-button @click.prevent="removechildren(index, n)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="resetForm('dynamicValidateForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="initialize">取 消</el-button>
        <el-button
          type="primary"
          @click="innerVisible = true"
          :disabled="isShow"
          >确定添加分组</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GoodsCore from "../Goods/GoodsCore.vue";
export default {
  components: { GoodsCore },
  props: ["title"],
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      isShow: true,
      productInfo: {}, //点击tree数据
      dynamicValidateForm: {
        domains: [],
      },
      passInfo: {
        itemCatId: "",
        specsName: "",
        id: "",
      },
    };
  },
  methods: {
    //点x关闭
    handleClose(done) {
      console.log(123);
      this.$confirm("确认关闭？")
        .then((_) => {
          this.initialize();
          done();
        })
        .catch((_) => {});
    },
    //提交
    submit() {
      /**
       * itemCatId
       * content
       * specsName
       */

      if (this.title == "商品规格参数配置") {
        this.passInfo.itemCatId = this.productInfo.cid;
        this.passInfo.specsName = this.productInfo.name;
        if (this.dynamicValidateForm.domains.length !== 0) {
          this.$api
            .getItemParam({
              specsName: this.productInfo.name,
              itemCatId: this.productInfo.cid,
              content: JSON.stringify(this.dynamicValidateForm.domains),
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.initialize();
                //更新视图
                this.$parent.http(1);
                //清空表单
                // this.$refs.dynamicForm.resetFields();
                this.dynamicValidateForm.domains = [];
              } else {
                this.$message.error("错了哦，这是一条错误消息");
              }
            });
        } else {
          this.$message({
            message: "警告哦，信息不能为空",
            type: "warning",
          });
        }
      } else {
        /**
         *   var cid = req.query.cid;
              var content = req.query.content;
              var id = req.query.id;
              var specsName = req.query.specsName;
         */
        let { itemCatId, specsName, id } = this.passInfo;
        this.$api
          .getParamsCategory({
            cid: itemCatId,
            content: this.dynamicValidateForm.domains,
            id,
            specsName,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，编辑成功",
                type: "success",
              });
              this.initialize();
             //更新视图
                this.$parent.http(1);
            }
          });
      }
    },
    //打开内层
    getTreeData(val) {
      console.log(val);
      this.isShow = false;
      this.productInfo = val;
    },
    //动态输入框
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除组
    removeDomain(item) {
      this.dynamicValidateForm.domains.splice(item, 1);
    },
    //删除子组
    removechildren(index, n) {
      this.dynamicValidateForm.domains[index].children.splice(n, 1);
    },
    //添加子组
    addChildDomain(index) {
      this.dynamicValidateForm.domains[index].children.push({
        value: "",
        title: "",
      });
    },
    //添加组
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        title: "",
        children: [],
      });
    },
    //初始化
    initialize() {
      this.isShow = true;
      this.outerVisible = false;
      this.innerVisible = false;
      this.itemCatId = "";
      this.specsName = "";
      this.dynamicValidateForm.domains = [];
    },
  },
};
</script>
<style lang='scss' scoped>
.list {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>