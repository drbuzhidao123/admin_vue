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
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="dialogVisible = true"
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
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
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
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.id)"
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
        :rules="userFormRules"
        ref="dialogForm"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userForm.sex" prop="sex">
            <el-radio label="男性" :value="0"></el-radio>
            <el-radio label="女性" :value="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
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
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      showModal: false,
      action: "create",
      //添加用户
      userForm: {
        userName: "",
        email: "",
        password: "",
        mobile: "",
        sex: 0,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "输入的用户名长度在3到15之间" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 6, max: 15, message: "输入的手机号码是11位" },
        ],
      },
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getUserList();
  },
  methods: {
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
        this.userForm = {
          id: row.id,
          userName: row.userName,
          userEmail: row.userEmail,
          password: row.password,
          mobile: row.mobile,
        };
      });
    },
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },

    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = this.deptForm;
          params.userId = parseInt(params.userId);
          delete params.user;
          if (this.action == "create") {
            await this.$api.addDept(params).then((res) => {
              if (res) {
                this.$message.success("创建成功");
              }
            });
          } else {
            await this.$api.editDept(params).then((res) => {
              if (res) {
                this.$message.success("更新成功");
                delete this.deptForm["id"];
              }
            });
          }
          this.handleClose();
          this.getDeptList();
        }
      });
    },
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getRoleList();
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
