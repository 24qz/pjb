<template>
 <div>
    <el-cascader
    :props="defaultProps"
    :options="options"
    separator="-"
    @change="handleChange"></el-cascader>
 </div>
</template>

<script>
import { getDepartment,getaddUser } from "@/api/user";
import { getTree } from "@/utils/index";
export default {
 data () {
return {
    defaultProps: {
        label: 'name',
        value:'id'
    },
options:[]
}
 },
 methods: {
    handleChange(value) {
         console.log(value);
         if (value.length) {
             this.$emit('input',value[value.length-1])
         } else {
            this.$emit('input',null)
        }
     },
     async getpartment() {
      let res = await getDepartment();
    //   console.log(res);
      this.options = getTree(res.data, 0);
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
this.getpartment()
 },
 mounted () {

 },
}
</script>

<style lang='scss' scoped>
</style>
