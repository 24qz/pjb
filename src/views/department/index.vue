<template>
 <div>
  <div style=" padding: 20px;">
   <el-tree
   style="padding: 30px 50px;"
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }" >
   <span style="margin-right: 20px;">{{ data.name }}</span>
   <span style="margin-left: 20px;">
          <el-button
            type="text"
            size="mini"
           >
           {{ data.managerName }}
          </el-button>
          
          <el-dropdown trigger="click" @command="handleCommand($event,data)">
            <el-button
            type="text"
            size="mini"
            >
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item command="添加子部门">添加子部门</el-dropdown-item>
    <el-dropdown-item command="编辑部门">编辑部门</el-dropdown-item>
    <el-dropdown-item command="删除">删除</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </span>
      </span>
    </el-tree>
    <addDialog :showDialog.sync="showDialog" :pid="pid" @fn="getpartment" @fn1="close" :flag="flag" :ruleForm="ruleForm"></addDialog>
  </div>
 </div>
</template>

<script>
import addDialog from "./components/add_Dialog";
import { getDepartment } from "@/api/user";
import { getTree } from "@/utils/index";
export default {
  data() {
    return {
      ruleForm: {
        code: "",
        introduce: "",
        managerId: "",
        name: "",
        pid: null
        },
      data: [],
      showDialog: false,
      pid: null,
      flag:''
    };
  },
  methods: {
    async getpartment() {
      let res = await getDepartment();
      // console.log(res);
      this.data = getTree(res.data, 0);
    },
    handleCommand(command, data) {
      this.flag=command
      this.pid = data.pid;
      if (command == "添加子部门") {
        this.showDialog = true;
       this. ruleForm= {
        code: "",
        introduce: "",
        managerId: "",
        name: "",
        pid: null
        }
      } else if (command == '编辑部门') {
        this.showDialog = true;
        this.ruleForm = data
      }
    },
    close() {
      this. ruleForm= {
        code: "",
        introduce: "",
        managerId: "",
        name: "",
        pid: null
        }
      this.showDialog = false;
    }
  },
  components: { addDialog },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.getpartment();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node:hover{
  // color: red !important;
}
.el-button--text {
  // color: #525050;
  margin: 0 5px;
  font-size: 14px;
}
.custom-tree-node[data-v-18c2d522]:hover{
  color: #409EFF !important;
}
</style>
