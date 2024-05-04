<template>
  <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
<!--    style="height: 400px"-->
    <el-tab-pane label="厂站设置">tips
      <div >
        <el-tag type="primary">选中的厂站</el-tag>
        <el-input type="text"  v-model="DisplayStation"/>
      </div>

      <div >
        <el-tag type="primary">选中的设备</el-tag>
        <el-input type="text"  v-model=DisplayDevice />
      </div>
      <div>
        <el-button @click="ChooseQueryNode">选择查询节点</el-button>
        <!-- 弹出对话框 -->
        <el-dialog v-model="showQueryDialog" width="100%" height="100%" title="选择查询节点" @close="handleQueryClose">
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
                node-key
                :props="defaultProps"
                show-checkbox
                accordion
                @check="handleCheckChange"
                :filter-node-method="filterNode"/>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button @click="handleQueryCancel">取消</el-button>
        <el-button type="primary" @click="handleQueryConfirm">查询</el-button>
        </span>
        </el-dialog>
      </div>
      <div>
        <el-button @click="ChooseModifyNode">选择修改节点</el-button>
        <!-- 弹出对话框 -->
        <el-dialog v-model="showModifyDialog" width="100%" height="100%" title="选择修改节点" @close="handleModifyClose">
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
        <el-button @click="handleQueryCancel">取消</el-button>
        <el-button type="primary" @click="handleQueryConfirm">修改</el-button>
        </span>
        </el-dialog>
      </div>

      <el-button type="success" @click="modifyStationInf">初始化</el-button>
      <el-button type="primary" @click="getStationInf">查询</el-button>
      <el-button type="success" @click="modifyStationInf">修改</el-button>
      <div style="display: flex;">
        <el-tag type="primary">启用批量生成普通定时记录</el-tag>
        <el-select
            v-model="rawStationInf.data[0].sections.GenerateDataLog.BatchGenerate"
            placeholder="Select"
            size="large"
            style="width: 240px">
          <el-option
              v-for="item in BooleanOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div style="display: flex;">
        <el-tag type="primary">启用批量生成高速定时记录</el-tag>
        <el-select
            v-model="rawStationInf.data[0].sections.GenerateHighSpeedDataLog.BatchGenerate"
            placeholder="Select"
            size="large"
            style="width: 240px">
          <el-option
              v-for="item in BooleanOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div style="display: flex;">
        <el-tag type="primary">启用批量生成秒级定时记录</el-tag>
        <el-select
            v-model="rawStationInf.data[0].sections.GenerateSecondDataLog.BatchGenerate"
            placeholder="Select"
            size="large"
            style="width: 240px">
          <el-option
              v-for="item in BooleanOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <el-input type="text" v-model="rawStationInf.data[0].sections.GenerateDataLog.BatchGenerate"></el-input>
      <div style="display: flex;">
        <el-tag type="primary" placeholder="2022-07-22">开始时间</el-tag>
        <el-input type="text"  v-model="rawStationInf.data[0].sections.GenerateDataLog.BegTime" />

      </div>
      <div style="display: flex;">
        <el-tag type="primary">结束时间</el-tag>
        <el-input type="text"  v-model="rawStationInf.data[0].sections.GenerateDataLog.EndTime" />
      </div>
      <div style="display: flex;">
        <el-tag type="primary">时间间隔(s)</el-tag>
        <el-input type="text"  v-model="rawStationInf.data[0].sections.GenerateDataLog.TimeInterval" />
      </div>
      <div style="display: flex;">
        <el-tag type="primary">能耗(随机值)增长区间</el-tag>
        <el-input type="text"  v-model="rawStationInf.data[0].sections.CustomDataLogProperty.EnergyRandomValueRange" />
      </div>
      <div>
        <el-tag type="info">定时记录值类型</el-tag>
        <el-select
            v-model="rawStationInf.data[0].sections.CustomDataLogProperty.CumulativeDataids"
            placeholder="Select"
            size="large"
            style="width: 240px">
          <el-option
              v-for="item in EnergyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
    </el-tab-pane>
    <el-tab-pane label="设备设置" >
      <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="虚拟">
          <el-button type="primary" @click="getDeviceInf">查询</el-button>
          <el-button type="success" @click="modifyDeviceInf">修改</el-button>
          <div style="display: flex;">
            <el-tag type="primary">时间间隔</el-tag>
            <el-input type="text" id="TimeInterval" v-model="rawDeviceInf.data[0].deviceId" />
            <el-input v-model="rawDeviceInf.data[0].deviceId"></el-input>
          </div>
          <el-tag type="primary">生成方式</el-tag>
          <el-switch
              v-model="rawDeviceInf.data[0].inf.DataLog.Enable"
              class="mb-2"
              active-text="启用虚拟定时记录"/>
          <el-switch
              v-model="rawDeviceInf.data[0].inf.DataLog.ResetEnergyValue"
              class="mb-2"
              active-text="不重置能耗"
              inactive-text="重置能耗"/>
          <div style="display: flex;">
            <el-tag type="primary">能耗增长区间</el-tag>
            <el-input type="text" v-model="rawDeviceInf.data[0].inf.DataLog.MinRandom" />~
            <el-input type="text" v-model="rawDeviceInf.data[0].inf.DataLog.MaxRandom" />
          </div>
          <div>
            <el-tag type="info">定时记录值类型</el-tag>
            <el-select
                v-model="rawDeviceInf.data[0].inf.DataLog.GenerateType"
                placeholder="Select"
                size="large"
                style="width: 240px">
              <el-option
                  v-for="item in GenerateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <el-tag type="warning">Tag 4</el-tag>
          <el-tag type="danger">Tag 5</el-tag>
        </el-tab-pane>
        <el-tab-pane label="秒级">
          <div style="display: flex;">
            <el-tag type="primary">能耗增长区间</el-tag>
            <el-input type="text" v-model="rawDeviceInf.data[0].inf.DataLog.MinRandom" />~
            <el-input type="text" v-model="rawDeviceInf.data[0].inf.DataLog.MaxRandom" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="高速">
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import {ElTree} from "element-plus";
import { ElMessage } from 'element-plus';
import {get, post, put} from "@/utils/http.js";
import { ref, watch} from "vue";

