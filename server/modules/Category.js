const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String }, // 属性name，类型为String   
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},       //表示ID，关联ID
  });
  


module.exports=mongoose.model('Category',schema)           //导出