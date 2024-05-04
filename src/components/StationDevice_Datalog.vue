<template>
  <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
<!--    style="height: 400px"-->
    <el-tab-pane label="厂站设置">tips
      <div >
        <el-tag type="primary">选中的厂站</el-tag>
        <el-input type="text"  v-model="DisplayStation" />
      </div>

      <div >
        <el-tag type="primary">选中的设备</el-tag>
        <el-input type="text"  v-model=DisplayDevice />
      </div>
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
      <el-button @click="ChooseNode">选择修改节点</el-button>
      <!-- 弹出对话框 -->
      <el-dialog v-model="showDialog" width="100%" height="100%" title="选择修改节点" @close="handleClose">
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

<!--        <span class="demonstration">With default time</span>-->
<!--        <el-date-picker-->
<!--            v-model="DateSelector"-->
<!--            type="datetime"-->
<!--            placeholder="Select date and time"-->
<!--        />-->
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
            <el-input type="text" id="TimeInterval" v-model="rawDeviceInf.data[0].inf.DataLog.TimeInterval" />
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
        </el-tab-pane>
        <el-tab-pane label="高速">
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import {ElTree} from "element-plus";
import {get, post, put} from "@/utils/http.js";
import { ref, watch} from "vue";

import {
  BooleanOptions,
  checkedKeys, ConfigServerIP,
  DateSelector, DeviceJson, DisplayDevice, DisplayStation,
  EnergyOptions, filterText,
  GenerateOptions,
  rawDeviceInf,
  rawStationInf, showDialog, treeRef
} from "@/utils/InfJson.js";

let defaultProps = ref({
  children: 'children',
  label: 'nodeName'
})
const tabPosition = ref('top')
let DeviceList =ref([])
let treeData = ref()
let NodeTree = ref([])
function handleClose() {
  // 关闭对话框时清空选中的节点
  // checkedKeys.value = [];
  console.log("close")
}
async function ChooseNode(){
  showDialog.value = true
  // console.log(ConfigServerStore.NodeTree)
  await get(`/pre/getNodeTree?ConfigServerIP=${ConfigServerIP.value}`)
      .then(response => {
        // 将 JSON 数据转换为树节点格式
        // infoList.value = response.data.data
        treeData.value = generateTreeNodes(response.data.data);
        console.log(treeData.value)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}
function handleCancel() {
  checkedKeys.value = [];
  DeviceList.value = []
  // 取消选择时关闭对话框
  showDialog.value = false;
}

function handleConfirm(data) {
  showDialog.value = false;
  console.log('选中的节点数据：', DeviceList);
}
// 处理节点选中状态变化事件
function handleCheckChange(checkedNodes) {
  showDialog.value = true;
  if (checkedNodes.nodeType == 269619472) {
    console.log('This is a DeviceNode：', checkedNodes.nodeId);
    DisplayDevice.value = checkedNodes.nodeId;
    DeviceList.push(checkedNodes.nodeId)
    console.log(DeviceList)
  } else {
    if (checkedNodes.nodeType == 269615104) {
      DisplayStation.value =  checkedNodes.nodeId
      for (let i = 0; i < checkedNodes.children.length; i++) {
        console.log("This is a DeviceNode", checkedNodes.children[i].children.length);
        for (let j = 0; j < checkedNodes.children[i].children.length; j++) {
          console.log("DeviceName", checkedNodes.children[i].children[j].nodeId)
          DeviceList.push(checkedNodes.children[i].children[j].nodeId)
        }
      }
    }
    if (checkedNodes.nodeType == 269619456) {
      for (let j = 0; j < checkedNodes.children.length; j++) {
        DeviceList.push(checkedNodes.children[j].nodeId)
        console.log('This is a DeviceNode：', checkedNodes.children[j].nodeId);
      }
    }
  }
  console.log("StationId:",DisplayStation.value)
  let uniqueArr = Array.from(new Set(DeviceList));
  console.log("独一无二",uniqueArr); // [1, 2, 3, 4, 5]
}
function generateTreeNodes(data) {
  DeviceList = []
  if (!data) return [];
  NodeTree= data.map(node => ({

    nodeId: node.nodeId,
    nodeName: node.nodeName,
    nodeType: node.nodeType,
    children: generateTreeNodes(node.children) // 递归生成子节点
  }))
  return NodeTree
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
  rawDeviceInf.value = res.data
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