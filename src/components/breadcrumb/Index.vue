<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.children || index == levelList.length-1"
          class="no-redirect"
        >{{ item.name }}</span>
        <a v-else @click.prevent="_handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapState } from "vuex";
import Util from "@/utils/util.js";

let util = new Util();
export default {
  name: "Breadcrumb",
  data() {
    return {};
  },
  computed: {
    ...mapState(["levelList", "tagsView", "asideMenu"])
  },
  methods: {
    _handleLink(record) {
      const { redirect, path } = record;
      if (redirect) {
        this.$router.push(redirect);
      } else {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>


