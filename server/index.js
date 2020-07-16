const express = require('express');

const app=express();

app.use( require('cors')())     //允许跨域
app.use(express.json())         //可获取body字段json

// 引用，函数传app
require('./plungins/db')(app);
require('./routes/admin')(app);


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})