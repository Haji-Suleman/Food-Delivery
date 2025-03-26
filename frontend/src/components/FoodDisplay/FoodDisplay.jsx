import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from './FoodItem/Fooditem';
const FoodDisplay = ({ category }) => {
    const { food_list, inputValue } = useContext(StoreContext);
    const regex = new RegExp(inputValue, "i")
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {
                    food_list.map((item, index) => {
                        if (
                            (category === "All" && (inputValue === "" || regex.test(item.name))) ||
                            (category !== "All" && category === item.category && (inputValue === "" || regex.test(item.name)))
                        ) {

                            return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} />)
                        }
                        return null;
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay
