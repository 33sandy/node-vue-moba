const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String }, // 属性name，类型为String   
    items:[{
         image:{type: String }  ,    // 属性icon，类型为String  
         url:{type:String}
      }], 
  });
  


module.exports=mongoose.model('Adv',schema)           //导出