<template>
  <div class>
    <h1>{{ id ? '编辑':'新建'}}英雄</h1>
    <el-form @submit.native.prevent="save">
      <el-tabs type="border-card" value="sklls">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称" label-width="120px">
            <el-input v-model="model.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="称号" label-width="120px">
            <el-input v-model="model.title" placeholder="请输入称号"></el-input>
          </el-form-item>
          <el-form-item label="头像" label-width="120px">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
              :before-upload="beforeUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型" label-width="120px">
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" label-width="120px">
            <el-rate style="margin-top:0.6rem" v-model="model.scores.difficult" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能" label-width="120px">
            <el-rate style="margin-top:0.6rem" v-model="model.scores.skills" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击" label-width="120px">
            <el-rate style="margin-top:0.6rem" v-model="model.scores.attck" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存" label-width="120px">
            <el-rate style="margin-top:0.6rem" v-model="model.scores.survive" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装" label-width="120px">
            <el-select v-model="model.items1" placeholder="请选择" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" label-width="120px">
            <el-select v-model="model.items2" placeholder="请选择" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧" label-width="120px">
            <el-input type="textarea" v-model="model.usageTips" placeholder="请输入使用技巧"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" label-width="120px">
            <el-input type="textarea" v-model="model.battleTips" placeholder="请输入对抗技巧"></el-input>
          </el-form-item>
          <el-form-item label="团战思路" label-width="120px">
            <el-input type="textarea" v-model="model.teamTips" placeholder="请输入团战思路"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="sklls">
          <el-button  type="primary"  size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row style="flex-warp:warp">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称" label-width="120px">
                <el-input v-model="item.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="图标" label-width="120px">
                <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="res=>$set(item,'icon',res.url)"
                :before-upload="beforeUpload"
              >
                <img v-if="item.icon" :src="item.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </el-form-item>
              <el-form-item label="描叙" label-width="120px">
                <el-input type="textarea" v-model="item.description" placeholder=""></el-input>
              </el-form-item>
               <el-form-item label="小提示" label-width="120px">
                <el-input type="textarea" v-model="item.tips" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="danger" @click="model.skills.splice(index,1)">删除</el-button>
                
              </el-form-item>
              
            </el-col>
          </el-row>
          
        </el-tab-pane>
        
      </el-tabs>
      <el-form-item label="搭档" label-width="120px">
        <el-select v-model="model.pattern" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/heros/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      items: [],
      model: {
        scores: {},
        skills:[],
        
      }
    };
  },
  methods: {
    async save() {
      //换成同步
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heros", this.model);
      }

      console.log(res);
      if (res.status == 200) {
        this.$router.push("/heros/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    afterUpload(res, file) {
      console.log(res);
      console.log(file);
      this.$set(this.model, "avatar", res.url); //给model挂载一个icon，然后赋值res.url
      // this.model.icon=res.url;
    },
    beforeUpload(file) {
      const isImg = file.type === "image/jpeg" || "images/png" || 'images/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isImg) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isImg && isLt2M;
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);
      if (res.status == 200) {
        this.model = Object.assign({}, this.model, res.data); //res.data不覆盖model数据，有重复的参数就覆盖，没有就后加
      }
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      if (res.status == 200) {
        this.categories = res.data;
      }
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      if (res.status == 200) {
        this.items = res.data;
      }
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  }
};
</script>

<style scoped>

.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
