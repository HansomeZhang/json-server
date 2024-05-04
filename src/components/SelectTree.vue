<script>
import {ElTree} from "element-plus";
import {filterText, showDialog} from "@/utils/InfJson.js";

export default {
  name: "SelectTree",
  computed: {
    filterText() {
      return filterText
    },
    showDialog() {
      return showDialog
    }
  },
  components: {ElTree}
}
</script>

<template>
  <el-button @click="ChooseNode">选择查询节点</el-button>
  <!-- 弹出对话框 -->
  <el-dialog v-model="showDialog" width="100%" height="100%" title="选择查询节点" @close="handleClose">
    <!-- 树形结构 -->
    <div class="sync-dialog__div">
      <el-input
          v-model="filterText"
          style="width: 240px"
          placeholder="Filter keyword"/>
      <el-tree
          ref="treeRef"
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          show-checkbox
          accordion
          @check="handleCheckChange"
          :filter-node-method="filterNode"/>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
  </el-dialog>
</template>

<style scoped>

</style>