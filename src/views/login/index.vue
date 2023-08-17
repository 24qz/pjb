<template>
 <div>
  <img style="float: left;" src="../../assets/login_back.5ecbf4ab (1).png" alt="">
  <div style="float: left;margin-left: 160px; margin-top: 400px;width: 300px;">
    <h3>登录</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item  prop="mobile">
    <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item  prop="isAgree">
    <el-checkbox-group v-model="ruleForm.isAgree">
      <el-checkbox label="用户平台使用协议" ></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
    </el-form>
  </div>
 </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
 data () {
    return {
      ruleForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree:true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码格式不正确', trigger: 'blur' }
        ],
        isAgree: [
            {  required: true, message: '请勾选', trigger: 'change' }
          ],
      }
    }
 },
  methods: {
  ...mapActions('user',['login']),
  submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            console.log(this.ruleForm,'shuju');
           await this.login(this.ruleForm)
this.$router.push('dashboard')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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

<style lang='scss' >
.el-input__inner{
width: 100%;
background-color: #f4f5fb
}
.el-form-item__content{
margin-left: 0px !important
}
</style>
