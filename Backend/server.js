const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./config/db')
require('dotenv').config()
const app = express()
const path = require('path')


const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const cartRoute = require('./routes/cartRoute')
const checkOutRoute = require('./routes/checkOutRoute')
const {updateCheckout} = require('./controllers/checkOutController')
const adminRoute = require('./routes/adminRoutes')
const {notFound,errorHandler} = require('./middleware/errorHandler')
const {cloudinaryConfig} = require('./config/cloudinary')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({
    origin: process.env.CORS_URL,
    credentials:true
}))
app.options('*', cors())

app.post('/stripe-webhook',express.raw({type:'application/json'}), updateCheckout)
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use('*', cloudinaryConfig);


app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/cart',cartRoute)
app.use('/api/checkout',checkOutRoute)
app.use('/api/admin',adminRoute)


const dirname = path.resolve()

if(process.env.ENVIRONMENT === 'production'){
    app.use(express.static(path.join(dirname,'/frontend/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(dirname,'frontend','build','index.html'))
    })
}
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {console.log(`App is running on port ${PORT}`)})
