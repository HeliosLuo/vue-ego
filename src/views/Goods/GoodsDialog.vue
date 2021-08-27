<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="category">类目选择</el-button
          >{{ ruleForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="imgInnerVisible = true"
            >上传图片</el-button
          >
          <img
            :src="ruleForm.image"
            alt=""
            style="width: 150px; margin-left: 20px; vertical-align: middle"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <GoodsWangeditor @getWangData="getWangData" ref="wang" />
        </el-form-item>
        <template v-if="isShow">
          <el-form-item label="类目参数配置">
            <el-form-item
              v-for="(item, index) in paramsInfo"
              :label="item.title"
              :key="index"
            >
              <div class="list">
                <el-input v-model="item.value"></el-input>
              </div>
              <!-- 第二层 -->
              <el-form-item
                v-for="(ele, n) in item.children"
                :label="ele.title"
                :key="n"
              >
                <div class="list">
                  <el-input v-model="ele.value"></el-input>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form-item>
        </template>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="addCommodity">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 内层 -->
    <el-dialog
      width="30%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <GoodsCore ref="getVal" @getTreeData="getTreeData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="setFooter">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="imgInnerVisible"
      append-to-body
    >
      <GoodsUploading @getSucess="getSucess" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgInnerVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsWangeditor from "./GoodsWangeditor.vue";
import GoodsCore from "./GoodsCore.vue";
import GoodsUploading from "./GoodsUploading.vue";
export default {
  components: {
    GoodsCore,
    GoodsUploading,
    GoodsWangeditor,
  },
  props: {
    title: {
      type: String,
    },
    ye: {
      type: [String,Number]
    },
    // rowData: {
    //   type: Object,
    //   default: function () {
    //     return {};
    //   },
    // },
  },
  watch: {
    // rowData(val) {
    //   this.$nextTick(() => {
    //     this.ruleForm = val;
    //     this.$refs.wang.editor.txt.html(val.descs);
    //     console.log(this.$refs.wang);
    //   });
    // },
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      imgInnerVisible: false,
      isShow: false,
      TreeData: {},
      paramsInfo: [],
      ruleForm: {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    //添加商品
    addCommodity() {
      if (
        this.ruleForm.title === "" ||
        this.ruleForm.price === "" ||
        this.ruleForm.num === "" ||
        this.ruleForm.title.length >= 5
      ) {
        this.$message({
          message: "警告哦，必填项不能为空或名称长度小于5",
          type: "warning",
        });
      } else {
        // title cid  category sellPoint price num desc paramsInfo image
        let { title, cid, category, sellPoint, price, num, desc, image, id } =
          this.ruleForm;

        if (this.title == "添加商品") {
          this.$api
            .getInsertTbItem({
              title,
              cid,
              category,
              sellPoint,
              price,
              num,
              desc,
              image,
              paramsInfo:this.paramsInfo==""?"":JSON.stringify(this.paramsInfo),
            })
            .then((res) => {
              if (res.status === 200) {
                this.$message({
                  message: "恭喜你，添加成功",
                  type: "success",
                });
                //成功后刷新页面
                this.$parent.http(1);
                this.clearForm();
              } else {
                this.$message.error("错了哦，添加失败");
              }
            });
        } else {
          // console.log(this.ruleForm);
          // console.log();
          this.$api
            .getUpdateTbItem({
              id,
              title,
              cid,
              category,
              sellPoint,
              price,
              num,
              desc,
              image,
              paramsInfo:this.paramsInfo==""?"":JSON.stringify(this.paramsInfo),
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  message: "恭喜你，修改成功",
                  type: "success",
                });
                //成功后刷新页面
                this.$parent.http(this.ye);
                this.clearForm();
              } else {
                this.$message.error("错了哦，修改失败");
              }
            });
        }
      }
    },
    //描述
    getWangData(val) {
      // console.log(val);
      this.ruleForm.desc = val;
    },
    //上传图片回显
    getSucess(val) {
      console.log(val);
      this.ruleForm.image = val;
    },
    // 类目回显
    getTreeData(val) {
      this.TreeData = val;
    },
    //类目确定
    setFooter() {
      //显示类目
      this.ruleForm.category = this.TreeData.name;
      this.ruleForm.cid = this.TreeData.cid;
      this.innerVisible = false;
      // console.log(this.TreeData);
      this.$api
        .getCategoryData({
          cid: this.TreeData.cid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200||res.result[0].paramData!="") {
            this.isShow = true;
            this.paramsInfo = JSON.parse(res.result[0].paramData);
          } else {
            this.isShow = false;
          }
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.clearForm();
          done();
        })
        .catch((_) => {});
    },
    category() {
      this.categoryName = "类目选择";
      this.innerVisible = true;
    },
    /**
     * 清空
     */
    clearForm() {
      this.ruleForm = {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      this.dialogVisible = false;
      this.paramsInfo = [];
      //清空文本框editor.txt.clear()
      console.log(this.$refs.wang);
      this.$refs.wang.editor.txt.clear();
      this.isShow=false;
    },
  },
};
</script>

<style>
</style>