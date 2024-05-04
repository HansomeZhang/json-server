<template>
  <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">

    <el-tab-pane label="厂站设置">
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
    <div>
      <el-tag type="primary" v-model="AlterLength" style="width: 220px;">测点列表</el-tag>
      <el-tag type="primary" style="width: 150px;">实时值变化类型</el-tag>
      <el-tag type="primary" style="width: 150px;">Ref1</el-tag>
      <el-tag type="primary" style="width: 150px;">Ref2</el-tag>
      <el-tag type="primary" style="width: 150px;">Link</el-tag>

      <el-button @click="QueryMeasure">查询</el-button>
      <el-button @click="TypeCount"></el-button>
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
import {computed, onMounted, ref} from 'vue'
import {
  ConfigServerIP,
  DisplayDevice,
  DisplayStation,
  EnergyOptions,
  MeasureJson, rawDeviceInf,
  rawStationInf, RealTimeOptions
} from "@/utils/InfJson.js";
import {get, put} from "@/utils/http.js";
const tabPosition = ref('top')
// 表格数据
const tableData = ref([{ selectedOption: '', inputValue: '' }]);
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
function generateInputFields() {

  for (let i = 0; i < Ref1.value.length; i++) {
    Ref1.value.push({ value: "" });
  }
  console.log(Ref1.value)
}
function TypeCount(){
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
  for (let i in result) {
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
// 输出或使用jsonArray
  console.log(DeviceJson.value);
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
