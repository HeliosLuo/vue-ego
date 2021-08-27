<template>
  <div class="login">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="70px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="userName">
              <el-input
                type="txt"
                v-model="ruleForm.userName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="70px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="userName">
              <el-input
                type="txt"
                v-model="ruleForm.userName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModules", ["setStateLogin"]),
    handleClick(tab, event) {
      console.log(tab, event);
      this.$refs.ruleForm.resetFields();
      // console.log( this.$refs.ruleForm);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm.userName, this.ruleForm.password);
          if (this.activeName === "first") {
            let { userName, password } = this.ruleForm;
            this.$api
              .getLogin({
                username: userName,
                password,
              })
              .then((res) => {
                console.log(res);
                console.log(jwt(res.data));
                if (res.status === 200) {
                  let obj = {
                    token: res.data,
                    user: jwt(res.data).username,
                  };
                  this.setStateLogin(obj);
                  localStorage.setItem("userinfo", JSON.stringify(obj));
                  this.$router.push("/");
                }
              });
          } else {
            console.log("注册");
            let { userName, password } = this.ruleForm;
            this.$api
              .getRegister({
                username: userName,
                password,
              })
              .then((res) => {
                console.log(res);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  height: 100%;
  background-color: rgb(206, 206, 206);
  overflow: hidden;
  .content {
    width: 460px;
    height: 230px;
    background-color: #fff;
    margin: 200px auto;
    padding: 20px;
  }
}
</style>