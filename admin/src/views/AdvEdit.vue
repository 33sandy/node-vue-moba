<template>
  <div class>
    <h1>{{ id ? '编辑':'新建'}}广告位</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告" label-width="120px">
        <el-button type="primary" size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row style="flex-warp:warp">
          <el-col :md="12" v-for="(item,index) in model.items" :key="index">
            <el-form-item label="链接" label-width="120px">
              <el-input v-model="item.url" placeholder></el-input>
            </el-form-item>
            <el-form-item label="图片" label-width="120px" style="margin-top:1rem;">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
                :before-upload="beforeUpload"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label >
              <el-button type="danger" @click="model.skills.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/advs/list')">取消</el-button>
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
      model: {
        items: []
      }
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      //换成同步
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/advs/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/advs", this.model);
      }

      console.log(res);
      if (res.status == 200) {
        this.$router.push("/advs/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },

    beforeUpload(file) {
      const isImg = file.type === "image/jpeg" || "images/png" || "images/jpeg";
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
      const res = await this.$http.get(`rest/advs/${this.id}`);
      if (res.status == 200) {
        this.model = Object.assign({}, this.model, res.data);
      }
    }
  }
};
</script>

<style>

</style>
