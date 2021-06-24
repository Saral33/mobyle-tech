const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=> console.log(`DB Connected!!!`)).catch((err)=> console.log(err))