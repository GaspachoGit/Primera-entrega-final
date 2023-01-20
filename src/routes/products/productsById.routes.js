const {Router} = require('express')
const productsById = Router()
const prodManag = require ('../../productManager')

const products = new prodManag()

productsById.get('/:id', async (req, res)=>{
  const {id} = req.params
  const allProd = await products.getProducts()
  const product = allProd.find(product => product.id === parseInt(id)) 
  if(product == undefined){
    return res.send(`<h1>El id que colocó, no coincide con ninguno de los productos enlistados</h1>`)
  }
  res.send(product)
})
module.exports = {
  productsById
}