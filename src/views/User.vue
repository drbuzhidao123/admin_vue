<template>
  <div class="user">
    <transition name="fade">
      <el-card v-if="show">
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
              @click="dialogVisible = true"
              >添加</el-button
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
                @click="showEditDialog(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeById(scope.row.id)"
              ></el-button>
              <el-tooltip effect="light" content="分配角色" placement="top">
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="showSetDialog(scope.row.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </transition>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="addDiglogClose()"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex" prop="sex">
            <el-radio label="男性" :value="0"></el-radio>
            <el-radio label="女性" :value="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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
    <!-- 分配对话框 -->
    <el-dialog
      title="分配角色"
      v-model="setDialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="setDiglogClose()"
    >
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          {{ checkgroup["title"]
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="group in authGroupList"
              :key="group['id']"
              :command="group"
              >{{ group.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setgroup()">确 定</el-button>
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
      show: false,
      //列表传递的参数
      queryInfo: {
        //查询参数
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示的条数
        pagesize: 10,
      },
      userList: [],
      total: 0, //总条数
      dialogVisible: false,
      editDialogVisible: false,
      setDialogVisible: false,
      checkgroup: { group_id: -1, title: "请选择角色" },
      authGroupList: [],
      //添加用户
      addForm: {
        userName: "",
        email: "",
        password: "",
        mobile: "",
        sex: 0,
      },
      addFormRules: {
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
      //编辑用户
      editForm: {
        userName: "",
        password: "",
        mobile: "",
      },
      editFormRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "输入的用户名长度在3到15之间" },
        ],
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
    this.fadeIn();
    this.getUserList();
  },
  methods: {
    fadeIn() {
      this.show = !this.show;
    },
    async getUserList() {
      let userList = await this.$api.getUserList(this.queryInfo);
      this.userList = userList.list;
      this.total = userList.total;
    },
    //添加用户
    async addUser() {
      await this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          this.$api.addUser().then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showEditDialog() {},
    //监听每页条数的改变
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val;
      this.getUserList();
    },
    //添加用户对话框关闭
    addDiglogClose() {
      this.$refs.addFormRef.resetFields();
    },
    //编辑对话框关闭
    editDiglogClose() {
      this.$refs.editFormRef.resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
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
