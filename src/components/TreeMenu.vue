<template>
  <template v-for="menu in menuList">
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :key="menu._id"
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span style="margin-right: 80px">{{ menu.menuName }}</span>
      </template>
      <tree-menu :menuList="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :index="menu.path"
      :key="menu._id"
      >{{ menu.menuName }}</el-menu-item
    >
  </template>
</template>

<script>
export default {
  name: "TreeMenu",
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
