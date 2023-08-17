<template>
 <div>
    <el-dialog
  :title="title"
  :visible.sync="dialogVisible"
  width="30%"
  @close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="权限名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="权限标识" prop="code">
    <el-input v-model="ruleForm.code"></el-input>
  </el-form-item>
  <el-form-item label="权限描述" prop="description">
    <el-input v-model="ruleForm.description"></el-input>
  </el-form-item>
  <el-form-item label="开启" >
    <el-switch
    v-model="ruleForm.enVisible"
    active-color="#13ce66"
    inactive-color="#ccc"
    active-value="1"
    inactive-value="0">
  </el-switch>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
    <el-button type="primary" @click="btnOk('ruleForm')">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import { getaddPermiss,getPermiss ,getEditPermiss} from "@/api/user";
export default {
    props:['dialogVisible','pid','title'],
 data () {
        return {
    ruleForm:{},
    rules: {
        name: [
            { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入权限标识', trigger: 'blur' }
        ]
    }
}
 },
 methods: {
     handleClose() {
        this.$emit('update:dialogVisible',false)
     },
     btnOk(formName) {
        this.$refs[formName].validate(async(valid) => {
            if (valid) {
              console.log(this.ruleForm);
              if (this.title == '编辑权限点') {
                let res = await getEditPermiss({ ...this.ruleForm, id: this.pid })
                console.log(res,'更新权限');
              } else {
              let res = await getaddPermiss({...this.ruleForm,pid:this.pid})
            }
              // console.log(res, '添加权限');
            this.$emit('fn')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   },

  async getPermiss() {
    let res = await getPermiss(this.pid)
    console.log(res, '权限xq');
    this.ruleForm=res.data
   }
 },
 components: {

 },
 computed: {

 },
filters: {

 },
 watch: {

 },
 created () {
// this. getPermiss()
 },
 mounted () {

 },
}
</script>

<style lang='scss' scoped>
</style>
