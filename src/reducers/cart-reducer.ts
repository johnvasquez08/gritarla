import { db } from "../db/db";
import { CartItem, Nike } from "../types";

export type CartActions =
    { type: "addtoCart"; payload: {item : Nike}}
  | { type: "removefroncart"; payload:  {id : Nike['id']}}
  | { type: "removeItem" , payload:  {id : Nike['id']}}
  | { type: "addItem" , payload:  {id : Nike['id']}} |
    { type: "clearCart" }


    export type CartState = {
        data : Nike[]
        cart : CartItem[]
    
    }
    const cartFromLocalStorage : CartItem[] = (() => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    })()

    export const initialState : CartState = {
        data : db,
        cart : cartFromLocalStorage
    }
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1
    export const cartReducer = (state : CartState, action : CartActions) => {
        
        if(action.type === "addtoCart"){
        let updateCart : CartItem[] = []
        const itemExist = state.cart.find((nike) => nike.id === action.payload.item.id)
        if(itemExist){
            updateCart = state.cart.map((item) => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return {...item, quantity: item.quantity + 1}

                    } else {
                        return item
                    }
                }
                else {
                    return item
                }
                
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updateCart = [...state.cart, newItem]
        }
        return {
            ...state,
            cart : updateCart
        }
        }
        if(action.type === "removefroncart"){
            return {
                ...state,
                cart : state.cart.filter((nike) => nike.id !== action.payload.id)
            }
        }
        if(action.type === "removeItem"){
            const updateCart = state.cart.map((item) => {
                if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            })
            return {
                ...state,
                cart : updateCart
            }
        }
        if(action.type === "addItem"){
            const cart = state.cart.map((item) => {
                if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
            return {
                ...state,
                cart 
            }
        }
        if(action.type === "clearCart"){
            return {
                ...state,
                cart : []
            }
        }
        return state
    }