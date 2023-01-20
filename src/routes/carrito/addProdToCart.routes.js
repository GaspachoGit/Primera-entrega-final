const {Router} = require('express')
const addProdToCart = Router()

const cartManag = require('../../cart')
const carrito = new cartManag()

addProdToCart.post('/:cid/products/:pid', async (req, res) =>{
  const {cid, pid} = req.params
  await carrito.addProductToCart(cid, pid)
  res.json({msg: 'producto añadido?'})
})

module.exports = {
  addProdToCart
}