import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }

  },
  server:{
    host:"192.168.2.13",
    proxy : {
      "/pre" : {
        //此处的写法，目的是为了将/api替换成http: //localhost: 3000
        target: "http://192.168.2.13:5001",
        //是否跨域
        changeOrigin: true,
        //路径重写下面示例为将/api替换成空pathRewrite: {
        rewrite:(path)=>path.replace(/^\/pre/,'')
    },}
  }

})