import {
  BooleanOptions,
  checkedKeys, ConfigServerIP,
  DateSelector, DeviceJson, DeviceList, DisplayDevice, DisplayStation,
  EnergyOptions, filterText,
  GenerateOptions,
  rawDeviceInf,
  rawStationInf, showModifyDialog, showQueryDialog, treeRef
} from "@/utils/InfJson.js";
import {treeData} from "@/utils/TreeHandler.js";

let defaultProps = ref({
  children: 'children',
  label: 'nodeName',
  disabled: 'disabled'
})
const tabPosition = ref('top')


let NodeTree = ref([])
function handleQueryClose() {
  // 关闭对话框时清空选中的节点
  // checkedKeys.value = [];
  console.log("close")
}
function handleModifyClose() {
  // 关闭对话框时清空选中的节点
  // checkedKeys.value = [];
  console.log("close")
}
async function ChooseQueryNode(){
  showQueryDialog.value = true
  console.log(treeData.value)
}
async function ChooseModifyNode(){
  showModifyDialog.value = true
}
function handleQueryCancel() {
  // checkedKeys.value = [];
  DeviceList.value = []
  // 取消选择时关闭对话框
  showQueryDialog.value = false;
}
function handleModifyCancel() {
  // checkedKeys.value = [];
  DeviceList.value = []
  // 取消选择时关闭对话框
  showModifyDialog.value = false;
}
function handleQueryConfirm(data) {
  showQueryDialog.value = false;
  console.log('选中的节点数据：', DeviceList);
}
function handleModifyConfirm(data) {
  showModifyDialog.value = false;
  console.log('选中的节点数据：', DeviceList);
}
// 处理节点选中状态变化事件
function handleCheckChange(checkedNodes) {
  showQueryDialog.value = true;
  // 设备
  if (checkedNodes.nodeType == 269619472) {
    console.log('This is a DeviceNode：', checkedNodes.nodeId);
    DisplayDevice.value = checkedNodes.nodeId;
    DeviceList.value.push(checkedNodes.nodeId)
    console.log(DeviceList)
  } else {
    // 厂站
    if (checkedNodes.nodeType == 269615104) {
      DisplayStation.value =  checkedNodes.nodeId
      for (let i = 0; i < checkedNodes.children.length; i++) {
        console.log("This is a DeviceNode", checkedNodes.children[i].children.length);
        for (let j = 0; j < checkedNodes.children[i].children.length; j++) {
          console.log("DeviceName", checkedNodes.children[i].children[j].nodeId)
          DeviceList.value.push(checkedNodes.children[i].children[j].nodeId)
        }
      }
    }
    // 通道
    if (checkedNodes.nodeType == 269619456) {
      for (let j = 0; j < checkedNodes.children.length; j++) {
        DeviceList.value.push(checkedNodes.children[j].nodeId)
        console.log('This is a DeviceNode：', checkedNodes.children[j].nodeId);
      }
    }
  }
  console.log("StationId:",DisplayStation.value)
  let uniqueArr = Array.from(new Set(DeviceList.value));
  console.log("独一无二",uniqueArr); // [1, 2, 3, 4, 5]
}


