const {Router} = require('express')
const updateProduct = Router()
const prodManag = require ('../productManager')

const products = new prodManag()

updateProduct.patch('/:id', async(req, res)=>{
  const {id} = req.params
  const numId = parseInt(id)
  const infoProd = req.body

  products.updateProduct(numId, infoProd)
  res.json({msj: 'producto actualizado'}) 
})

module.exports = {
  updateProduct
}