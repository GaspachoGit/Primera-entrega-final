const express = require ('express')
const prodManag = require ('./productManager')
const app = express()

const products = new prodManag()

app.get('/products', async(req, res)=>{
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
})

app.get('/products/:id', async(req, res)=>{
  const {id} = req.params
  const allProd = await products.getProducts()
  const product = allProd.find(product => product.id === parseInt(id)) 
  if(product == undefined){
    return res.send(`<h1>El id que colocó, no coincide con ninguno de los productos enlistados</h1>`)
  }
  res.send(product)
})



app.listen(8080, ()=>{
  console.log('running from express!!')
})
















/* app.get('/bienvenida', (req, res)=>{
  res.send(`<h1 style= "color: purple;">Bueen díaaaa, hermosa mañana ¿Verdaaaa'? je je je</h1>`)
})

app.get('/users/:id', (req,res)=>{
  console.log(req.params.id)
  res.send(users)
})
 */
