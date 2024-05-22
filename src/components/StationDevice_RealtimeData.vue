<template>
  <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">

    <el-tab-pane label="厂站设置">
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
      <el-button type="success" @click="modifyStationInf">初始化</el-button>
      <el-button type="primary" @click="getStationInf">查询</el-button>
      <el-button type="success" @click="modifyStationInf">修改</el-button>
      <div style="display: flex;">
        <el-tag style="width: 220px;">休眠时间（ms）</el-tag>
        <el-input style="width: 220px;"></el-input>
      </div>
      <div style="display: flex;">
        <el-tag style="width: 220px;">遥调冻结时间（s）</el-tag>
        <el-input style="width: 220px;"></el-input>
      </div>
      <div style="display: flex;">
        <el-tag style="width: 220px;">开关量变化周期（ms）</el-tag>
        <el-input style="width: 220px;"></el-input>
      </div>

    </el-tab-pane>
    <el-tab-pane label="设备设置">
      <el-button type="primary" @click="getDeviceInf">查询</el-button>
      <el-button type="success" @click="modifyDeviceInf">修改</el-button>
      <div style="display: flex;">
        <el-tag type="primary">推送周期间隔</el-tag>
        <el-input type="text"  v-model="rawDeviceInf.data[0].inf.RealData.TimeInterval" />
      </div>
      <div style="display: flex;">
        <el-tag type="primary">启用实时数据保存配置</el-tag>
        <el-select
            v-model="rawDeviceInf.data[0].inf.RealData.Writeintegrity"
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
    </el-tab-pane>
    <el-tab-pane label="测点设置">
    <div>
      <el-tag type="primary" v-model="AlterLength" style="width: 220px;">测点列表</el-tag>
      <el-tag type="primary" style="width: 150px;">实时值变化类型</el-tag>
      <el-tag type="primary" style="width: 150px;">Ref1</el-tag>
      <el-tag type="primary" style="width: 150px;">Ref2</el-tag>
      <el-tag type="primary" style="width: 150px;">Link</el-tag>

      <el-button @click="QueryMeasure">查询</el-button>
      <el-button @click="TypeCount">修改</el-button>
      <div class="arrow-dialog__div">
        <div v-for="(item,index) in processedData" :key="index"  style="display: flex;width: 1000px;">
          <div v-if="item.measType == 0">
            <el-tag>遥测点</el-tag>
            <el-tag>{{index+1}}</el-tag>
            <el-input v-model="item.measName"  style="width: 150px;" ></el-input>
            <el-select
                v-model="Type[index+1]"
                style="width: 150px;"
                placeholder="Select">
              <el-option
                  v-for="item in RealTimeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                style="width: 150px;"></el-option>
            </el-select>
            <el-input v-model="Ref1[index+1]" style="width: 150px;" @input="getIndex"></el-input>
            <el-input v-model="Ref2[index+1]" style="width: 150px;"></el-input>
            <el-input v-model="Link[index+1]" style="width: 150px;"></el-input>
          </div>

          <div v-if="item.measType == 1">
            <el-tag type="success">遥信点</el-tag>
            <el-tag>{{index+1-AlterLength}}</el-tag>
            <el-input v-model="item.measName" ></el-input>
            <el-input v-model="item.measType" ></el-input>
          </div>
        </div>
      </div>
    </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {
  BooleanOptions,
  checkedKeys,
  ConfigServerIP,
  DisplayDevice,
  DisplayStation,
  EnergyOptions, filterText,
  MeasureJson, rawDeviceInf,
  rawStationInf, RealTimeOptions, showDialog, treeRef
} from "@/utils/InfJson.js";
import {get, post, put} from "@/utils/http.js";
import {ElMessage, ElTree} from "element-plus";
const tabPosition = ref('top')
// 表格数据
const tableData = ref([{ selectedOption: '', inputValue: '' }]);
let defaultProps = ref({
  children: 'children',
  label: 'nodeName'
})
let processedData =  ref()
let AlterLength = ref()
let MeasureType=ref()
let index=ref()
let Type =ref([])
let Ref1 =ref([])
let Ref2 =ref([])
let Link =ref([])
let jsonArray = []
let DeviceJson = ref({
  "deviceId": "",

  "customInfParamList":[]
})
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
function generateInputFields() {

  for (let i = 0; i < Ref1.value.length; i++) {
    Ref1.value.push({ value: "" });
  }
  console.log(Ref1.value)
}
async function TypeCount(){
  AlterLength.value = MeasureJson.value.data.filter(item => item.measType===0).length
  console.log(AlterLength.value)
  console.log(Ref1.value)
  console.log(index.value)
  const result = Ref1.value.map((item, index) => {
    return item ? index : null;
  }).filter(item => item !== null);
  console.log(result)
  // 获取数组长度
  const length = Ref1.value.length;

  // 创建一个空数组来存储最终的JSON对象

  // 遍历数组并生成JSON对象
  for (let i = 1;i<=result.length;i++) {
    jsonArray.push({
      section: `[A${i}]`,
      key: `Ref1`,
      value: Ref1.value[i]
    });
    jsonArray.push({
      section: `[A${i}]`,
      key: `Ref2`,
      value: Ref2.value[i]
    });
    jsonArray.push({
      section: `[A${i}]`,
      key: `Type`,
      value: Link.value[i]
    });
  }
  DeviceJson.value.customInfParamList=jsonArray
  console.log(DeviceList.value)
  // 输出或使用jsonArray
  console.log(DeviceJson.value);
  for (let i = 0;i<DeviceList.length;i++) {
    DeviceJson.value[0].deviceId = DeviceList[i]
    await put(`/pre/modifyDeviceInf?ConfigServerIP=${ConfigServerIP.value}`, DeviceJson.value)
  }
}

