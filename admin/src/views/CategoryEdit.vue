<template>
  <div class="">
    <h1>{{ id ? '编辑':'新建'}}分类</h1>
     <el-form @submit.native.prevent='save'>
       <el-form-item label="上级分类">
         <el-select v-model="model.parent" placeholder="">
           <el-option v-for="item in parents"
             :key="item._id"
             :label="item.name"
             :value="item._id">
           </el-option>
         </el-select>
         
       </el-form-item>
       
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/categories/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    props: {
      id:{}
    },
    data () {
        return {
            model:{},
            parents:[],
        }
    },
    created () {
      this.id && this.fetch()
      this.fetchParents()
    },
    methods: {
        async save(){     //换成同步
            let res
            if(this.id){
               res=await this.$http.put(`rest/categories/${this.id}`,this.model)               
            }else{
              res=await this.$http.post('rest/categories',this.model)
            }
            
            console.log(res)
            if(res.status==200){
            this.$router.push('/categories/list')
            this.$message({
              type:"success",
              message:"保存成功"
            })
            }
        },
         async fetchParents(){
          const res=await this.$http.get(`rest/categories`)
          if(res.status==200){
              this.parents=res.data;
            }
        },
        async fetch(){
          const res=await this.$http.get(`rest/categories/${this.id}`)
          if(res.status==200){
              this.model=res.data;
            }
        }
    }
}
</script>
