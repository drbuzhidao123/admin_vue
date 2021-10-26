<template>
  <div class="user-manage">
    <el-card>
      <!-- 搜索&添加 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form>
            <el-input
              v-model="queryInfo.query"
              placeholder="请输入内容"
              clearable
            >
              <template #append>
                <el-button
                  icon="el-icon-search"
                  @click="getUserList()"
                ></el-button>
              </template>
            </el-input>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="handleCreate()"
            >新增用户</el-button
          >
          <el-button type="danger" icon="el-icon-delete" @click="handlePatchDel"
            >批量删除</el-button
          >
        </el-col>
      </el-row>
      <!-- 列表 -->
      <el-table
        ref="multipleTable"
        :data="userList"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column prop="id" label="id"></el-table-column> -->
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="userEmail" label="邮箱"></el-table-column>
        <!-- <el-table-column prop="mobile" label="手机号码"></el-table-column> -->
        <el-table-column
          prop="sex"
          label="性别"
          :formatter="sexFormatter"
        ></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column prop="status" label="在职状态">
          <template #default="scope">
            <el-switch
              @click="changestatus(scope.row)"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-has="'system-user-edit'"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-has="'system-user-del'"
              @click="handleDel(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加和编辑用户对话框 -->
    <el-dialog
      :title="action == 'create' ? '添加用户' : '编辑用户'"
      width="30%"
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
            placeholder="用户密码"
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
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      queryInfo: {
        query: "",
      },
      userList: [],
      roleList: [],
      deptList: [],
      checkedUserIds: [],
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      showModal: false,
      action: "create",
      //用户表单
      userForm: {
        deptId: [null],
      },
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
  components: {},
  created() {},
  mounted() {
    this.getUserList();
    this.getAllRoleList();
    this.getAllDeptList();
  },
  methods: {
    sexFormatter(row, column, value) {
      return {
        0: "男性",
        1: "女性",
      }[value];
    },
    async getUserList() {
      try {
        let { list, total } = await this.$api.getUserList({
          ...this.queryInfo,
          ...this.pager,
        });
        this.userList = list;
        this.pager.total = total;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getAllRoleList() {
      this.roleList = await this.$api.getAllRoleList();
    },
    async getAllDeptList() {
      this.deptList = await this.$api.getAllDeptList();
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleCreate() {
      this.action = "create";
      this.showModal = true;
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        Object.assign(this.userForm, row);
        this.userForm.deptId = row.deptId.split(",").map(Number);
      });
    },
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },

    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = this.userForm;
          if (this.action == "create") {
            delete this.userForm["id"];
            await this.$api.addUser(params).then((res) => {
              if (res) {
                this.$message.success("创建成功");
              }
            });
          } else {
            await this.$api.editUser(params).then((res) => {
              if (res) {
                this.$message.success("更新成功");
              }
            });
          }
          this.handleClose();
          this.getUserList();
        }
      });
    },

    //删除
    async handleDel(id) {
      await this.$api.delUser({ id: id }).then((res) => {
        if (res) {
          this.$message.success("删除成功");
        }
      });
      this.getUserList();
    },

    //批量删除
    async handlePatchDel() {
      if (this.checkedUserIds.length == 0) {
        this.$message.error("请选择要删除的用户");
        return;
      }
      const res = await this.$api.delManyUser({
        userIds: this.checkedUserIds, //批量删除
      });
      if (res) {
        this.$message.success("删除成功");
        this.getUserList();
      } else {
        this.$message.success("删除失败");
      }
    },

    // 表格多选
    handleSelectionChange(list) {
      let arr = [];
      list.map((item) => {
        arr.push(item.id);
      });
      this.checkedUserIds = arr;
    },

    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getUserList();
    },
    async changestatus(row) {
      await this.$api
        .changeStatus({ id: row.id, status: row.status })
        .then((res) => {
          if (res) {
            this.$message.success("状态更新成功");
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.el-form {
  text-align: left;
}
.el-card {
  .el-row {
    text-align: left;
  }
  .el-table {
    margin-top: 25px;
    font-size: 12px;
  }
  .el-pagination {
    padding: 25px 0 5px 0;
  }
}
</style>
