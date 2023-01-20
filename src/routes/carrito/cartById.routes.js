const {Router} = require('express')
const cartById = Router()

const cartManag = require('../../cart')
const carrito = new cartManag()

cartById.get('/:cid', async(req, res)=>{
  const {cid} = req.params
  const cart = await carrito.getCartById(cid)
  res.json(cart)

})

module.exports = {
  cartById
}