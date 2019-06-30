<template>
  <div v-if="!menuItem.hidden">
    <el-submenu v-if="menuItem.children" :index="menuItem.path">
      <template slot="title" v-if="menuItem.pid == 0">
        <Item :icon="menuItem.icon" :title="menuItem.name" />
      </template>
      <span slot="title" v-else>{{ menuItem.name }}</span>
      <SidebarItem v-for="route in menuItem.children" :key="route.id" :menuItem="route" />
    </el-submenu>
    <el-menu-item v-else :index="menuItem.path" @click="_itemHandel(menuItem)">
      <Item :icon="menuItem.icon" :title="menuItem.name" />
    </el-menu-item>
  </div>
</template>

<script>
import Item from "./Item";
import { mapState } from "vuex";
import Util from "@/utils/util.js";

let util = new Util();
export default {
  name: "SidebarItem",
  components: {
    Item
  },
  props: {
    menuItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["tagsView", "asideMenu"])
  },
  methods: {
    _itemHandel(record) {
      let pathArr = [];
      this.tagsView.forEach((v, i) => {
        pathArr.push(v.path);
      });
      if (pathArr.indexOf(record.path) === -1) {
        this.tagsView.unshift({
          title: record.name,
          path: record.path,
          affix: false
        });
      }
      this.$store.dispatch("setTagsView", this.tagsView);
      this.$router.push(record.path);
      this.$store.dispatch(
        "setLevelList",
        util.getBreadcrumbPath(record, this.asideMenu)
      );
    }
  }
};
</script>