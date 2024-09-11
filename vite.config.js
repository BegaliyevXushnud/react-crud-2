import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {find:'@',replacement:"/src/*"},
      {find:'@pages',replacement:"/src/pages"},
      {find:'@component',replacement:"/src/component"},
      {find:'@layout',replacement:"/src/layout"},
     
    ]
  }
})
