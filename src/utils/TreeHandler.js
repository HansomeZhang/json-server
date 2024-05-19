import {ref} from "vue";
import {get} from "@/utils/http.js";
import {ConfigServerIP} from "@/utils/InfJson.js";

export let treeData =ref()
export let NodeTree =ref()
function generateTreeNodes(data) {
    // DeviceList = []
    if (!data) return [];
    NodeTree = data.map(node => ({
        nodeId: node.nodeId,
        nodeName: node.nodeName,
        nodeType: node.nodeType,
        children: generateTreeNodes(node.children) // 递归生成子节点
    }
    )
    )
    return NodeTree
}

export async function getTreeData(){
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
