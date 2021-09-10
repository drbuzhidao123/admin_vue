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
            </div>
          </el-card>
        </el-col>
      </el-row>
    </transition>
    <el-row>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="myChart1"></div>
        </el-card>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="11">
        <el-card shadow="hover">
          <div id="myChart2"></div>
        </el-card>
      </el-col>
    </el-row>
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
      proCount: 3,
    };
  },
  props: {},
  created() {},
  mounted() {
    this.fadeIn();
  },
  methods: {
    fadeIn() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped lang="scss">
.welcome {
  h3 {
    font-size: 24px;
  }
  .el-row {
    margin-bottom: 30px;
    #myChart1 {
      width: 100%;
      min-height: 300px;
    }
    #myChart2 {
      width: 100%;
      min-height: 300px;
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
