import {ref} from "vue";
export let showDialog = ref(false)
export let MeasureJson= ref({
    "code": 0,
    "success": true,
    "msg": "",
    "total": 31,
    "data": [
        {
            "measId": 1,
            "measName": "预留1",
            "measType": 0,
            "measDef": 1,
            "measAmp": 1,
            "measDiv": 1,
            "measMin": -999999999.0,
            "measMax": 999999999.0
        },
        {
            "measId": 32,
            "measName": "预留2",
            "measType": 0,
            "measDef": 2,
            "measAmp": 1,
            "measDiv": 1,
            "measMin": -999999999.0,
            "measMax": 999999999.0
        },
        {
            "measId": 33,
            "measName": "预留3",
            "measType": 0,
            "measDef": 3,
            "measAmp": 1,
            "measDiv": 1,
            "measMin": -999999999.0,
            "measMax": 999999999.0
        }
    ]
})
export let rawStationInf = ref({
    "code": 0,
    "success": true,
    "msg": "",
    "total": 1,
    "data": [
        {
            "sections": {
                "Main": {
                    "ReadEveRecord": "false",
                    "ReadDataRecord": "false",
                    "SleepInterval": "0",
                    "DigitalDatasChangeAlarm": "false",
                    "FreezeAiDuration": "0",
                    "period": "300",
                    "ReadTransientRecord": "false",
                    "ReadInstantRecord": "false"
                },
                "GenerateDataLog": {
                    "BatchGenerate": "false",
                    "BatchGenerateSecond": "false",
                    "BatchGenerateHighSpeed": "false",
                    "GenerateType": "0",
                    "TimeInterval": "60",
                    "BegTime": "2018-08-21 00:00:00",
                    "EndTime": "2018-08-22 00:00:00",
                    "ChangeType": "0",
                    "ResetPoi": "false",
                    "LastDataLogTime": "2018-08-22 00:00:00"
                },
                "CustomDataLogProperty": {
                    "DataLogGenerateIDType": "",
                    "DataLogStaIDs": "",
                    "DataLogChnIDs": "",
                    "DataLogDevIDs": "1,0",
                    "EnergyRandomValueRange": "0,10000",
                    "CumulativeDataids": "4000001"
                },
                "GenerateEventLog": {
                    "BatchGenerate": "false",
                    "BegTime": "",
                    "EndTime": "",
                    "EventTimeInterval": "0",
                    "SaveEventInterval": "0"
                },
                "CustomEventProperty": {
                    "Types": "",
                    "Levels": "",
                    "EachTypeAndLevelNum": "0",
                    "EventGenerateIDType": "false",
                    "EventStaIDs": "",
                    "EventChnIDs": "",
                    "EventDevIDs": "",
                    "CustomBatteryEvent": "false"
                },
                "TIMEZONE": {
                    "Timezone": "China Standard Time"
                }
            }
        }
    ]
})

export let GenerateOptions = ref([
    {
        value: '0',
        label: '按设备映射方案',
    },
    {
        value: '1',
        label: '随机值',
    },
    {
        value: '2',
        label: 'NAN',
    },
    {
        value: '3',
        label: 'NA',
    },
    {
        value: '4',
        label: '异常时间',
    },
    {
        value: '5',
        label: '指定范围变化',
    },
    {
        value: '6',
        label: '固定值',
    },
    {
        value: '7',
        label: '线性数据',
    },
    {
        value: '8',
        label: '突变数据',
    },
    {
        value: '9',
        label: '阶跃数据',
    },
    {
        value: '10',
        label: '线性数据2(斜率不固定)',
    },
    {
        value: '11',
        label: '线性数据',
    },
    {
        value: '12',
        label: '正弦波形',
    },
    {
        value: '13',
        label: '时间',
    }
])