/*onMounted(
    MeasureJson.value.data.map((item,index) => {
      return{
        name : item.measName,
        num : index + 1
      }
    })
)*/
function getIndex(index) {
  console.log(index)
  // 在这里处理index值，然后返回处理后的值
  return index; // 假设你想将索引加1
}
// // 选项列表
// let option = computed(() => {
//   return MeasureJson.value.data.map((item,index) => ({
//     label: item.measName,
//     value: item.measId,
//     type : item.measType,
//
//   }))})
async function QueryMeasure(){
  let res = await get(`/pre/getMeasure?ConfigServerIP=${ConfigServerIP.value}&&DeviceId=${DisplayDevice.value}`)
  MeasureJson.value = res.data
  console.log(MeasureJson.value)
  processedData.value=MeasureJson.value.data
  console.log(processedData.value.key)
  //     .map((item,index) => ({
  //   index:index,
  //   name:item.measName
  // }))
}

async function ModifyMeasure(){
  DeviceJson.value[0].customInfParamList[0].value = rawDeviceInf.value.data[0].inf.DataLog.TimeInterval
  console.log(MeasureJson.value)

  let res = await get(`/pre/getMeasure?ConfigServerIP=${ConfigServerIP.value}&&DeviceId=${DisplayDevice.value}`)
  MeasureJson.value = res.data
}

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

async function getDeviceInf() {
  console.log(DisplayDevice)
  let res = await post(`/pre/getDeviceInf?ConfigServerIP=${ConfigServerIP.value}`, [DisplayDevice.value])
  console.log("???????")

  const keysToCheck = [
    res.data.data[0].inf.DataLog, 'key3',
    res.data.data[0].inf.VirtualDataLogCfg,
    res.data.data[0].inf.SecondDataLogDataLogCfg,
    res.data.data[0].inf.HighDataLogDataLogCfg,
    res.data.data[0].inf.RealData,
    res.data.data[0].inf.CustomEventLog
  ];
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

}


// 添加行的方法
function addRow() {
  tableData.value.push({ selectedOption: '', inputValue: '' })}
function generateJsonArray(){

}
</script>
<style>


.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.arrow-dialog__div {
  height: 800px;
  width: 1080px;
  overflow: auto;
}
</style>
