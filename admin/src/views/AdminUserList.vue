<template>
  <div class="">
    <h1>管理员列表</h1>
   <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="ID"
        width="">
      </el-table-column>
      
      <el-table-column
        prop="username"
        label="用户名"
        width="">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="">
      <template slot-scope="scope">
        <el-button type="primary" @click="$router.push(`/admin_user/edit/${scope.row._id}`)" size="small">编辑</el-button>
        <el-button type="primary" @click="remove(scope.row)" size="small">删除</el-button>
      </template>
    </el-table-column>

    </el-table>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData:[],
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/admin_user')
      console.log(res)
      if(res.status==200){
        this.tableData=res.data
      }
    },
    async remove(row){
      console.log(row._id)
      this.$confirm(`是否要删除 '${row.username}'`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/admin_user/${row._id}`)
          console.log(res)
          if(res.status==200)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
      
    }, 
  }
}
</script>
