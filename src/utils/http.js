//axios配置
import axios from "axios";
const get=(url)=>{
    return axios.get(url)
}

const post=(url,post) =>{
    return axios.post(url,post)
}

const put=(url,data)=>{
    return axios.put(url,data)
}

const dele=(url)=>{
    return axios.delete(url)
}
export {get,post,put,dele}