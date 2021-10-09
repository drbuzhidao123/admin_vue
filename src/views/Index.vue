<template>
  <el-container>
    <el-aside>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#393D49"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        :router="true"
      >
        <el-menu-item class="admin-title" index="/">
          <img class="logo" src="../assets/logo.png" alt="" />
          <template #title>
            <span style="margin-left: 55px">后台管理系统</span>
          </template>
        </el-menu-item>
        <tree-menu :userMenuList="userMenuList"></tree-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          <el-icon
            size="25"
            color="#000"
            class="toggle-button"
            @click="toggleCollapse()"
          >
            <fold v-if="togicon == 'el-icon-s-fold'" />
            <expand v-if="togicon == 'el-icon-s-unfold'" />
          </el-icon>
          <breadcrumb></breadcrumb>
        </div>
        <div class="admin">
          <!--审核提示-->
          <el-dropdown>
            <el-badge :is-dot="noticeCount" class="notice" type="danger">
              <el-icon class="bell-icon">
                <bell />
              </el-icon>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>修改个人信息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!--个人信息-->
          <el-dropdown @command="handleLogout">
            <span class="el-dropdown-link">
              <el-avatar icon="el-icon-user-solid">
                {{ userInfo.userName }}
              </el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  <i class="el-icon-user"></i>用户：{{ userInfo.userName }}
                </el-dropdown-item>
                <el-dropdown-item command="email">
                  <i class="el-icon-user"></i>邮箱：{{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <i class="el-icon-close"></i>退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- 编辑用户对话框 -->
  <el-dialog
    title="编辑用户"
    v-model="editDialogVisible"
    width="30%"
    :before-close="handleClose"
    @close="editDiglogClose()"
  >
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="90px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="editForm.username"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="editForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { Fold, Expand, Bell } from "@element-plus/icons";
import breadcrumb from "../components/BreadCrumb.vue";
import TreeMenu from "../components/TreeMenu.vue";
import utils from "../utils/utils";
export default {
  name: "Index",
  components: {
    Fold,
    Expand,
    Bell,
    breadcrumb,
    TreeMenu,
  },
  data() {
    return {
      isCollapse: false,
      togicon: "el-icon-s-fold",
      editDialogVisible: false,
      noticeCount: 0,
      userMenuList: [],
      userInfo: {
        userId: this.$store.state.userInfo.id,
        userName: this.$store.state.userInfo.userName,
        userEmail: this.$store.state.userInfo.userEmail,
      },
      password: "",
      editForm: {
        username: "",
        password: "",
      },
      editFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "输入的用户名长度在3到15之间" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getNoticeCount();
    this.getUserMenuList();
  },
  methods: {
    editDiglogClose() {
      this.$refs.editFormRef.resetFields();
    },
    showEditDialog(id) {
      let _this = this;
      this.axios.post("admin/getUser", { id: id }).then(function (res) {
        if (res.data.status == 1) {
          _this.editForm = res.data.result;
          _this.editForm.password = "";
          _this.editDialogVisible = true;
        } else {
          _this.$message.error(res.data.message);
        }
      });
    },
    //编辑用户
    editUser() {
      let _this = this;
      _this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          _this.axios
            .put("admin/edit/", _this.editForm) //put请求资源
            .then(function (res) {
              //添加成功
              if (res.data.status == 1) {
                _this.$message.success({
                  message: res.data.message,
                  type: "success",
                });
                _this.editDialogVisible = false;
                //_this.getUserList();
              } else {
                _this.$message.error(res.data.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getNoticeCount() {
      const count = await this.$api.noticeCount();
      this.noticeCount = count;
    },
    async getUserMenuList() {
      const userMenuList = await this.$api.getUserMenuList({
        userId: this.userInfo.userId,
      });
      this.userMenuList = userMenuList;
      this.$store.commit("saveUserMenu", userMenuList);
      let actionList = utils.generateAction(userMenuList);
      this.$store.commit("saveActionList", actionList);
    },
    handleLogout(command) {
      if (command == "email") {
        return;
      }
      this.$storage.clearItem("token", "");
      this.$store.commit("saveUserInfo", "");
      this.$store.commit("saveUserMenu", "");
      this.$store.commit("saveActionList", "");
      this.userInfo = "";
      this.$router.push("/login");
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse == true) {
        this.togicon = "el-icon-s-unfold";
      } else {
        this.togicon = "el-icon-s-fold";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #4a4a4b;
  color: #333;
  text-align: center;
  line-height: 40px;
}

.el-header {
  .header-left {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }
  }
}

.toggle-button {
  cursor: pointer;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 30px;
  .title {
    background-color: #0085e8;
    color: #fff;
    font-size: 18px;
  }
  .el-button.logout {
    height: 40px;
    margin-right: 20px;
  }
  .admin {
    cursor: pointer;
    .el-badge {
      cursor: pointer;
      margin-right: 30px;
      .el-icon {
        font-size: 25px;
        vertical-align: middle;
      }
    }
    span {
      color: #000;
      .el-avatar {
        font-size: 27px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
}

.el-aside {
  width: auto !important;
  color: #fff;
  text-align: center;
  line-height: 70px;
  background-color: rgb(57, 61, 73);
  .admin-title {
    span {
      font-size: 16px;
    }
    .logo {
      max-width: 35px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .el-menu {
    text-align: left;
    border-right: none;
    .el-sub-menu__title * {
      margin-right: 80px !important;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 100%;
}

.block-w80 {
  width: 80px;
  display: inline-block;
}
</style>

<style lang="scss">
.el-main {
  line-height: normal !important;
}
</style>
