<template>
  <div class="role-manage">
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
                  @click="getRoleList()"
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
            >创建</el-button
          >
        </el-col>
      </el-row>
      <!--列表-->
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              v-has="'system-role-edit'"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenPermission(scope.row)"
              v-has="'system-role-seting'"
              >设置权限</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row.id)"
              v-has="'system-role-del'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
      :title="action == 'create' ? '新增角色' : '编辑角色'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="roleForm.remark"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹框-->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="{ label: 'menuName' }"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
// import utils from "../utils/utils";
export default {
  name: "role",
  data() {
    return {
      queryInfo: {
        query: "",
      },
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "权限列表",
          prop: "permissionList",
          width: 300,
          formatter: (row, column, value) => {
            let names = [];
            let list = value.split(",").map(Number) || [];
            list.map((val) => {
              let name = this.actionMap[val];
              if (val && name) names.push(name);
            });
            return names.join(",");
          },
        },
        {
          label: "更新时间",
          prop: "updateTime",
          /*   formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          }, */
        },
        {
          label: "创建时间",
          prop: "createTime",
          /* formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          }, */
        },
      ],
      roleList: [],
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      showModal: false,
      action: "create",
      roleForm: {},
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色角色名称",
          },
        ],
      },
      // 权限展示
      showPermission: false,
      curRoleId: "",
      curRoleName: "",
      menuList: [],
      // 菜单映射表
      actionMap: {},
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenuList();
  },
  methods: {
    // 角色列表初始化
    async getRoleList() {
      try {
        let { list, total } = await this.$api.getRoleList({
          ...this.queryInfo,
          ...this.pager,
        });
        this.roleList = list;
        this.pager.total = total;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 菜单列表初始化
    async getMenuList() {
      let list = await this.$api.getRoleMenuList({ query: "" });
      this.menuList = list;
      this.getActionMap(list);
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    // 角色添加
    handleCreate() {
      this.action = "create";
      this.showModal = true;
    },
    // 角色编辑
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        this.roleForm = {
          id: row.id,
          roleName: row.roleName,
          remark: row.remark,
        };
      });
    },
    // 角色删除
    async handleDel(id) {
      await this.$api.delRole({ id: id });
      this.$message.success("删除成功");
      this.getRoleList();
    },
    // 弹框关闭
    handleClose() {
      this.handleReset("dialogForm");
      this.showModal = false;
    },
    // 角色提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = this.roleForm;
          if (this.action == "create") {
            delete this.roleForm["id"];
            await this.$api.addRole(params).then((res) => {
              if (res) {
                this.$message.success("创建成功");
              }
            });
          } else {
            await this.$api.editRole(params).then((res) => {
              if (res) {
                this.$message.success("更新成功");
              }
            });
          }
          this.showModal = false;
          this.handleReset("dialogForm");
          this.getRoleList();
        }
      });
    },
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getRoleList();
    },
    //权限弹框
    handleOpenPermission(row) {
      this.curRoleId = row.id;
      this.curRoleName = row.roleName;
      this.showPermission = true;
      let checkedKeys = row.checkedKeys.split(",").map(Number);
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(checkedKeys);
      });
    },
    async handlePermissionSubmit() {
      let halfKeys = this.$refs.tree.getHalfCheckedKeys();
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      let params = {
        id: this.curRoleId,
        permissionList: [...halfKeys, ...checkedKeys],
        checkedKeys: checkedKeys,
        halfCheckedKeys: halfKeys,
      };
      await this.$api.updatePermission(params).then((res) => {
        if (res) {
          this.$message.success("设置成功");
        }
      });
      this.showPermission = false;
      this.getRoleList();
    },
    getActionMap(list) {
      let actionMap = {};
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop();
          if (item.menuType == 1) {
            actionMap[item.id] = item.menuName;
          }
          if (item.children) {
            deep(item.children);
          }
        }
      };
      deep(JSON.parse(JSON.stringify(list)));
      this.actionMap = actionMap;
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
