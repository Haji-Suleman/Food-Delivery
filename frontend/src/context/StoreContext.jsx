import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const [inputValue, setInputValue] = useState("");
    const url = "https://food-delivery-backend-topaz.vercel.app/";
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData()
    }, [])
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            // Make sure the item exists and has quantity > 0
            if (!prev[itemId] || prev[itemId] <= 0) {
                return prev; // Return unchanged if item doesn't exist or is already 0
            }

            const newQuantity = prev[itemId] - 1;

            // If quantity reaches 0, remove the item completely
            if (newQuantity === 0) {
                const updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            }

            return { ...prev, [itemId]: newQuantity };
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Failed to update cart:", error);
            }
        }
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);

                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data);
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);

    }
    const FoodPopup = async (itemId) => {
        console.log(cartItems[itemId])
        return cartItems[itemId]
    }
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        token,
        inputValue,
        setInputValue,
        FoodPopup
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;