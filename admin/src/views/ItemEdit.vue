<template>
  <div class="">
    <h1>{{ id ? '编辑':'新建'}}物品</h1>
     <el-form @submit.native.prevent='save'>
       
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
       <el-form-item label="图标" label-width="120px">
        <el-upload
          class="avatar-uploader"
          :action="uploadURl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
          :before-upload="beforeUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/items/list')">取消</el-button>
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
        }
    },
    created () {
      this.id && this.fetch()
    },
    methods: {
        async save(){     //换成同步
            let res
            if(this.id){
               res=await this.$http.put(`rest/items/${this.id}`,this.model)               
            }else{
              res=await this.$http.post('rest/items',this.model)
            }
            
            console.log(res)
            if(res.status==200){
            this.$router.push('/items/list')
            this.$message({
              type:"success",
              message:"保存成功"
            })
            }
        },
        afterUpload(res, file) {
          console.log(res)
          console.log(file)
          this.$set(this.model,'icon',res.url);     //给model挂载一个icon，然后赋值res.url
          // this.model.icon=res.url;
        },
        beforeUpload(file) {
          const isImg = file.type === 'image/jpeg' || 'images/png' || 'images/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 10;

          if (!isImg) {
            this.$message.error('上传头像图片只能是 图片 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 10MB!');
          }
          return isImg && isLt2M;
        },
        async fetch(){
          const res=await this.$http.get(`rest/items/${this.id}`)
          if(res.status==200){
              this.model=res.data;
            }
        }
    }
}
</script>

<style scoped>

.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
