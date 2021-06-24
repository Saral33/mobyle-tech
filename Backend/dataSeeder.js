require('dotenv').config()
const Product = require('./Models/productModel')
const products = require('./data')
require('./config/db')

const importData = async()=>{
    try{
        
        await Product.insertMany(products)
        console.log('Data entered in DB')
        process.exit()
    } catch(e){
        console.error(`error: ${e}`)
        process.exit(1)
    }

}

const destroyData = async ()=>{
    try {
        await Product.deleteMany()
        console.log('Data deleted')
        process.exit()
    } catch (error) {
        console.error(`error: ${error}`)
        process.exit(1)
    }
}


if(process.argv[2]==='-d'){
    destroyData()
} else{
    importData()
}