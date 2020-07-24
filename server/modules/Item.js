const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String }, // 属性name，类型为String   
    icon: { type: String }, // 属性icon，类型为String  
  });
  


module.exports=mongoose.model('Item',schema)           //导出