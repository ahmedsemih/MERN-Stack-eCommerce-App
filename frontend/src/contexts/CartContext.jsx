import { createContext, useState, useContext } from "react";
import { useCookies } from "react-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cookies]=useCookies(['cart'])
    const [cart, setCart] = useState( cookies.cart || []);
    const [refresh, setRefresh] = useState(false);
    
    const values = {
        cart,
        setCart,
        refresh,
        setRefresh
    }

    return <CartContext.Provider value={values} >{children}</CartContext.Provider>
};

export const useCartContext = () => useContext(CartContext);