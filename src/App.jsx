import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
   
  
   const initialCart= () => {
    const localStorageCart= localStorage.getItem('cart')
      return localStorageCart ? JSON.parse(localStorageCart) : []
   }

   const [data]= useState(db)
   const [cart, setCart]= useState(initialCart)
   
   
   // Creamos una variable para el maximo y minimo de una misma guitarra en el carro
   const MAX_ITEMS= 5
   const MIN_ITEMS= 1

   useEffect(() => {
     localStorage.setItem('cart', JSON.stringify(cart))
   }, [cart])
   
   function addToCart(item){
      
    const itemExists= cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){ // el elemento existe ya en el carrito
      // creo una constante del carro actualizado para no cambiar el state
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart= [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity= 1
      setCart( [...cart, item])
      }
      
     }
    
    function removeFromCart(id){
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
      const updatedAddCart= cart.map(item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
          return {
            ...item,
            quantity: item.quantity + 1
          }
      }
      return item
    })
     setCart(updatedAddCart)
    }

    function decreaseQuantity(id){
       const updatedSubtractCart= cart.map(item => {
        if(item.id === id && item.quantity > MIN_ITEMS ){
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item
       })
       setCart(updatedSubtractCart)
    }

    function clearCart(){
      setCart([])
    }

   
  return (
    <>
      <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => {
             
             return(
               
                 <Guitar 
                 key={guitar.id} 
                 guitar={guitar}
                 setCart={setCart}
                 addToCart={addToCart} />
             )
            })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0 ">
            Guitar Shop - Todos los derechos Reservados - 2024
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
