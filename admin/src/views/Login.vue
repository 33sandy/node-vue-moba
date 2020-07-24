<template>
    <div class="login-container">
       <el-card header="请先登录">
          <el-form :model="model" ref="form" @submit.native.prevent="login"  label-width="80px">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item type="password" label="密码">
                  <el-input type="password" v-model="model.password"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
          </el-form>
          
       </el-card>
       
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            model:{}
        }
    },
    methods: {
        async login(){
            const res=await this.$http.post('login',this.model)
            console.log(res.data)
            const data= res.data;
            if(data.status ==0){
                this.$message({
                    message: '登录成功',
                    type: 'success'
                    });
                localStorage.token=data.token;
                this.$router.push('/')
            }else{
                this.$message.error(data.message);
            }
           
        }
    }
}
</script>

<style >
    .login-container{width: 60%;margin:100px auto;}
</style>