export let ChangeType = ref([
    {
        value: '0',
        label: '按设备映射方案',
    },
    {
        value: '1',
        label: '随机值',
    },
    {
        value: '2',
        label: 'NAN',
    },
    {
        value: '3',
        label: 'NA',
    },
    {
        value: '4',
        label: '按照自定义值',
    },
    {
        value: '5',
        label: '造异常时间',
    },
    {
        value: '6',
        label: '指定范围内变化',
    },
    {
        value: '7',
        label: '正弦曲线',
    },
    {
        value: '8',
        label: '时间',
    }
])
export let BooleanOptions = ref([
    {
        value: 'true',
        label: 'true',
    },
    {
        value: 'false',
        label: 'false',
    }
])
export let EnergyOptions = ref([
    {
        value: '4000001',
        label: '4000001',
    },
    {
        value: '4000002',
        label: '4000002',
    },
    {
        value: '4000003',
        label: '4000003',
    },
    {
        value: '4000004',
        label: '4000004',
    },
    {
        value: '4000005',
        label: '4000005',
    },
    {
        value: '4000006',
        label: '4000006',
    },
    {
        value: '4000007',
        label: '4000007',
    },
    {
        value: '4000008',
        label: '4000008',
    },
    {
        value: '4000009',
        label: '4000009',
    }
])
export let RealTimeOptions = ref([
    {
        value: '1',
        label: '随机',
    },
    {
        value: '2',
        label: '翻转',
    },
    {
        value: '3',
        label: '常量',
    },
    {
        value: '4',
        label: '乘积',
    },
    {
        value: '5',
        label: 'UTC时间(s)',
    }
])
export let rawDeviceInf = ref({
    "code": 0,
    "success": true,
    "msg": "",
    "total": 1,
    "data": [
        {
            "deviceId": 2,
            "inf": {
                "DataMap": {
                    "DataRecMapID": "",
                    "ParaSetMapID": "-1",
                    "WaveMapID": "-1"
                },
                "DataLog": {
                    "ChangeType": "0",
                    "CustomValue": "0",
                    "Enable": "false",
                    "GenerateType": "0",
                    "MaxRandom": "0",
                    "MinRandom": "0",
                    "ResetEnergyValue": "false",
                    "TimeInterval": "0",
                    "TimeOffset": "0",
                    "difference": "0",
                    "disadvantageNum": "0",
                    "interval": "0",
                    "mutationNum": "0",
                    "startValue": "0",
                    "type": "0"
                },
                "Main": {
                    "AdjustTimeInterval": "0",
                    "Baudrate": "9600",
                    "ByteSize": "8",
                    "FirstByteWaitTime": "1000",
                    "InterByteWaitTime": "500",
                    "Parity": "no",
                    "Port": "22",
                    "PortType": "ETHERNET",
                    "ReadDataRecord": "1",
                    "ReadEveRecord": "1",
                    "ReadWavRecord": "1",
                    "RecvDelay": "0",
                    "RemoteAddr": "191.0.0.1",
                    "RemotePort": "502",
                    "SendDelay": "0",
                    "SetpMeasName": "0",
                    "StopBits": "1",
                    "WriteConsoleInfo": "1",
                    "WriteDebugInfo": "1",
                    "string": "",
                },

                "SecondDataLog": {
                    "TimeOffset": "0",
                    "TimeInterval": "3"
                },
                "VirtualDataLogCfg": {
                    "ParaHandle": "0-1",
                    "TimeInterval": "5",
                    "TimeOffset": "0"
                },
                "HighDataLog": {
                    "TimeOffset": "0",
                    "TimeInterval": "3"
                },
                "RealData":{
                    "TimeInterval": "1",
                    "Writeintegrity": "false"
                },
                "CustomEventLog":{
                    "DevEventEnable": "false",
                    "CustomTimeInterval": "60",
                    "Types": "1",
                    "Levels": "1",
                    "EventBytes": "",
                    "Digitalnumbers": "",
                    "EachTypeAndLevelNum": "1",
                }
            }
        }
    ]
})

export let DisplayStation = ref()


export let ConfigServerIP = ref("")
export let checkedKeys = ref([]) // 选中的节点的 key
export let DisplayDevice = ref()


export let selectedKeys = ref([])
export let filterText = ref('');
export let treeRef = ref(null);
export let DeviceJson = ref([{
        "deviceId": 1,

        "customInfParamList": [
            {
                "key": "TimeInterval",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "TimeOffset",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "GenerateType",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "ChangeType",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "ResetEnergyValue",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "MinRandom",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "MaxRandom",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "CustomValue",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "Enable",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "difference",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "disadvantageNum",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "interval",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "mutationNum",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "startValue",
                "section": "DataLog",
                "value": ""
            },
            {
                "key": "type",
                "section": "DataLog",
                "value": ""
            }

        ]
    }]
)
export let DateSelector = ref('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)