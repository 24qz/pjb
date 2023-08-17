<template>
 <div>
    <el-dialog
  title="员工导入"
  :visible="dialogVisible"
  width="35%"
  @close="$emit('update:dialogVisible',false)">
  <div style="width: 90%; border: 1px dashed #ccc; height: 200px; border-radius: 5px; margin: 0 auto;text-align: center;">
    <input type="file" style="display: none; " ref="up-load"  accept=".xlsx, .xls" @change="getchange">
    <i class="el-icon-upload" style="font-size: 60px;color: #ccc;margin-top: 30px;"></i>
    <p style="color:#419eff ;">下载导入模板</p>
    <p><span style="color: #ccc;">将文件拖到此处或</span>  <span style="color: #419eff;" @click="upload">点击上传</span></p>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" style="background-color: #2752fb; color: white;" @click="$emit('update:dialogVisible',false)">取 消</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import { importEmployee } from "@/api/user";
export default {
  props: ["dialogVisible"],
  data() {
    return {};
  },
  methods: {
    upload() {
      this.$refs["up-load"].click();
    },

    async getchange(event) {
         console.dir(event.target);
         const files=event.target.files
        const data = new FormData()
        if (files.length > 0) {
            data.append('file', files[0])
           await importEmployee(data)
      }
         this.$emit('fn')
this.$emit('update:dialogVisible',false)
     }
 
  },
  components: {},
  computed: {},
  filters: {},
  watch: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
</style>
