<template>
 <div>
    <el-dialog
  title="分配角色"
  :visible="dialogVisible"
  width="37%"
  @close="handleClose">
  <el-tree
  :data="data"
  :check-strictly="true"
  show-checkbox
  node-key="id"	
  default-expand-all
  ref="tree"
  :props="defaultProps">
</el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="btnOk">确 定</el-button>
    <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
  </span>
</el-dialog>

    
 </div>
</template>

<script>
import { getTree } from "@/utils/index";
import { getPermission, getRole ,getassign} from "@/api/user";
export default {
  props: ["dialogVisible", "pid"],
  data() {
    return {
      data: [],
      list: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
      handleClose() {
      this.$emit("update:dialogVisible", false);
    },

    async getdata() {
      let res = await getPermission();
      this.data = getTree(res.data, 0);
    //   console.log(this.data, "权限");
    },

      async getRoleData() {
      let res = await getRole(this.pid);
    //   console.log(res, "角色详情");
        // this.list = res.data.permIds;
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(res.data.permIds)
          })
        //   console.log(this.list);
      },
     
      async btnOk() {
              const item = this.$refs.tree.getCheckedKeys()
          console.log(item);
          let res = await getassign({ id: this.pid, permIds: item })
          console.log(res, '权限');
         this.$emit('update:dialogVisible',false)
    }
  },
  components: {},
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
