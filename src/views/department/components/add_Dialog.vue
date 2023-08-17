<template>
 <div>
    <el-dialog :title="flag=='删除'?'':flag" :visible="showDialog" @close="close">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="部门名称" prop="name">
    <el-input v-model="ruleForm.name" placeholder="2-10个字符"></el-input>
  </el-form-item>
  <el-form-item label="部门编码" prop="code">
    <el-input v-model="ruleForm.code" placeholder="2-10个字符"></el-input>
  </el-form-item>
  <el-form-item label="部门负责人" prop="managerId" style="width: 100%;">
    <el-select v-model="ruleForm.managerId" placeholder="请选择负责人" style="width: 100%;">
      <el-option :label="item.username" :value="item.id" v-for="(item, index) in ManagerList" :key="item.id"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="部门介绍" prop="introduce">
    <el-input type="textarea" v-model="ruleForm.introduce" placeholder="1-100个字符"></el-input>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import { getDepartment, getManagerList, addDepartment,updateDepartment } from "@/api/user";
export default {
  props: ["showDialog", "pid", "flag", "obj", "ruleForm"],
    data() {
    // 部门编码自定义校验规则
    const validateCode = async (rule, value, callback) => {
      let res = await getDepartment();
      console.log(res);
      if (this.ruleForm.id) {
        res.data = res.data.filter(item => item.id !== this.ruleForm.id);
      }
      if (res.data.some(item => item.code == value)) {
        callback(new Error("部门编码已存在"));
      } else {
        callback();
      }
        };

    // 部门名称自定义校验规则
    const validateName = async (rule, value, callback) => {
      let res = await getDepartment();
      console.log(res);
      if (this.ruleForm.id) {
        res.data = res.data.filter(item => item.id !== this.ruleForm.id);
      }
      if (res.data.some(item => item.name == value)) {
        callback(new Error("部门名称已存在"));
      } else {
        callback();
      }
    };
    return {
      ManagerList: [],
      rules: {
        code: [
          { required: true, message: "部门编码", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          },
          { validator: validateCode, trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          },
          { validator: validateName, trigger: "blur" }
        ],
        managerId: [
          { required: true, message: "请选择负责人", trigger: "change" }
        ],
        introduce: [
          { required: true, message: "请填写部门介绍", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
          if (valid) {
            //通过是否有id，判断是添加还是编辑
              if (this.ruleForm.id) {
                updateDepartment({...this.ruleForm})
              } else {
                addDepartment({ ...this.ruleForm, pid: this.pid });
            }
            this.$emit("fn");
          this.close();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    //   let show = false;
    //   this.$emit("fn1", show);
    //   },
    
    async getManager() {
      let res = await getManagerList();
      //   console.log(res);
      this.ManagerList = res.data;
      },

      //取消时清空表单
    close() {
      let show = false;
      this.$emit("fn1", show);
    }
  },
  components: {},
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.getManager();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
</style>
