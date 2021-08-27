<template>
  <div class="menu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <h2 slot="title" class="h2">易购管理系统</h2>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("home.product") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-s-tools"></i>
        <span slot="title">{{ $t("home.guige") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("home.advert") }}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">{{ $t("home.user") }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  background-color: #545c64;
  height: 100%;
}
.h2 {
  color: #fff;
  font-size: 22px;
}
.el-menu {
  border-right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>