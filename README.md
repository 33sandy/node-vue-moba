# node-vue-moba
node+express +mongodb server+nodemon+vue cli 3。自己 练习，写王者荣耀官网
# 1.工具环境的搭建
## 1.从GitHub下载项目 https://github.com/33sandy/node-vue-moba
# 2.初始化项目
git init
## 1.创建文件
### mkdir server 创建服务端文件夹
### vue create web   vue 创建web端项目
选择默认
### vue create admin   vue 创建admin端后台项目
选择默认
### 初始化server服务端 ---npm init -y
在package.json scripts里，自定义命令
"serve":"nodemon index.js",   //用serve启用nodemon
没有安装可以先全局安装nodemon
npm i -g nodemon
 npm i express@next mongoose cors

# 3.基于Element UI后台，admin文件夹下操作
###  1.vue add element (完全引用y,都直接回车)
###  2.添加路由
 vue add router（不使用history模式的路由，选择n）
### 3. 添加页面
 main.vue 主页面  src/views
### 3.1创建分类
 el-menu router :default-openeds="['1', '3']">  router 开启路由

    1.创建分类 （CategoryEdit.vue）

    1.分类列表  （CategoryList.vue）






