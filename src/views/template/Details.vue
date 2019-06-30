<template>
  <el-dialog
    title="登录"
    :visible.sync="visible"
    @close="$emit('update:sohwPopup', false)"
    :modal-append-to-body="false"
    center
    width="520px"
  >
    <el-form :model="formData" ref="form" size="mini" :disabled="readOnly">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="formData.province" placeholder="请输入省份"></el-input>
      </el-form-item>
      <el-form-item label="市区">
        <el-input v-model="formData.city" placeholder="请输入市区"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="邮编">
        <el-input v-model="formData.zip" placeholder="请输入邮编"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="formData.date" placeholder="请输入日期" type="date"></el-date-picker>
      </el-form-item>
    </el-form>
    <div v-if="!readOnly" slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:sohwPopup', false)">取 消</el-button>
      <el-button type="primary" @click="_submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { constants } from "crypto";

export default {
  data() {
    return {
      visible: this.sohwPopup,
      formData: {
        name: "",
        province: "",
        city: "",
        address: "",
        zip: "",
        date: ""
      }
    };
  },
  props: {
    readOnly: {
      type: Boolean,
      default: true
    },
    sohwPopup: {
      type: Boolean,
      default: true
    },
    rowData: {
      type: Object,
      default: {}
    }
  },
  watch: {
    rowData: {
      immediate: true,
      handler(val) {
        this.formData = val;
      }
    }
  },
  methods: {
    _submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("reloadTableData");
          this.$emit("update:sohwPopup", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
