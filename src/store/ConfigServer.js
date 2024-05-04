import {defineStore} from "pinia";
export const useConfigServer = defineStore("ConfigInfo",{
    state(){
        return{
            ConfigServer:"",
            NodeTree:""
        }
    }
})