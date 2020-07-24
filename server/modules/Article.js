const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],       //表示ID，关联ID
    title: { type: String }, // 属性title，类型为String   
    body: { type: String }, // 属性body，类型为String   

  });
  


module.exports=mongoose.model('Atricle',schema)           //导出