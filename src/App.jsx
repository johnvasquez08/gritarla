import Header from './components/Header'
import Nike from  './components/Nike'
import { useState, useEffect } from 'react'
import { db } from './db/db'


function App() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)
    useEffect(()=> {
        localStorage.setItem('cart', JSON.stringify(cart))

    }, [cart])

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    function addToCart(item){
        const itemExist = cart.findIndex((nike) => nike.id === item.id)
        if(itemExist >= 0){
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else {
            item.quantity = 1
            setCart(cart=>[...cart, item])
            console.log('El producto no existe, agregando')
        }
        console.log(cart)
    }


    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(nike => nike.id !== id))
    }

    function addItem(id){
        const updateCart = cart.map((item) => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                item.quantity++
            }
            return item
        })
        setCart(updateCart)
    }
    function removeItem(id){
        const updateCart = cart.map((item) => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                item.quantity--
            }
            return item
        })
        setCart(updateCart)
    }
    function clearCart(){
        setCart([])
    }
    

  return (
    <>
    <Header
    clearCart={clearCart}
    addItem={addItem}
    removeItem={removeItem}
    removeFromCart={removeFromCart}
    setCart={setCart}
    cart={cart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((pen) => (
                <Nike
                key={pen.id}
                    nike={pen}
                    setCart={setCart}
                    addToCart={addToCart}
                />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">NikeLA - Todos los derechos Reservados</p>
        </div>
    </footer>
 
    </>
  )
}

export default App
