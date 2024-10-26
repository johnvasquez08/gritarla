import { useState, useEffect, useMemo } from 'react'
import { db } from '../db/db'


export function useCart(){
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
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const carTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        addItem,
        removeItem,
        clearCart,
        isEmpty,
        carTotal
    }
}

