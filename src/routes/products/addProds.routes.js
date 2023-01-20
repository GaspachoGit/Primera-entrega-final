const {Router} = require('express')
const addProds = Router()
const prodManag = require ('../../productManager')


const products = new prodManag()

addProds.post('/', async(req,res)=>{
  const infoProd = req.body 
  products.addProducts(infoProd)
  res.json({msg: 'producto añadido'}) 
  
})

module.exports = {
  addProds
}