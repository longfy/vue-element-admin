<template>
  <div class="tags-container">
    <ScrollPanel class="scroll-container">
      <router-link
        v-for="(item, index) in tagsView"
        :key="index"
        :to="item.path"
        @contextmenu.prevent.native="_openMenu(item, $event)"
        @click.native="_onTagItemHandle(item)"
      >
        {{ item.name }}
        <span
          v-if="!item.affix"
          class="el-icon-close"
          @click.prevent.stop="_closeSelectedTag(item)"
        />
      </router-link>
    </ScrollPanel>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="_refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!selectedTag.affix" @click="_closeSelectedTag(selectedTag)">关闭</li>
      <li @click="_closeOthersTags">关闭其他</li>
      <li @click="_closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ScrollPanel from "./ScrollPanel";
import Util from "@/utils/util.js";

let util = new Util();
export default {
  name: "Tags",
  components: {
    ScrollPanel
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    };
  },
  computed: {
    ...mapState("layout", ["tagsView", "asideMenu"])
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this._closeMenu);
      } else {
        document.body.removeEventListener("click", this._closeMenu);
      }
    }
  },
  methods: {
    ...mapActions("user", ["changeUserState"]),
    ...mapActions("layout", ["changeLayoutState"]),
    _onTagItemHandle(record) {
      this._setLevelList(record);
    },
    _refreshSelectedTag(tag) {
      // 刷新
      this.$router.push(tag.path);
      this.changeLayoutState({
        key: "isLoad",
        newValue: false
      }).then(() => {
        this.changeLayoutState({
          key: "isLoad",
          newValue: true
        });
      });
    },
    _closeSelectedTag(tag) {
      // 关闭当前
      let { newTagsView: tagsView, routeItem } = util.computeTagsView(
        tag,
        this.tagsView,
        2
      );
      this.changeLayoutState({
        key: "tagsView",
        newValue: tagsView
      });
      this._setLevelList(routeItem);
      this.$router.push(routeItem.path);
    },
    _closeOthersTags() {
      // 关闭其他
      this.changeLayoutState({
        key: "tagsView",
        newValue: util.computeTagsView(this.selectedTag, this.tagsView, 3)
      });
      this._setLevelList(this.selectedTag);
      this.$router.push(this.selectedTag.path);
    },
    _closeAllTags() {
      // 关闭所有
      let tagsView = util.computeTagsView(null, this.tagsView, 4);
      this.changeLayoutState({
        key: "tagsView",
        newValue: tagsView
      });
      this._setLevelList(tagsView[0]);
      this.$router.push(tagsView[0].path);
    },
    _setLevelList(record) {
      this.changeLayoutState({
        key: "levelList",
        newValue: util.getBreadcrumbPath(record, this.asideMenu)
      });
    },
    _openMenu(tag, e) {
      // 打开右键菜单
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    _closeMenu() {
      // 关闭右键菜单
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .scroll-container {
    a {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.router-link-exact-active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.scroll-container {
  a {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>


