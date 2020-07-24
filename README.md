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

1.1 安装mongoose

1.2 创建db.js数据库插件  (server/plugins/db.js)

1.3 创建接口 创建routes文件放， 

1.3.1 创建后台接口文件admin，index.js(server/routes/admin/index.js)，这里写接口（增删改查）

1.3.2 创建模型 modules,前台，后台通用


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

    2. 创建子分类

    1.1 ***通用 CRUD 接口*** (create,remove,update,delet)

    1.2 创建物品

    1.3 图片上传

     npm i multer

     1.4 英雄管理

    1.5  文章管理

    详情用富文本编辑器

    npm install vue-quill-editor –save
    npm install vue2-editor

    1.6 管理员

    密码散列加密
    npm i bcrypt

    ## 登录接口

    1.返回token

      npm i jsonwebtoken (server文件夹下)

   1.1 服务器端检验

   1.2 服务器端检验 (http-assert) 抛出报错信息

   npm i http-assert (server文件夹下)

   1.3登录校验 中间件

   middleware

   1.4路由限制


   # web 端页面
   
   





