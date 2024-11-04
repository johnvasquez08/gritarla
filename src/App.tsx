import Header from './components/Header.js'
import Nike from  './components/Nike.js'
import { useEffect, useReducer } from 'react'
import { cartReducer, initialState } from './reducers/cart-reducer.ts'

function App() {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])
    
  return (
    <>
    <Header
    dispatch={dispatch}
    cart={state.cart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {state.data.map((pen) => (
                <Nike
                key={pen.id}
                    nike={pen}
                    dispatch={dispatch}
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
