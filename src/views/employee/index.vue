<template>
 <div>
   <div style="padding: 20px;">
      <div class="left">
         <el-input style="height: 40px;" v-model="serinp" placeholder="输入员工姓名全员搜索" @change="search"> <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
         <el-tree style="margin-top: 10px;" :data="data" 
         ref="deptTree"
          :highlight-current="true" 
          default-expand-all 
          node-key="id"
          :expand-on-click-node="false"
           @node-click="selectNode">
            <template class="custom-tree-node" slot-scope="{ node, data }" >
   <span>{{ data.name }}</span></template>
</el-tree>
      </div>

      <div class="right">
         <div style="float: right;display: flex; margin-bottom: 20px;">
  <el-button size="mini" style="background-color: #2752fb; color: white;" v-permission="'employee'" @click="$router.push('/employee/detail')">添加员工</el-button>
  <el-button style="margin: 0 10px;" size="mini" @click="dialogVisible=true">excel导入</el-button>
  <importExcel :dialogVisible.sync="dialogVisible" @fn="getUserdata"></importExcel>
  <el-button size="mini" @click="exportUser">excel导出</el-button>
         </div>
         <el-table
    :data="tableData"
    style="width: 100%;">
    <el-table-column
      label="头像"
      >
      <template slot-scope="scope">
       <el-avatar v-if="scope.row.staffPhoto" :src="scope.row.staffPhoto"></el-avatar>
       <el-avatar v-else style="background-color: #04c9be;"> {{scope.row.username.charAt(0) }} </el-avatar>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      >
      <template slot-scope="scope">
       {{ scope.row.username }}
      </template>
    </el-table-column>
    <el-table-column
      label="手机号"
      >
      <template slot-scope="scope">
       {{ scope.row.mobile }}
      </template>
    </el-table-column>
    <el-table-column
      label="工号"
      >
      <template slot-scope="scope">
       {{ scope.row.workNumber }}
      </template>
    </el-table-column>
    <el-table-column
      label="聘用形式"
      >
      <template slot-scope="scope">
       {{ scope.row.formOfEmployment==1?'正式':'非正式' }}
      </template>
    </el-table-column>
    <el-table-column
      label="部门"
      >
      <template slot-scope="scope">
       {{ scope.row.departmentName }}
      </template>
    </el-table-column>
    <el-table-column
      label="入职时间"
      >
      <template slot-scope="scope">
       {{ scope.row.timeOfEntry }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="text"
          @click="$router.push(`/employee/detail${scope.row.id}`)">查看</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleEditRole(scope.$index, scope.row)">角色</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="userInfo.page"
      :page-size="userInfo.pagesize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
      </div>
   </div>

   <editRole :dialogVisible1.sync="dialogVisible1" :id="id" ref="getdata"></editRole>

 </div>
</template>

<script>
import { getDepartment, getDataUser, exportEmployee } from "@/api/user";
import { getTree } from "@/utils/index";
import importExcel  from "./components/importExcel";
import { saveAs } from "file-saver";
import editRole from "./components/editRole.vue";
export default {
  data() {
    return {
      dialogVisible1:false,
      dialogVisible: false,
         id:null,
      serinp: "",
      data: [],
      tableData: [],
      total: null,
      userInfo: {
        keyword: "",
        departmentId: null,
        page: 1,
        pagesize: 10
      }
    };
  },
   methods: {
   
    async getpartment() {
      let res = await getDepartment();
      // console.log(res);
      this.data = getTree(res.data, 0);
    },


    selectNode(e) {
      console.log(e);
      this.userInfo.departmentId = e.id;
      // console.log(this.userInfo.departmentId);
      this.getUserdata();
    },

   //  获取员工列表信息
    async getUserdata() {
      let res = await getDataUser(this.userInfo);
      //  console.log(res, "员工列表");
      this.tableData = res.data.rows;
      this.total = res.data.total;
      //  this.$nextTick(()=>{
      //   this.$refs.deptTree.setCurrentKey(this.userInfo.departmentId)
      // })
     },
    
// 搜索
    search(e) {
      console.log(e, '搜搜');
      this.userInfo.keyword=e
      this.getUserdata();
    },
//导出员工信息表
    async exportUser() {
      let res = await exportEmployee();
      console.log(res, "导出数据");
      saveAs(res, "员工信息表.xlsx");
    },

    //编辑
    handleEdit(index, row) {
      console.log(index, row);
     },

    //分配角色
    handleEditRole(index, row) {
      console.log(index, row);
      this.id = row.id
      this.$nextTick(() => {
        this.$refs.getdata.getEmployee()
      })
      this.dialogVisible1 = true
      
     },

    // 删除
    handleDelete(index, row) {
      console.log(index, row);
    },
// 分页每页条数变化
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.userInfo.pagesize = val;
      this.getUserdata();
     },

    // 分页当前页变化
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.userInfo.page = val;
      this.getUserdata();
    }
  },
  components: {importExcel,editRole},
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.getpartment();
    this.getUserdata();
  },
  mounted() {}
};
</script>

<style>
.left {
  width: 15%;
  padding: 20px;
  float: left;
  background-color: white;
}
.right {
  width: 83%;
  margin-left: 3px;
  float: left;
  padding: 20px;
  background-color: white;
}
.el-tree-node .el-tree-node__content {
  height: 40px !important;
  font-size: 14px;
}

.el-table .el-table__header .is-leaf {
  background-color: #f5f6f8;
}
</style>
