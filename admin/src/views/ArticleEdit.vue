<template>
  <div class="">
    <h1>{{ id ? '编辑':'新建'}}文章</h1>
     <el-form @submit.native.prevent='save'>
       <el-form-item label="所属分类">
         <el-select v-model="model.categories" placeholder="请选择" multiple>
           <el-option v-for="item in categories"
             :key="item._id"
             :label="item.name"
             :value="item._id">
           </el-option>
         </el-select>
         
       </el-form-item>
       
      <el-form-item label="标题" label-width="120px">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" label-width="120px">
        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"> </vue-editor>
      </el-form-item>
      

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/articles/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
    props: {
      id:{}
    },
    data () {
        return {
            model:{},
            categories:[],
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
               res=await this.$http.put(`rest/articles/${this.id}`,this.model)               
            }else{
              res=await this.$http.post('rest/articles',this.model)
            }
            
            console.log(res)
            if(res.status==200){
            this.$router.push('/articles/list')
            this.$message({
              type:"success",
              message:"保存成功"
            })
            }
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
          const formData = new FormData();
          formData.append("file", file);
          const res=await this.$http.post('upload',formData)
          const url = res.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        },
         async fetchParents(){
          const res=await this.$http.get(`rest/categories`)
          if(res.status==200){
              this.categories=res.data;
            }
        },
        async fetch(){
          const res=await this.$http.get(`rest/articles/${this.id}`)
          if(res.status==200){
              this.model=res.data;
            }
        }
    }
}
</script>
