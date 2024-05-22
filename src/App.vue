
<script setup>
import StationDevice_Datalog from "@/components/StationDevice_Datalog.vue";
import ConfigServerIP from "@/components/IPConfig.vue";
import { Calendar } from '@element-plus/icons-vue'
import StationDevice_RealtimeData from "@/components/StationDevice_RealtimeData.vue";
import StationDevice_Event from "@/components/StationDevice_Event.vue";
</script>

<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Calendar /></el-icon>
          <span>配置</span>
        </span>
      </template>
      <ConfigServerIP></ConfigServerIP>
    </el-tab-pane>
    <el-tab-pane label="定时记录">
      <StationDevice_Datalog></StationDevice_Datalog></el-tab-pane>
    <el-tab-pane label="事件">
      <StationDevice_Event></StationDevice_Event>
    </el-tab-pane>
    <el-tab-pane label="实时数据">
      <StationDevice_RealtimeData></StationDevice_RealtimeData>

    </el-tab-pane>

  </el-tabs>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 12px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 1080px;
  width: 1920px;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
