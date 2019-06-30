<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
      <el-form-item label="审批人">
        <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="searchForm.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_onSearchHandler">查询</el-button>
        <el-button @click="_onResetHandler">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" @click="_onAddHandler">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
      @selection-change="_handleSelectionChange"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection" align="center" width="40"></el-table-column>
      <el-table-column fixed label="序号" type="index"></el-table-column>
      <el-table-column fixed prop="name" sortable label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" min-width="100"></el-table-column>
      <el-table-column prop="city" label="市区" min-width="100"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="cutting-word">{{ scope.row.address }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
      <el-table-column prop="date" sortable label="日期" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="_onLookHandler(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="_onEditHandler(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddPopup
      v-if="popup.show"
      :sohwPopup.sync="popup.show"
      :readOnly="popup.readOnly"
      :rowData="rowData"
      @reloadTableData="_reloadTableData"
    ></AddPopup>
  </div>
</template>

<script>
import { constants } from "crypto";
import AddPopup from "./Add";

export default {
  name: "list",
  components: {
    AddPopup
  },
  data() {
    return {
      popup: {
        show: false,
        readOnly: true
      },
      rowData: null,
      searchForm: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 号",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 号",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 号",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 号，上海市普陀区金沙江路 1516 号",
          zip: 200333
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    _onSearchHandler(e) {},
    _onResetHandler(e) {},
    _onAddHandler() {
      this.popup.readOnly = false;
      this.rowData = {};
      this._showLayer();
    },
    _onLookHandler(rowData) {
      this.popup.readOnly = true;
      this.rowData = { ...rowData };
      this._showLayer();
    },
    _onEditHandler(rowData) {
      this.popup.readOnly = false;
      this.rowData = { ...rowData };
      this._showLayer();
    },
    _showLayer() {
      this.popup.show = true;
    },
    _reloadTableData() {
      console.log("重新请求table数据并填充！");
    },
    _handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
</style>
