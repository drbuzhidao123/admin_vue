<template>
  <div class="welcome">
    <el-row :gutter="15">
      <!--快捷方式-->
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px">快捷方式：</span>
            </div>
          </template>
          <div class="card-body">
            <ul class="shortcut">
              <li>
                <i class="el-icon-milk-tea" @click="clearCache()"></i>
                <span>清除缓存</span>
              </li>
              <li>
                <i class="el-icon-download" @click="downloadLog()"></i>
                <span>下载日志</span>
              </li>
              <li>
                <a href="https://www.baidu.com" target="blank">
                  <i class="el-icon-search"></i>
                  <span>百度搜索</span>
                </a>
              </li>
              <li>
                <a href="#/system/user">
                  <i class="el-icon-user"></i>
                  <span>用户列表</span>
                </a>
              </li>
              <li>
                <a href="#/system/dept">
                  <i class="el-icon-user"></i>
                  <span>部门列表</span>
                </a>
              </li>
              <li>
                <i class="el-icon-full-screen"></i>
                <span>自定义</span>
              </li>
              <li>
                <i class="el-icon-full-screen"></i>
                <span>自定义</span>
              </li>
              <li>
                <i class="el-icon-full-screen"></i>
                <span>自定义</span>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <!--数据统计-->
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px">数据统计</span>
            </div>
          </template>
          <div class="card-body">
            <el-carousel height="196px" :autoplay="false" arrow="always">
              <el-carousel-item v-for="item in 2" :key="item">
                <ul class="analyze" v-if="item == 1">
                  <li>
                    <a href="#">
                      <h2>用户</h2>
                      <span>{{ userCount }}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h2>部门</h2>
                      <span>{{ deptCount }}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h2>审批列表</h2>
                      <span>0</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h2>待审核数量</h2>
                      <span>0</span>
                    </a>
                  </li>
                </ul>
                <ul class="analyze" v-if="item == 2">
                  <li>
                    <a href="#">
                      <h2>菜单</h2>
                      <span>{{ menuCount }}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h2>角色</h2>
                      <span>{{ roleCount }}</span>
                    </a>
                  </li>
                </ul>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </el-col>
      <!--用户信息-->
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px">用户信息</span>
            </div>
          </template>
          <div class="card-body">
            <div class="userInfo">
              <p>
                <label>姓名:</label> <span>{{ userInfo.realName }}</span>
              </p>
              <p>
                <label>用户名:</label> <span>{{ userInfo.userName }}</span>
              </p>
              <p>
                <label>系统角色:</label> <span>{{ userRoleName }}</span>
              </p>
              <p>
                <label>登录地址:</label> <span>{{ host }}</span>
              </p>
              <p>
                <label>登录时间:</label> <span>{{ loginTime }}</span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <!--使用企业-->
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px">使用企业</span>
            </div>
          </template>
          <div class="card-body">
            <div class="userInfo">
              <p>
                <i class="el-icon-office-building"></i><label>公司:</label>
                <span>八爪鱼网络</span>
              </p>
              <p>
                <i class="iconfont icon-web"></i><label>网址</label>
                <a href="https://www.budray.com">https://www.budray.com</a>
              </p>
              <p>
                <i class="iconfont icon-kefu"></i><label>客服:</label>
                <span>QQ 249167269</span>
              </p>
              <p>
                <i class="el-icon-phone"></i><label>电话:</label>
                <span>13726337312</span>
              </p>
              <p>
                <i class="iconfont icon-youxiang"></i><label>邮箱:</label>
                <span>ceo@budray.com</span>
              </p>
              <p>
                <i class="el-icon-place"></i><label>地址:</label>
                <span>顺德大良凤翔路41号顺德创意产业园A栋315号</span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--开发企业-->
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px">开发企业</span>
            </div>
          </template>
          <div class="card-body">
            <div class="userInfo">
              <p>
                <i class="el-icon-office-building"></i><label>公司:</label>
                <span>八爪鱼网络</span>
              </p>
              <p>
                <i class="iconfont icon-web"></i><label>网址</label>
                <a href="https://www.budray.com">https://www.budray.com</a>
              </p>
              <p>
                <i class="iconfont icon-kefu"></i><label>客服:</label>
                <span>QQ 249167269</span>
              </p>
              <p>
                <i class="el-icon-phone"></i><label>电话:</label>
                <span>13726337312</span>
              </p>
              <p>
                <i class="iconfont icon-youxiang"></i><label>邮箱:</label>
                <span>ceo@budray.com</span>
              </p>
              <p>
                <i class="el-icon-place"></i><label>地址:</label>
                <span>顺德大良凤翔路41号顺德创意产业园A栋315号</span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import config from "../config";
