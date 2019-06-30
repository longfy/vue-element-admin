<template>
  <aside class="aside">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse="openAside"
      >
        <SidebarItem v-for="route in asideMenu" :key="route.id" :menuItem="route" />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import variables from "@/styles/variables.scss";
import SidebarItem from "./SidebarItem";
export default {
  name: "Aside",
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    ...mapState(["openAside", "asideMenu"]),
    variables() {
      return variables;
    }
  }
};
</script>

<style lang="scss">
@import "./aside.scss";
</style>


