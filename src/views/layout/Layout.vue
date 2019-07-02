<template>
  <div id="layout">
    <Aside />
    <div :class="openAside ? 'main' : 'main open'">
      <header class="header">
        <Navbar />
        <Tags />
      </header>
      <div class="main-container">
        <transition name="fade-transform" mode="out-in">
          <router-view v-if="isLoad" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "./navbar/Navbar";
import Aside from "./aside/Aside";
import Tags from "./tags/Tags";

export default {
  naem: "name",
  components: {
    Navbar,
    Aside,
    Tags
  },
  computed: {
    ...mapState("layout", ["openAside", "isLoad"])
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  margin: 0 0 0 64px;
  padding: 100px 20px 20px;
  transition: margin 0.3s ease-in-out;
  &.open {
    margin: 0 0 0 200px;
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>



