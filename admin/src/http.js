import axios from 'axios'
import Vue from 'vue'
import router from './router';

const http=axios.create({
    baseURL:"http://localhost:3000/admin/api"
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
    config.headers.Authorization='Bearer '+ (localStorage.token || '');
  //  console.log(config.headers)
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })

http.interceptors.response.use(res=>{           //拦截器，拦截请求
    return res
},
err=>{          //处理请求失败的
  //  console.log(err.response.data.message)
  if(err.response.data.message){
    Vue.prototype.$message({                    //弹出失败的信息
        message:err.response.data.message,
        type:'error'
    })
    if(err.response.status == 401){
        console.log('login')
        router.push('/login')
    }
 }
    return Promise.reject(err)
}

)

export default http