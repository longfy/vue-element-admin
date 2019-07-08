<template>
  <div class="login-pages">
    <div class="login-title"></div>
    <div class="login-main">
      <div class="login-box">
        <div class="title">用户登录</div>
        <el-form
          :model="formData"
          label-position="right"
          label-width="80px"
          ref="form"
          size="medium"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verify">
            <el-col :span="10">
              <el-input v-model="formData.verify" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <div ref="verifyContainer" id="verifyContainer" class="verify" title="点击刷新"></div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_submitForm('form')">登录</el-button>
            <el-button @click="_resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      技术支持：
      <a href="http://www.lhsoft.net/" target="_blank" rel="noopener noreferrer">长沙朗慧信息科技有限公司</a>
    </div>
  </div>
</template>

<script>
import { checkLogin, login } from "@/api/api";
import { mapActions } from "vuex";
import verify from "@/utils/verify";
import Util from "@/utils/util";

let util = new Util();

export default {
  name: "login",
  data() {
    var verifyCode = (rule, value, callback) => {
      if (!this.newVerify.validate(value)) {
        callback(new Error("验证码输入有误！"));
      } else {
        callback();
      }
    };
    return {
      newVerify: null,
      formData: {
        userName: "",
        password: "",
        verify: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verify: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: verifyCode, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.newVerify = new verify({ id: "verifyContainer", height: "36" });
    });
  },
  methods: {
    ...mapActions("user", ["changeUserState"]),
    _submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login({
            userName: this.formData.userName,
            password: this.formData.password
          }).then(
            res => {
              if (res.status) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                util.setCookie("isLogin", true);
                this.changeUserState({
                  key: "isLogin",
                  newValue: true
                });
                console.log(this.$store.state.user);
                this.$router.push("/home");
              } else {
                this.$message.error(res.msg);
              }
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-pages {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: url("../../assets/images/login_bg.png") top center no-repeat;
  background-size: 100% auto;
  .login-title {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 490px;
    height: 70px;
    transform: translate(-50%, -50%);
    background: url("../../assets/images/title.png");
    background-size: 100% 100%;
    z-index: 1;
  }
  .login-main {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 70px;
    background: url("../../assets/images/login_bg.jpg") left center no-repeat;
    background-position: 100% 100%;
    .login-box {
      width: 400px;
      position: fixed;
      top: 45%;
      left: 50%;
      padding: 20px 50px 20px 20px;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      box-sizing: border-box;
      .title {
        height: 40px;
        line-height: 40px;
        color: black;
        text-align: center;
        margin-bottom: 10px;
        font-size: 20px;
      }
    }
  }
  .login-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 70px;
    line-height: 70px;
    background: white;
    text-align: center;
    color: #999;
    font-size: 14px;
    a {
      text-decoration: none;
      color: #999;
    }
  }
}
</style>



