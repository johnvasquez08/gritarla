
export type Nike = {
    id: number
    name: string
    image: string
    description: string
    price: number
    
}

export type CartItem = Pick<Nike, 'id' | 'name' | 'price' | 'image' > & {
    
    quantity: number
}