export default {
  name: "welcome",
  data() {
    return {
      userCount: this.$store.state.userCount,
      menuCount: this.$store.state.menuCount,
      roleCount: this.$store.state.roleCount,
      deptCount: this.$store.state.deptCount,
    };
  },
  props: {},
  created() {},
  mounted() {
    this.getUserCount();
    this.getMenuCount();
    this.getRoleCount();
    this.getDeptCount();
    this.getRoleName();
  },
  computed: {
    host: function () {
      return window.location.host;
    },
    loginTime: function () {
      return new Date().toLocaleTimeString();
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    userRoleName() {
      return this.$store.state.userRoleName;
    },
  },
  methods: {
    clearCache() {
      this.$store.commit("saveUserCount", "");
      this.$store.commit("saveMenuCount", "");
      this.$store.commit("saveRoleCount", "");
      this.$store.commit("saveDeptCount", "");
      this.$store.commit("saveUserRoleName", "");
      this.$store.commit("saveUserMenu", "");
      this.$store.commit("saveActionList", "");
      this.$message.success("清除成功");
    },
    downloadLog() {
      window.open(config.baseApi + "/Tool/getLog");
    },
    async getUserCount() {
      if (!this.$store.state.userCount) {
        let userCount = await this.$api.getUserCount();
        this.userCount = userCount;
        this.$store.commit("saveUserCount", userCount);
      }
      return;
    },
    async getMenuCount() {
      if (!this.$store.state.menuCount) {
        let menuCount = await this.$api.getMenuCount();
        this.menuCount = menuCount;
        this.$store.commit("saveMenuCount", menuCount);
      }
      return;
    },
    async getRoleCount() {
      if (!this.$store.state.roleCount) {
        let roleCount = await this.$api.getRoleCount();
        this.roleCount = roleCount;
        this.$store.commit("saveRoleCount", roleCount);
      }
      return;
    },
    async getDeptCount() {
      if (!this.$store.state.deptCount) {
        let deptCount = await this.$api.getDeptCount();
        this.deptCount = deptCount;
        this.$store.commit("saveDeptCount", deptCount);
      }
      return;
    },
    async getRoleName() {
      if (!this.$store.state.userRoleName) {
        let userRoleName = await this.$api.getRoleName({
          roleId: this.$store.state.userInfo.role,
        });
        this.$store.commit("saveUserRoleName", userRoleName.roleName);
      }
      return;
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
    .card-header {
      text-align: left;
    }
    .card-body {
      color: #adadad;
      .shortcut {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 25%;
          padding: 5px;
          a:hover {
            color: #000;
          }
          i {
            background: #f8f8f8;
            color: rgb(116, 116, 116);
            display: block;
            height: 60px;
            line-height: 60px;
            text-align: center;
            width: 100%;
            font-size: 30px;
            border-radius: 2px;
            cursor: pointer;
          }
          i:hover {
            color: #000;
          }
          span {
            display: block;
            margin-top: 10px;
            color: #000;
          }
        }
      }
      .analyze {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 50%;
          padding: 5px;
          a {
            background: #f8f8f8;
            display: block;
            padding: 11px 15px;
            cursor: pointer;
            h2 {
              font-size: 14px;
              color: #888;
              height: 24px;
              line-height: 24px;
            }
            span {
              display: block;
              height: 36px;
              line-height: 36px;
              font-size: 30px;
              color: #759600;
              margin-top: 5px;
            }
          }
        }
      }
      .userInfo {
        color: #000;
        text-align: left;
        i {
          font-size: 16px;
        }
        p label {
          margin: 0 10px;
          color: #adadad;
          line-height: 1.93;
        }
        span {
          color: #000;
        }
      }
    }
    #myChart1 {
      width: 100%;
      min-height: 300px;
    }
    #myChart2 {
      width: 100%;
      min-height: 300px;
    }
  }
}
</style>
