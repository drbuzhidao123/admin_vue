<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryForm.applyState">
            <el-option value="" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="撤回/作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getLeavesList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleLeaves">申请休假</el-button>
      </div>
      <el-table :data="leavesList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleDetail(scope.row)"
              >查看</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row.orderNo)"
              v-if="[1, 2].includes(scope.row.applyState)"
              >撤回</el-button
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
    </div>
    <el-dialog title="申请休假" v-model="showModal" width="70%">
      <el-form
        ref="dialogForm"
        :model="leavesForm"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="休假类型" prop="applyType" required>
          <el-select v-model="leavesForm.applyType">
            <el-option label="事假" :value="1"></el-option>
            <el-option label="调休" :value="2"></el-option>
            <el-option label="年假" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休假时间" required class="start_end">
          <el-row>
            <el-form-item prop="startTime" required>
              <el-date-picker
                v-model="leavesForm.startTime"
                type="datetime"
                placeholder="选择开始日期"
                @change="(val) => handleDateChange('startTime', val)"
              />
            </el-form-item>
            <span>到</span>
            <el-form-item prop="endTime" required>
              <el-date-picker
                v-model="leavesForm.endTime"
                type="datetime"
                placeholder="选择结束日期"
                @change="(val) => handleDateChange('endTime', val)"
              />
            </el-form-item>
          </el-row>
        </el-form-item>
        <el-form-item label="休假时长" required>
          {{ leavesForm.leaveTime }}
        </el-form-item>
        <el-form-item label="休假原因" prop="reason" required>
          <el-input
            type="textarea"
            :row="3"
            placeholder="请输入休假原因"
            v-model="leavesForm.reason"
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
    <el-dialog
      title="申请休假详情"
      width="50%"
      v-model="showDetailModal"
      destroy-on-close
    >
      <el-steps
        :active="detail.applyState > 2 ? 3 : detail.applyState"
        align-center
      >
        <el-step title="待审批"></el-step>
        <el-step title="审批中"></el-step>
        <el-step title="审批通过/审批拒绝"></el-step>
      </el-steps>
      <el-form label-width="120px" label-suffix=":">
        <el-form-item label="休假类型">
          <div>{{ detail.applyTypeName }}</div>
        </el-form-item>
        <el-form-item label="休假时间">
          <div>{{ detail.time }}</div>
        </el-form-item>
        <el-form-item label="休假时长">
          <div>{{ detail.leaveTime }}</div>
        </el-form-item>
        <el-form-item label="休假原因">
          <div>{{ detail.reason }}</div>
        </el-form-item>
        <el-form-item label="审批状态">
          <div>{{ detail.applyStateName }}</div>
        </el-form-item>
        <el-form-item label="审批人">
          <div>{{ detail.curAuditUserName }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../utils/utils";
export default {
  name: "leaves",
  data() {
    return {
      queryForm: {
        applyState: "",
        applyUser: this.$store.state.userInfo.id,
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      columns: [
        {
          label: "单号",
          prop: "orderNo",
          width: 180,
        },
        {
          label: "休假时间",
          prop: "",
          formatter(row) {
            return (
              utils.formateDate(
                new Date(row.startTime),
                "yyyy-MM-dd hh:mm:ss"
              ) +
              "到" +
              utils.formateDate(new Date(row.endTime), "yyyy-MM-dd hh:mm:ss")
            );
          },
        },
        {
          label: "休假时长",
          prop: "leaveTime",
        },
        {
          label: "休假类型",
          prop: "applyType",
          formatter(row, column, value) {
            return {
              1: "事假",
              2: "调休",
              3: "年假",
            }[value];
          },
        },
        {
          label: "休假原因",
          prop: "reason",
        },
        {
          label: "申请时间",
          prop: "createTime",
          width: 180,
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "当前审批人",
          prop: "curAuditUserName",
        },
        {
          label: "审批流",
          prop: "auditFlows",
        },
        {
          label: "审批状态",
          prop: "applyState",
          formatter: (row, column, value) => {
            // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
            return {
              1: "待审批",
              2: "审批中",
              3: "审批拒绝",
              4: "审批通过",
              5: "撤回/作废",
            }[value];
          },
        },
      ],
      leavesList: [],
      leavesForm: {
        applyType: 1,
        startTime: "",
        endTime: "",
        leaveTime: "0天",
        reason: "",
      },
      action: "create",
      showModal: false,
      showDetailModal: false,
      detail: {},
      rules: {
        startTime: [
          {
            type: "date",
            required: true,
            message: "请输入开始日期",
            trigger: "change",
          },
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请输入结束日期",
            trigger: "change",
          },
        ],
        reason: [
          {
            required: true,
            message: "请输入休假原因",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  mounted() {
    this.getLeavesList();
  },
  methods: {
    //申请列表
    async getLeavesList() {
      let { list, total } = await this.$api.getLeavesList({
        ...this.queryForm,
        ...this.pager,
      });
      this.leavesList = list;
      this.pager.total = total;
    },
    // 点击申请休假-展示弹框
    handleLeaves() {
      this.showModal = true;
      this.action = "create";
    },
    //获取休假时长
    handleDateChange(val) {
      let { startTime, endTime } = this.leavesForm;
      if (!startTime || !endTime) return;
      if (startTime > endTime) {
        this.$message.error("开始日期不能晚于结束日期");
        this.leavesForm.leaveTime = "0天";
        setTimeout(() => {
          this.leavesForm[val] = "";
        }, 0);
      } else {
        if ((endTime - startTime) / (24 * 60 * 60 * 1000) < 1) {
          this.leavesForm.leaveTime =
            (endTime - startTime) / (60 * 60 * 1000) + "小时";
        } else {
          this.leavesForm.leaveTime =
            (endTime - startTime) / (24 * 60 * 60 * 1000) + "天";
        }
      }
    },
    //提交申请
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.leavesForm.startTime = utils.formateDate(
            new Date(this.leavesForm.startTime),
            "yyyy-MM-dd hh:mm:ss"
          );
          this.leavesForm.endTime = utils.formateDate(
            new Date(this.leavesForm.endTime),
            "yyyy-MM-dd hh:mm:ss"
          );
          this.leavesForm.applyUser = this.$store.state.userInfo.id;
          this.leavesForm.deptId = this.$store.state.userInfo.deptId;
          let params = this.leavesForm;
          if (this.action == "create") {
            await this.$api.addLeaves(params).then((res) => {
              if (res) {
                this.$message.success("申请成功");
              }
            });
          } else {
            console.log("作废");
          }
          this.handleClose();
          this.getLeavesList();
        }
      });
    },
    handleDetail(row) {
      let data = { ...row };
      data.applyTypeName = {
        1: "事假",
        2: "调休",
        3: "年假",
      }[data.applyType];
      data.time =
        utils.formateDate(new Date(data.startTime), "yyyy-MM-dd") +
        "到" +
        utils.formateDate(new Date(data.endTime), "yyyy-MM-dd");
      // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
      data.applyStateName = {
        1: "待审批",
        2: "审批中",
        3: "审批拒绝",
        4: "审批通过",
        5: "作废",
      }[data.applyState];
      this.detail = data;
      this.showDetailModal = true;
    },
    async handleDelete(orderNo) {
      try {
        await this.$api.delLeaves({ orderNo }).then((res) => {
          if (res) {
            this.$message.success("已撤回申请");
          }
        });
        this.getLeavesList();
      } catch (error) {
        console.log(error);
      }
    },
    // 分页事件处理
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getLeavesList();
    },
    // 重置查询表单
    handleReset(form) {
      this.$refs[form].resetFields();
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
.query-form {
  text-align: left;
}
.el-pagination {
  margin-top: 20px;
}

.base-table {
  .action {
    text-align: left;
    margin-bottom: 20px;
  }
}

.el-form-item {
  text-align: left;
}

.start_end span {
  margin: 0 20px;
}
</style>
