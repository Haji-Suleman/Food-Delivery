import React, { useContext, useEffect, useState, useRef } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    const usingRef = useRef();
    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id]) {
                let itemInfo = item;
                itemInfo.quantity = cartItems[item._id]
                orderItems.push(itemInfo);
            }
        });

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        };
        const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            window.location.replace(response.data.session_url);
        }
        else {
            console.log("Order placement failed:");
            toast.error("Order Failed Error Ocurred")
        }
        usingRef.current.disabled = true;
        usingRef.current.opacity = "0.5";
        
    };
    useEffect(() => {
        if (!token) {
            navigate("/cart")
        }
        if (getTotalCartAmount() === 0) {
            navigate("/cart")
        }
    }, [token])
    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
                </div>
                <input required type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Email address' />
                <input required type="text" name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />
                <div className="multi-fields">
                    <input required type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='City' />
                    <input required type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required type="text" name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zip Code' />
                    <input required type="text" name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' />
                </div>
                <input required type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit' ref={usingRef}>PROCEED TO PAYMENT</button>
                </div>
            </div >
        </form >
    );
};

export default PlaceOrder;
