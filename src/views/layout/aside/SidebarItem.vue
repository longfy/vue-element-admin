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
import { mapState, mapActions } from "vuex";
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
    ...mapState("layout", ["tagsView", "asideMenu"])
  },
  methods: {
    ...mapActions("layout", ["changeLayoutState"]),
    _itemHandel(record) {
      this.changeLayoutState({
        key: "tagsView",
        newValue: util.computeTagsView(record, this.tagsView)
      });
      this.changeLayoutState({
        key: "levelList",
        newValue: util.getBreadcrumbPath(record, this.asideMenu)
      });
      this.$router.push(record.path);
    }
  }
};
</script>