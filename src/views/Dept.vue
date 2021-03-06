<template>
  <div class="dept-manage">
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
                  @click="getDeptList()"
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
            >创建部门</el-button
          >
        </el-col>
      </el-row>
      <!--列表-->
      <el-table
        :data="deptList"
        row-key="id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          v-bind="item"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
              v-has="'system-dept-edit'"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.row.id)"
              v-has="'system-dept-del'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加与编辑对话框-->
    <el-dialog
      :title="action == 'create' ? '创建部门' : '编辑部门'"
      v-model="showModal"
      @close="handleClose"
    >
      <el-form
        ref="dialogForm"
        :model="deptForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            placeholder="请选择上级部门"
            v-model="deptForm.parentId"
            :props="{
              checkStrictly: true,
              value: 'id',
              label: 'deptName',
            }"
            clearable
            :options="deptList"
            :show-all-levels="true"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            placeholder="请输入部门名称"
            v-model="deptForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select
            placeholder="请选择部门负责人"
            v-model="deptForm.user"
            @change="handleUser"
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.userName"
              :value="`${item.id}/${item.userName}/${item.userEmail}`"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input
            placeholder="请输入负责人邮箱"
            v-model="deptForm.userEmail"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dept",
  data() {
    return {
      queryInfo: {
        //查询参数
        query: "",
      },
      columns: [
        {
          label: "部门名称",
          prop: "deptName",
        },
        {
          label: "负责人",
          prop: "userName",
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
      ],
      deptList: [],
      action: "create",
      showModal: false,
      deptForm: {
        parentId: [null],
      },
      userList: [],
      rules: {
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
        user: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getDeptList();
    this.getAllUserList();
  },
  methods: {
    async getDeptList() {
      this.deptList = await this.$api.getDeptList(this.queryInfo);
    },
    async getAllUserList() {
      this.userList = await this.$api.getAllUserList();
    },
    handleUser(val) {
      const [userId, userName, userEmail] = val.split("/");
      Object.assign(this.deptForm, { userId, userName, userEmail });
    },
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
        Object.assign(this.deptForm, row, {
          //获取当前行的对象数据添加到表中
          user: `${row.userName}`,
        });
      });
    },
    async handleDel(id) {
      await this.$api.delDept({ id: id });
      this.$message.success("删除成功");
      this.getDeptList();
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
            delete this.deptForm["id"];
            await this.$api.addDept(params).then((res) => {
              if (res) {
                this.$message.success("创建成功");
              }
            });
          } else {
            await this.$api.editDept(params).then((res) => {
              if (res) {
                this.$message.success("更新成功");
              }
            });
          }
          this.handleClose();
          this.getDeptList();
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
