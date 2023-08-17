<template>
 <div style="background-color: white;overflow: hidden;">
    <div style="width: 30%; margin-top: 20px; margin-left: 100px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
    <el-form-item label="工号">
    <el-input v-model="ruleForm.workNumber" disabled></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="ruleForm.mobile"></el-input>
  </el-form-item>
  <el-form-item label="部门" prop="departmentId">
   <emp v-model="ruleForm.departmentId"></emp>
  </el-form-item>
  <el-form-item label="聘用形式" prop="formOfEmployment">
    <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择" style="width: 100%;">
      <el-option label="正式" :value="1"></el-option>
      <el-option label="非正式" :value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="入职时间" required>
    <el-col :span="11" style="width: 100%;">
      <el-form-item prop="timeOfEntry">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.timeOfEntry" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="转正时间" required>
    <el-col :span="11" style="width: 100%;">
      <el-form-item prop="correctionTime">
        <el-date-picker
      v-model="ruleForm.correctionTime"
      type="date"
      style="width: 100%;"
      placeholder="选择转正时间"
      value-format="yyyy-MM-dd"
   >
    </el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>

  <el-form-item label="员工头像" >
   <upLoadavator v-model="ruleForm.staffPhoto"></upLoadavator>
  </el-form-item>
  
  <el-form-item>
    <el-button style="background-color: #2752fb; color: white;" @click="submitForm('ruleForm')">{{$route.params.id?'保存更新':'保存'}}</el-button>
  </el-form-item>
</el-form>
 </div>
</div>
</template>

<script>

import { getDepartment,getaddUser,getEmployeeDetail ,getEditUser} from "@/api/user";
import emp from "./components/employment";
import upLoadavator from "./components/upLoadavator";
export default {
    data() {
        const Time = (rule,value,callback) => {
            if (this.ruleForm.timeOfEntry) {
                if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) { 
                    callback(new Error('转正时间不能小于入职时间'))
                return
            }
            }
        callback()
    }
return {
    ruleForm: {
        staffPhoto: '',
        workNumber:'',
    },
   
    rules: {
        username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mobile: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern:/^1[3-9]\d{9}$/,message:'手机号格式错误',trigger:'blur'}
          ],
          formOfEmployment: [
            { required: true, message: '请选择聘用形式', trigger: 'change' }
          ],
          departmentId: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          timeOfEntry: [
            { type: 'string', required: true, message: '请选择入职时间', trigger: 'change' }
          ],
          correctionTime: [
              { type: 'string', required: true, message: '请选择转正时间', trigger: 'change' },
            {validator:Time,trigger: 'change'}
          ]
        }
}
 },
 methods: {
    submitForm(formName) {
        this.$refs[formName].validate( async(valid) => {
          if (valid) {
            if (this.$route.params.id) {
              //编辑员工
              let res = await getEditUser(this.ruleForm)
              console.log(res);
            } else {
              //添加员工
              let res = await getaddUser(this.ruleForm)
            }
              
            this.$router.push('/employee')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
     },
    async getdata() {
        let res = await getEmployeeDetail(this.$route.params.id )
        console.log(res);
      this.ruleForm=res.data
     },

    
    
 },
 components: {
     emp,
     upLoadavator
 },
 computed: {

 },
filters: {

 },
 watch: {

 },
    created() {
        this.$route.params.id&& this.getdata()
// console.log(this.$route.params.id);
 },
 mounted () {

 },
}
</script>

<style lang='scss' >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
