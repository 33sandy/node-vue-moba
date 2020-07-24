<template>
  <div class="">
    <h1>物品列表</h1>
   <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="ID"
        width="">
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="物品名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="物品图标"
        width="">
        <template slot-scope="scope"> 
          <img :src="scope.row.icon" alt="" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="">
      <template slot-scope="scope">
        <el-button type="primary" @click="$router.push(`/items/edit/${scope.row._id}`)" size="small">编辑</el-button>
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
      const res = await this.$http.get('rest/items')
      console.log(res)
      if(res.status==200){
        this.tableData=res.data
      }
    },
    async remove(row){
      console.log(row._id)
      this.$confirm(`是否要删除物品 '${row.name}'`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/items/${row._id}`)
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
