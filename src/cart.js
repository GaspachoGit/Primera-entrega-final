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
    let carts = await this.getCarts()
    const allProds = await products.getProducts() //traigo los productos y los carritos desde el JSON

    const prod = allProds.find(product => product.id == pid) //traigo el producto especifico que si no existe me lleva a un undefined
    const quantity = 1 //cantidad de productos a sumar
    let founded = false // bandera utilizada para verificar si se encontró un carrito
    
    if (prod) { // si es que existe el producto empiezo a trabajar con ese id
      const prodId = prod.id
      
      carts.forEach(cart => {
        if (cart.id === cid) { //existe cart con dicho id? 
          let productoExistente = cart.products.find(p => p.id === prodId)
          if (productoExistente) { //si existe, a su quantity le sumo la variable quantity
            productoExistente.quantity += quantity
            founded = true //el carrito fue encontrado
          }else{// si no existe "pusheo" un objeto 
            cart.products.push({id: pid, quantity: 1})
            founded = true//el carrito fue encontrado
          }
        }//en este punto, podría haber retornado la linea 72, pero si lo hacía, el mensaje se iba a repetir hasta que se encuentre un carrito
      });
      if (!founded) { //me pareció buena idea usar el método de la bandera para no perder la costumbre jejeje
          return `cart with id ${cid} doesn't exist`
        }
      await fs.promises.writeFile(path,JSON.stringify(carts))
      return `product added successfully`

      }else{
        return `product with id ${pid} doesn't exist`
    }

  }


}

module.exports = Carrito


//Ejemplos
/* const app = new Carrito()
app.addProductToCart('8bc7d28f-b943-4f51-a7f2-4f628f970787',3) */
/* app.getCartById('8bc7d28f-b943-4f51-a7f2-4f628f970787') */
