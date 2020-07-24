const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String }, // 属性name，类型为String   
    avatar: { type: String }, // 属性icon，类型为String  
    title: { type: String }, // 属性icon，类型为String  
    categories:[ { type: mongoose.SchemaTypes.ObjectId,ref:'Category' }], // 关联ID数组，Category
    scores:{            //评分json
      difficult:{type:Number},
      skills:{type:Number},
      attck:{type:Number},
      survive:{type:Number},
    },
      skills:[{       //技能json，数组
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},

      }],
      items1:[{ type: mongoose.SchemaTypes.ObjectId,ref:'Item' }],    //装备1
      items2:[{ type: mongoose.SchemaTypes.ObjectId,ref:'Item' }],    //装备2
      usageTips:{type:String},      //使用技巧
      battleTips:{type:String},     //对抗技巧
      teamTips:{type:String},     //团战思路
      pattern:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}
      }]


  });
  


module.exports=mongoose.model('Hero',schema)           //导出