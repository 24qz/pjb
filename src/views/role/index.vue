<template>
 <div >
    <div style="background-color: white; margin: 20px;padding: 20px;">
      <el-button size="mini" style="background-color:#2752fb ; color: white;" @click="addRole">添加角色</el-button>
      <el-table
      border
    :data="tableData"
    style="width: 100%;margin-top: 10px;">
    <el-table-column
    label="序号"
      type="index"
      width="80"
      >
    </el-table-column>
    <el-table-column
      label="角色"
      width="180">
      <template slot-scope="scope">
      <span  v-if="!scope.row.isShow">  {{ scope.row.name }}</span>
        <el-input  v-else v-model="scope.row.name"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="启用"
      width="180">
      <template slot-scope="scope">
       <span v-if="!scope.row.isShow">{{ scope.row.state===1?'已启用':scope.row.state===0?'未启用':'' }}</span>
       <el-switch
       v-else
    v-model="scope.row.state"
    active-color="#409eff"
    inactive-color="#ccc"
    :active-value=1
    :inactive-value=0>
  </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="描述"
      width="500">
      <template slot-scope="scope">
        <span v-if="!scope.row.isShow">{{ scope.row.description }}</span>
        <el-input
v-else
  type="textarea"
  :rows="2"
  v-model="scope.row.description">
</el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope" >
         <div v-if="!scope.row.isShow">
            <el-button
          size="mini"
          type="text"
          @click="handleSet(scope.$index, scope.row)">分配权限</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </div>
         <div v-else>
            <el-button style="background-color: #2752fb;color: white;" size="mini"  @click="btnSetOk(scope.$index, scope.row)">确定</el-button>
  <el-button type="" plain  size="mini" @click="btnSetQx(scope.$index, scope.row)">取消</el-button>
         </div>
      </template>
    </el-table-column>
  </el-table>

  <addlog :dialogFormVisible="dialogFormVisible" @fn="fn"></addlog>
  <permission :dialogVisible.sync="dialogVisible" :pid="id" ref="getdataref"></permission>

  <el-pagination
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :page-size="5"
    :current-page="1"
    :total="total">
  </el-pagination>
    </div>
 </div>
</template>

<script>
import permission from "./components/permission.vue";
import addlog from "./components/addRole_Dialog";
import { getDataRole ,upDataRole,delRole} from "@/api/user";
export default {
  data() {
    return {
      id:null,
      tableData: [],
      dialogVisible:false,
       dialogFormVisible:false,
      pagedata: {
        page: 1,
        pagesize: 5
      },
      total: null
    };
  },
  methods: {
    async getdata() {
        let res = await getDataRole(this.pagedata);
      console.log(res);
      this.tableData = res.data.rows;
      this.tableData.forEach(item => {
        // item.isShow = false
        this.$set(item, "isShow", false);
      });
      this.total = res.data.total;
    },

    handleSet(index, row) {
      // console.log(index, row);
      this.id = row.id
      this.dialogVisible = true
      this.$nextTick(() => {
  this.$refs.getdataref.getRoleData()
})
    },

    handleEdit(index, row) {
       row.isShow = true;
      //  console.log(index, row);
    },

    handleDelete(index, row) {
      // console.log(index, row);

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async() => {
        let res = await delRole({ id: row.id })
      console.log(res, '删除角色');
      this.getdata();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },

    async btnSetOk(index, row) {
       console.log(row);
       if (row.name&&row.description) {
          let res = await upDataRole({ ...row, id: row.id })
          console.log(res);
          Object.assign(row, {
             ...row,
            isShow:false
          })
          row.isShow=false
       } else {
         this.$message({
          message: '不能为空',
          type: 'warning'
        });
       }
    },
    btnSetQx(index, row) {
      row.isShow = false;
     },

     addRole() {
      console.log(111);
      this.dialogFormVisible=true
     },

    handleCurrentChange(val) {
      this.pagedata.page = val;
      this.getdata();
    },
    fn() {
      this.getdata();
      this.dialogFormVisible = false
      
    }
  },
  components: {addlog,permission},
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.getdata();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
</style>
