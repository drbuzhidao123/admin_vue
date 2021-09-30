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
                  @click="getMenuList()"
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
      <el-table
        :data="menuList"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              @click="handleCreate(2, scope.row)"
              type="primary"
              size="mini"
              >新增</el-button
            >
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="action == 'create' ? '新增菜单' : '编辑菜单'"
      v-model="showModal"
      @close="handleClose"
    >
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: 'id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="menuForm.menuType == 1 ? '菜单名称' : '按钮名称'"
          prop="menuName"
        >
          <el-input
            v-model="menuForm.menuName"
            :placeholder="
              menuForm.menuType == 1 ? '请输入菜单名称' : '请输入按钮名称'
            "
          />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入菜单图标" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType == 2"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="status"
          v-show="menuForm.menuType == 1"
        >
          <el-radio-group v-model="menuForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
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
import utils from "../util/utils";
export default {
  name: "menu",
  data() {
    return {
      queryInfo: {
        query: "",
        status: 1,
      },
      menuList: [],
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 150,
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "菜单类型",
          prop: "menuType",
          formatter(row, column, value) {
            return {
              1: "菜单",
              2: "按钮",
            }[value];
          },
        },
        {
          label: "权限标识",
          prop: "menuCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "菜单状态",
          prop: "status",
          width: 90,
          formatter(row, column, value) {
            return {
              1: "正常",
              2: "停用",
            }[value];
          },
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      showModal: false,
      menuForm: {
        parentId: [null],
        menuType: 1,
        status: 1,
      },
      action: "create",
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-10个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    // 菜单列表初始化
    async getMenuList() {
      try {
        this.menuList = await this.$api.getMenuList(this.queryInfo);
      } catch (e) {
        throw new Error(e);
      }
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    // 新增菜单
    handleCreate(type, row) {
      this.action = "create";
      this.showModal = true;
      if (type == 2) {
        this.$nextTick(() => {
          this.menuForm.parentId = [...row.parentId, row.id].filter(
            //避免空
            (item) => item
          );
        });
      }
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        Object.assign(this.menuForm, row);
      });
    },
    async handleDel(id) {
      await this.$api.delMenu({ id: id }).then((res) => {
        console.log(res);
      });
      this.$message.success("删除成功");
      this.getMenuList();
    },
    // 菜单操作-提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = this.menuForm;
          if (this.action == "create") {
            delete this.menuForm["id"];
            await this.$api.addMenu(params).then((res) => {
              if (res) {
                this.$message.success("创建成功");
              }
            });
          } else {
            await this.$api.editMenu(params).then((res) => {
              console.log(res);
              if (res) {
                this.$message.success("更新成功");
              }
            });
          }
          this.showModal = false;
          this.handleReset("dialogForm");
          this.getMenuList();
        }
      });
    },
    // 弹框关闭
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
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
