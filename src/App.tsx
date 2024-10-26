import Header from './components/Header.js'
import Nike from  './components/Nike.js'
import { useCart } from './hooks/useCart.ts'


function App() {

    const { data,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        addItem,
        removeItem,
        clearCart,
        isEmpty,
        carTotal } = useCart()
    
    

  return (
    <>
    <Header
    clearCart={clearCart}
    addItem={addItem}
    removeItem={removeItem}
    removeFromCart={removeFromCart}
    cart={cart}
    isEmpty={isEmpty}
    carTotal={carTotal}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((pen) => (
                <Nike
                key={pen.id}
                    nike={pen}
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