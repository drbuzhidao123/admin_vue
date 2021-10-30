<template>
  <div class="error">
    <img src="@/assets/image/404.png" />
    <div class="title">
      <h2>页面走丢了...</h2>
      <h4>远方的朋友你好！非常抱歉，您所请求的页面不存在！</h4>
      <h4>请仔细检查您输入的网址是否正确。</h4>
      <button @click="goHome()">返回首页</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Error",
  mounted() {},
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
body {
  line-height: 1.6;
  background: #7395ff;
}
.error {
  width: 1100px;
  margin: 0 auto;
  text-align: center;
  padding-top: 140px;
}
.error img {
  text-align: center;
  width: 500px;
}
.title {
  button {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px 40px;
    border: #fff 1px solid;
    transition: 0.3s ease-in-out all;
  }
  button:hover {
    background-color: #000;
    color: #fff;
    border: #000 1px solid;
  }
}
.title h2 {
  color: #fff;
  font-size: 36px;
  letter-spacing: 4px;
  text-align: center;
  line-height: 120px;
}
.title h4 {
  color: #fff;
  font-size: 18px;
  /* font-weight: bold; */
  line-height: 38px;
  text-align: center;
}
</style>
