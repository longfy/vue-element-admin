<template>
  <div
    :class="openAside ? 'expand hamburger-container' : 'collapse hamburger-container'"
    @click="_openAsideToggle"
  >
    <i class="el-icon-s-fold"></i>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Hamburger",
  computed: {
    ...mapState("layout", ["openAside"])
  },
  methods: {
    ...mapActions("layout", ["changeLayoutState"]),
    _openAsideToggle() {
      this.changeLayoutState({
        key: "openAside",
        newValue: !this.openAside
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.hamburger-container {
  background: transparent;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  i {
    font-size: 20px;
    transform: rotate(0deg);
    transition: all 0.3s ease-in-out;
  }
  &.expand {
    i {
      transform: rotate(-180deg);
    }
  }
}
</style>
