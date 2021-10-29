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
                <el-dropdown-item @click="toApprove()"
                  >审批信息</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!--个人信息-->
          <el-dropdown @command="handleUser">
            <span class="el-dropdown-link">
              <el-avatar icon="el-icon-user-solid">
                {{ userForm.userName }}
              </el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  <i class="el-icon-user"></i>用户：{{ userForm.userName }}
                </el-dropdown-item>
                <el-dropdown-item command="email">
                  <i class="iconfont icon-youxiang"></i>邮箱：{{
                    userForm.userEmail
                  }}
                </el-dropdown-item>
                <el-dropdown-item command="editUser">
                  <i class="el-icon-edit"></i>编辑用户
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <i class="el-icon-circle-close"></i>退出
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
    title="修改个人信息"
    width="600px"
    v-model="showModal"
    @close="handleClose"
  >
    <el-form
      :model="userForm"
      :rules="rules"
      ref="dialogForm"
      label-width="90px"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="userForm.realName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="userForm.userEmail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="用户密码（不输入则原密码）"
          v-model="userForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="userForm.sex">
          <el-radio :label="0">男性 </el-radio>
          <el-radio :label="1">女性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="userForm.status" placeholder="状态选择">
          <el-option :value="1" label="在职"></el-option>
          <el-option :value="0" label="离职"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统角色" prop="role">
        <el-select
          v-model="userForm.role"
          placeholder="请选择用户系统角色"
          style="width: 100%"
        >
          <el-option
            v-for="role in roleList"
            :key="role.id"
            :label="role.roleName"
            :value="role.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-cascader
          v-model="userForm.deptId"
          placeholder="请选择部门"
          :options="deptList"
          :props="{ checkStrictly: true, value: 'id', label: 'deptName' }"
          clearable
          style="width: 100%"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-input v-model="userForm.job" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
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
      showModal: false,
      userMenuList: [],
      roleList: [],
      deptList: [],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "输入的用户名长度在3到15之间" },
        ],
        userEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 6, max: 15, message: "输入的手机号码是11位" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        deptId: [{ required: true, message: "请选择部门", trigger: "blur" }],
        job: [{ required: true, message: "请输入职位", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.getNoticeCount();
    this.getUserMenuList();
    this.getAllRoleList();
    this.getAllDeptList();
  },
  computed: {
    userForm() {
      return this.$store.state.userInfo;
    },
    noticeCount() {
      return this.$store.state.noticeCount;
    },
  },
  methods: {
    async getNoticeCount() {
      const count = await this.$api.noticeCount({
        userName: this.$store.state.userInfo.userName,
      });
      this.noticeCount = count;
      this.$store.commit("saveNoticeCount", count);
    },
    async getUserMenuList() {
      const userMenuList = await this.$api.getUserMenuList({
        userId: this.$store.state.userInfo.id,
      });
      this.userMenuList = userMenuList;
      this.$store.commit("saveUserMenu", userMenuList);
      let actionList = utils.generateAction(userMenuList);
      this.$store.commit("saveActionList", actionList);
    },
    async getAllRoleList() {
      this.roleList = await this.$api.getAllRoleList();
    },
    async getAllDeptList() {
      this.deptList = await this.$api.getAllDeptList();
    },
    handleUser(command) {
      if (command == "email") {
        return;
      }
      if (command == "editUser") {
        this.showModal = true;
        return;
      }
      this.$storage.clearItem("token", "");
      this.$store.commit("saveUserInfo", "");
      this.$store.commit("saveUserMenu", "");
      this.$store.commit("saveActionList", "");
      this.$store.commit("saveUserCount", "");
      this.$store.commit("saveMenuCount", "");
      this.$store.commit("saveRoleCount", "");
      this.$store.commit("saveDeptCount", "");
      this.$store.commit("saveUserRoleName", "");
      this.userInfo = "";
      this.$router.push("/login");
    },
    //编辑用户
    handleSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          let params = this.userForm;
          this.$api.editUser(params).then((res) => {
            if (res) {
              this.$message.success("更新成功");
              res.deptId = res.deptId.split(",").map(Number);
              delete res.password;
              this.$store.commit("saveUserInfo", res);
              this.changeRoleName();
            }
          });
          this.handleClose();
        }
      });
    },
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse == true) {
        this.togicon = "el-icon-s-unfold";
      } else {
        this.togicon = "el-icon-s-fold";
      }
    },
    async changeRoleName() {
      let userRoleName = await this.$api.getRoleName({
        roleId: this.$store.state.userInfo.role,
      });
      this.$store.commit("saveUserRoleName", userRoleName.roleName);
      return;
    },
    toApprove() {
      this.$router.push("/approveManage/approve");
    },
  },
};
</script>

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
