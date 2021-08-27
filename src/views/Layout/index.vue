<template>
  <div class="layout">
    <!-- 导航 -->
    <Mymenu :isCollapse="isCollapse" />
    <!-- 内容 -->
    <div class="content">
      <div class="content_to">
        <div class="left">
          <i
            class="iconfont"
            :class="isCollapse ? 'icon-left-indent' : 'icon-right-indent'"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="userinfo">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>hello {{ userinfo.user }}</span>
          <i class="iconfont icon-h" @click="operateLogin"></i>
        </div>
      </div>
      <ContentMenu />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Mymenu from "../../components/Mymenu.vue";
import ContentMenu from "./content-menu.vue";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState("loginModules", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginModules", ["emptyStateLogin"]),
    //语言切换
    handleCommand(command) {
     this.$i18n.locale=command
    },
    operateLogin() {
      localStorage.removeItem("userinfo");
      this.emptyStateLogin();
      this.$router.push("/login");
    },
  },
  components: {
    Mymenu,
    ContentMenu,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
}
.content {
  flex: 1;
  .content_to {
    background: #1e78bf;
    height: 50px;
    line-height: 50px;
    color: #fff;
    display: flex;
    .left {
      flex: 1;
    }
    .iconfont {
      font-size: 24px;
      color: #fff;
      padding-left: 10px;
    }
    .userinfo {
      color: #fff;
      padding-right: 40px;
      .el-dropdown-link{
        color: #fff;
        margin-right: 20px;
      }
    }
  }
}
</style>