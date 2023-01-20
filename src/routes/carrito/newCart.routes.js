const {Router} = require('express')
const newCart = Router()

const cartManag = require('../../cart')
const carrito = new cartManag()

newCart.post ('/', async(req, res)=>{
  carrito.newCart()
  res.json({msg: 'carrito añadido'})
})

module.exports = {
  newCart
}