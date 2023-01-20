const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const prodManag = require('./productManager.js')

const path = './cart.json'

const products = new prodManag()

class Carrito{

  getCarts = async () => {
    if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(data);
        return products;
    }
    else{
        return []
    }  
  }


  newCart = async()=>{
    const carts = await this.getCarts() 
    const newCarrito = {
      id : uuidv4(),
      products: []
    } 
    carts.push(newCarrito)
    try {
      await fs.promises.writeFile(path,JSON.stringify(carts));
      return newCarrito
    } catch (error) {
      console.log(error)
    }
  }

  getCartById = async(id)=>{
    const carts = await this.getCarts()
    const cart = carts.find(cart => cart.id === id)

    if (cart) {
      return cart
    }
    return 'No se ha encontrado un cart con dich ID'
  }

  addProductToCart = async ( cid, pid ) =>{
    const carts = await this.getCarts()
    const allProds = await products.getProducts()

    const prod = allProds.find(product => product.id == pid)
    const cart = carts.find(cart => cart.id === cid)

    if (prod && cart) {
      if (!cart.products[0]) {
        cart.products.push({product: prod.id, quantity: 1})
        await fs.promises.writeFile(path,JSON.stringify(carts));
        return
      }
    }
    if(cart.products[0].quantity){
      const prodQuantity = cart.products[0].quantity + 1
      cart.products[0].quantity = prodQuantity
      await fs.promises.writeFile(path,JSON.stringify(carts));
      return
    }



  }
}

module.exports = Carrito
/* const app = new Carrito()
app.addProductToCart('8bc7d28f-b943-4f51-a7f2-4f628f970787',3) */
/* app.getCartById('8bc7d28f-b943-4f51-a7f2-4f628f970787') */



















/*   writeData = async(data)=>{
    try{
      await fs.promises.writeFile (path, JSON.stringify(data, null, 2))
  }catch{
      console.log(error)
  }
  } */