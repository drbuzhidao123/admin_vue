<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-form>
        <el-input v-model="this.props.query" placeholder="请输入内容" clearable>
          <template #append>
            <el-button icon="el-icon-search" @click="search()"></el-button>
          </template>
        </el-input>
      </el-form>
    </el-col>
    <el-col :span="4">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleCreate()"
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
</template>

<script>
export default {
  name: "search",
  props: {
    query: Object,
  },
  data() {
    return {};
  },
  methods: {
    getList() {
      this.$emit("search");
    },
  },
};
</script>

<style></style>
