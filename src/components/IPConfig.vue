<template>
  <el-form label-width="auto" style="max-width: 600px">
    <el-form-item label="ConfigServerIP">
      <el-input v-model="ConfigServerIP" id="ConfigServerIP" placeholder="ConfigServer IP"/>
    </el-form-item>
  </el-form>
</template>

<script setup>





import {ConfigServerIP} from "@/utils/InfJson.js";

const onSubmit = () => {
  console.log('submit!')
  console.log()
}
</script>