watch(filterText, (val) => {
    treeRef.value.filter(val);
});
// Define the filter function for the tree nodes
let filterNode = (value, data) => {
  if (!value) return true;
  return data.nodeName.includes(value);
};


async function getStationInf() {
  let res = await get(`/pre/getStationInf?ConfigServerIP=${ConfigServerIP.value}&&StationId=${DisplayStation.value}`)
  if(!rawStationInf.value.data[0].inf.DataLog.Enable||!rawStationInf.value.data[0].inf.DataLog.TimeInterval)
  {  ElMessage({
    message: '这是一条厂站消息',
    type: 'error',
  })
    return}
  rawStationInf.value = res.data
  console.log(rawStationInf.value.data[0].sections.GenerateDataLog.BatchGenerate);
  console.log(DeviceList.value)
}

async function modifyStationInf() {
  console.log(rawStationInf);
  let res = await post(`/pre/modifyStationInf?ConfigServerIP=${ConfigServerIP.value}&&StationId=${DisplayStation.value}`, rawStationInf.value)
  rawDeviceInf.value = res.data
  console.log(rawDeviceInf.value);

}
function convertToStr(boolValue) {
  if (boolValue) {
    console.log("true")
    return boolValue.toString(); // 如果值为true，则转换为字符串 "true"

  } else {
    console.log("false")
    return 'false'; // 如果值为false，则转换为字符串 "false"
  }}
async function getDeviceInf() {
  console.log(DisplayDevice)
  let res = await post(`/pre/getDeviceInf?ConfigServerIP=${ConfigServerIP.value}`, [DisplayDevice.value])
  console.log("???????")

  const keysToCheck = [res.data.data[0].inf.DataLog, 'key3'];
  for (let i = 0; i < keysToCheck.length; i++) {
    if(!keysToCheck[i])
    {  ElMessage({
      message: '配置不存在',
      type: 'error',
    })
      return
    }
  }
  rawDeviceInf.value = res.data
  console.log(rawDeviceInf.value,"11111");
  console.log(rawDeviceInf.value.data[0].inf.DataLog.TimeInterval);
  console.log(DeviceList.value)
  return rawDeviceInf
}
async function modifyDeviceInf() {
  console.log(DeviceList)
  // console.log(rawDeviceInf.value.data[0].inf.DataLog.TimeInterval).TimeInterval
  DeviceJson.value[0].customInfParamList[0].value = rawDeviceInf.value.data[0].inf.DataLog.TimeInterval
  DeviceJson.value[0].customInfParamList[1].value = rawDeviceInf.value.data[0].inf.DataLog.TimeOffset
  DeviceJson.value[0].customInfParamList[2].value = rawDeviceInf.value.data[0].inf.DataLog.GenerateType
  DeviceJson.value[0].customInfParamList[3].value = rawDeviceInf.value.data[0].inf.DataLog.ChangeType
  DeviceJson.value[0].customInfParamList[4].value = rawDeviceInf.value.data[0].inf.DataLog.ResetEnergyValue
  DeviceJson.value[0].customInfParamList[5].value = rawDeviceInf.value.data[0].inf.DataLog.MinRandom
  DeviceJson.value[0].customInfParamList[6].value = rawDeviceInf.value.data[0].inf.DataLog.MaxRandom
  for (let i = 0;i<DeviceList.length;i++) {
    DeviceJson.value[0].deviceId = DeviceList[i]
    await put(`/pre/modifyDeviceInf?ConfigServerIP=${ConfigServerIP.value}`, DeviceJson.value)
  }
}

</script>
<style>

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.sync-dialog__div {
  height: 300px;
  overflow: auto;
}
</style>