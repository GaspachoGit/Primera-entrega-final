const express = require ('express')
const app = express()


const {allProds} = require('./routes/products/products.routes')
const {productsById} = require('./routes/products/productsById.routes')
const {addProds} = require('./routes/products/addProds.routes')
const {updateProduct} = require('./routes/products/updateProducts.routes')
const {deleteById} = require('./routes/products/deleteProduct.routes')

const {newCart} = require('./routes/carrito/newCart.routes')
const {cartById} = require('./routes/carrito/cartById.routes')
const {addProdToCart} = require ('./routes/carrito/addProdToCart.routes')

app.use(express.json())

app.use('/api/products', allProds)
app.use('/api/products', productsById)
app.use('/api/products', addProds)
app.use('/api/products', updateProduct)
app.use('/api/products', deleteById)

app.use('/api/carts', newCart)
app.use('/api/carts', cartById)
app.use('/api/carts', addProdToCart)



app.listen(8080, ()=>{
  console.log('running from express!!')
})









/* app.get('/products/:id', async(req, res)=>{
  const {id} = req.params
  const allProd = await products.getProducts()
  const product = allProd.find(product => product.id === parseInt(id)) 
  if(product == undefined){
    return res.send(`<h1>El id que colocó, no coincide con ninguno de los productos enlistados</h1>`)
  }
  res.send(product)
})
 */



/* app.get('/products', async(req, res)=>{
  const {limit} = req.query
  let absLimit= Math.abs(limit) 
  let allProd = await products.getProducts()
  let limitedProds = allProd.slice(0, absLimit)
  if (absLimit) {
    if (absLimit>allProd.length) {
      return res.send(`<h1>El límite establecido es mayor a la cantidad de productos existentes</h1>`)
    }
    return res.send(limitedProds)
  }
  res.send(allProd)

}) */
