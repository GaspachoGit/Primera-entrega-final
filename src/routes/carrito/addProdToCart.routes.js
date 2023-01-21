const {Router} = require('express')
const addProdToCart = Router()

const cartManag = require('../../cart')
const carrito = new cartManag()

addProdToCart.post('/:cid/products/:pid', async (req, res) =>{
  const {cid, pid} = req.params
  const pidInt = parseInt(pid)
  await carrito.addProductToCart(cid, pidInt)
  res.send(await carrito.addProductToCart(cid, pidInt))
})

module.exports = {
  addProdToCart
}