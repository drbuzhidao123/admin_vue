<template>
  <div class="welcome">
    <transition name="slide-fade">
      <el-row v-if="show">
        <el-col :span="7">
          <el-card shadow="hover">
            <h3>Welcome,{{ username }}!</h3>
            <p>This is Welcome Page</p>
          </el-card>
        </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="5">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span style="font-size: 16px">数据统计</span>
              </div>
            </template>
            <div class="card-body">
              产品数量：<span class="count">{{ proCount }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="10">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span style="font-size: 16px">用户信息</span>
              </div>
            </template>
            <div class="card-body-user">
              <p>
                <label>ID:</label> <span>{{ user_id }}</span>
              </p>
              <p>
                <label>用户名:</label> <span>{{ username }}</span>
              </p>
              <p>
                <label>用户分组:</label> <span>{{ group }}</span>
              </p>
              <p>
                <label>手机号码:</label> <span>{{ mobile }}</span>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>
<script>
export default {
  name: "welcome",
  data() {
    return {
      show: false,
      user_id: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username"),
      mobile: window.sessionStorage.getItem("mobile"),
      group: window.sessionStorage.getItem("group"),
      proCount: Number,
    };
  },
  props: {},
  created() {
    this.getCount();
  },
  mounted() {
    this.myChart();
    this.fadeIn();
  },
  methods: {
    fadeIn() {
      this.show = !this.show;
    },
    getCount() {
      let _this = this;
      this.axios.post("product/getCount").then(function (res) {
        if (res.data.status == 1) {
          _this.proCount = res.data.result;
        } else {
          _this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.welcome {
  font-size: 16px;
  h3 {
    font-size: 24px;
  }
  .el-row {
    margin-bottom: 30px;
    #myChart1 {
      width: 100%;
      height: 500px;
      margin: 0 auto;
    }
    #myChart2 {
      width: 100%;
      height: 500px;
      margin: 0 auto;
    }
  }
  .card-header {
    text-align: left;
  }
  .card-body {
    color: #adadad;
    .count {
      font-size: 28px;
      color: #000;
    }
  }
  .card-body-user {
    color: #000;
    text-align: left;
    p label {
      margin: 0 10px;
      color: #adadad;
    }
    span {
      color: #000;
    }
  }
}
</style>
