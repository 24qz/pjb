<template>
 <div>
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="启用" prop="state">
    <el-switch v-model="ruleForm.state" :active-value="1"
    :inactive-value="0"></el-switch>
  </el-form-item>
  <el-form-item label="角色描述" prop="description">
    <el-input type="textarea" v-model="ruleForm.description"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import { setRole } from "@/api/user";
export default {
    props:['dialogFormVisible'],
    data() {
return {
  ruleForm:{},
  rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填写角色描述', trigger: 'blur' }
          ]
        }
}
 },
 methods: {
  submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            console.log(this.ruleForm);
            let res =await setRole(this.ruleForm)
            this.resetForm(formName)
          //  console.log(res,'新增角色信息');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('fn')
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

 },
 mounted () {

 },
}
</script>

<style lang='scss' scoped>
</style>
