import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import "./Verify.css";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        if (!orderId) {
            console.error("Order ID is missing");
            setTimeout(() => {

                return navigate("/");
            }, 5000);
        }

        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                setTimeout(() => {
                    navigate("/myorders");
                }, 5000);

                try {
                    await axios.post(`${url}/api/order/mail`, { orderId });
                } catch (mailError) {
                    console.error("Error sending confirmation email:", mailError);
                }
            } else {
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            }
        } catch (error) {
            console.error("Verification failed:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Run only once

    return (
        <div className='verify'>
            <div className="lds-default">
                <div></div><div></div><div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
};

export default Verify;
