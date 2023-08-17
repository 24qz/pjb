<template>
 <div>
<div style="background-color: white; margin-top: 20px; margin-left: 20px;width: 97%;padding: 10px;">
<el-button style="background-color: #2752fb; color: white; margin-bottom: 20px;" size="mini" @click="handleAdd">添加权限</el-button>
<el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="name"
      label="名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="标识"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
        v-if="scope.row.pid==0"
          size="mini"
          type="text"
          @click="handleAdd(scope.$index, scope.row)">添加</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
<add :dialogVisible.sync="dialogVisible" @fn="fn" :pid="id" :title="title" ref="edit"></add>
 </div>
</template>

<script>
import add from "./components/add";
import { getPermission,delPermiss } from "@/api/user";
import { getTree } from "@/utils/index";
export default {
  data() {
        return {
          dialogVisible: false,
          id: null,
            title:'新增权限点',
      tableData: []
    };
  },
  methods: {
    async getdata() {
      let res = await getPermission();
      // console.log(res, "权限列表");
      this.tableData = getTree(res.data, 0);
      },
    
    //添加
    handleAdd(index, row) {
      // console.log(index, row);
      if (row) {
        this.id=row.id
      }
      
      this.dialogVisible=true
      },
    
    // 编辑
    handleEdit(index, row) {
      console.log(index, row,'编辑详情');
      this.title = '编辑权限点'
      this.id = row.id
      this.$nextTick(() => {
        this.$refs.edit.getPermiss(row.id)
      })
      this.dialogVisible=true
      },
    
    //   删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('确定要删除该数据吗？',  {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          
      }).then(async() => {
        let res = await delPermiss(row.id)
        this.getdata()
          console.log(res,'删除权限点');
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

    fn() {
      this.getdata()
      this.dialogVisible=false

    }
  },

  components: {add},
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
