import Header from './components/Header'
import Guitar from  './components/Guitar'
import { useState, useEffect } from 'react'
import { db } from './db/db'


function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item){
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
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


  return (
    <>
    <Header
    
    cart={cart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((pen) => (
                <Guitar
                key={pen.id}
                    guitar={pen}
                    setCart={setCart}
                    addToCart={addToCart}
                />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
 
    </>
  )
}

export default App
