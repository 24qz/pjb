<template>
 <div>
    <el-dialog
  title="分配角色"
  :visible="dialogVisible1"
  width="37%"
  @close="handleClose">
  <el-checkbox-group v-model="checkList" @change="changes">
    <el-checkbox :label="item.id"  v-for="item in rolelist" :key="item.id">{{ item.name }}</el-checkbox>
  </el-checkbox-group>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="btnOk">确 定</el-button>
    <el-button @click="$emit('update:dialogVisible1',false)">取 消</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import { getEnabledRoles,getEmployeeDetail,assignRole } from "@/api/user";
export default {
  props: ["dialogVisible1",'id'],
  data() {
    return {
      rolelist: [],
        checkList: [],
      editList:[]
    };
  },
    methods: {
    
    async getEnRoles() {
      let res = await getEnabledRoles();
    //   console.log(res, "可用角色");
      this.rolelist = res.data;
      },

     async getEmployee() {
         let res = await getEmployeeDetail(this.id)
        //  console.log(res, '用户基本信息');
        this.checkList=res.data.roleIds
      },
      
    changes(e) {
        console.log(e);
      this.editList=e
    },
      handleClose() {
        this.$emit('update:dialogVisible1',false)
    },
        btnOk() {
            let res = assignRole({id:this.id,roleIds:this.editList})
            console.log(res, '编辑信息');
            this.$emit('update:dialogVisible1',false)
    },
    btnCancal() {}
  },
  components: {},
  computed: {},
  filters: {},
  watch: {},
  created() {
      this.getEnRoles();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
</style>
