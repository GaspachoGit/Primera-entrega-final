const {Router} = require('express')
const deleteById = Router()
const prodManag = require ('../../productManager')

const products = new prodManag()

deleteById.delete('/:id', async(req, res)=>{
  const {id} = req.params
  const numId = parseInt(id)
  products.deleteById(numId)
  res.json({msg: 'producto eliminado satisfactoriamente'})
})

module.exports = {
  deleteById
}