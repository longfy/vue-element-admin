<template>
  <div class="navbar">
    <Hamburger style="padding: 0 15px;float: left;"/>
    <Breadcrumb/>
    <el-dropdown class="login-info" trigger="click">
      <div class="avatar-wrapper">
        <i class="el-icon-user-solid"></i> 超级管理员
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <router-link to="/">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <a target="_blank" href="https://github.com/longfy/">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <el-dropdown-item divided>
          <span style="display:block;" @click="_logout">Log Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@/utils/api";
import Hamburger from "@/components/hamburger/Index.vue";
import Breadcrumb from "@/components/breadcrumb/Index.vue";
import Util from "@/utils/util";
let util = new Util();
export default {
  name: "Navbar",
  components: {
    Hamburger,
    Breadcrumb
  },
  data() {
    return {};
  },
  methods: {
    _logout() {
      logout().then(
        res => {
          if (res.status) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            util.delCookie("isLogin");
            this.$store.dispatch("isLogin", false);
            this.$router.push("/login");
          } else {
            this.$message.error(res.msg);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  color: #5a5e66;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .login-info {
    float: right;
    margin: 0 20px;
    .avatar-wrapper {
      outline: none;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>


