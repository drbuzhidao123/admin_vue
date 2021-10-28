<template>
  <canvas id="canvas"> </canvas>
  <div class="login">
    <div class="box">
      <div class="title">
        <h3>后台管理系统</h3>
      </div>
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="userForm"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <el-form-item prop="userName">
          <el-input
            prefix-icon="iconfont icon-yonghu"
            v-model="user.userName"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-password"
            type="password"
            v-model="user.password"
            placeholder="密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="12">
              <el-input
                prefix-icon="iconfont icon-password"
                v-model="user.captcha"
                autocomplete="off"
                placeholder="验证码"
              ></el-input>
            </el-col>
            <el-col :span="12">
              <img :src="captchaUrl" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import lizi_init from "../assets/js/login_back";
import storage from "../utils/storage";
import utils from "../utils/utils";
export default {
  name: "Login",
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCap = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "left",
      captchaUrl: "",
      user: {
        userName: "",
        password: "",
        captcha: "",
        key: "",
      },
      rules: {
        userName: [{ validator: validatename, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCap, trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      // 仅在渲染整个视图之后运行的代码
      let _this = this;
      lizi_init();
      document.onkeypress = function () {
        if (window.event.keyCode == 13) {
          _this.login();
        }
      };
    });
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      this.$api.getCaptcha(this.user).then((res) => {
        delete res.code;
        delete res.md5;
        this.captchaUrl = res.base64;
        this.user.key = res.key;
      });
    },
    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api
            .login(this.user)
            .then((res) => {
              //存储登录信息在store和localstorage,存在localstorage是为了存储更稳定因为vuex只要一刷新就没了信息。
              delete res.password;
              res.deptId = res.deptId.split(",").map(Number);
              this.$store.commit("saveUserInfo", res);
              this.$storage.setItem("token", res.token);
              this.$message.success("登录成功！");
              this.loadAsyncRoutes();
              this.$router.push("/welcome");
            })
            .catch(() => {
              this.getCaptcha();
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.userForm.resetFields();
    },
    async loadAsyncRoutes() {
      let token = storage.getItem("token") || {};
      let userInfo = storage.getItem("userInfo") || {};
      if (token) {
        try {
          const menuList = await this.$api.getUserMenuList({
            userId: userInfo.id,
          });
          let routes = utils.generateRoute(menuList);
          routes.map((route) => {
            route.component = () =>
              import(`../views/${route.componentName}.vue`);
            this.$router.addRoute("index", route);
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  background-color: #005ea3;
}

.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 400px;
    height: 350px;
    margin-top: -10%;
    box-shadow: 0 -15px 30px #000;
    background-color: #fff;
    padding: 30px;
    border-radius: 2%;
    .title {
      h3 {
        color: #000;
        font-weight: 100;
        text-align: center;
      }
    }
    .demo-ruleForm {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
