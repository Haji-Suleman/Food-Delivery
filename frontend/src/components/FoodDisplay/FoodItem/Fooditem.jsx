import React, { useContext } from 'react'
import "./Fooditem.css"
import { assets } from "../../../assets/frontend_assets/assets.js"
import { StoreContext } from '../../../context/StoreContext.jsx';
const Fooditem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart, url, FoodPopup } = useContext(StoreContext)
  return (
    <div className='food-item' >
      < div className="food-item-img-container" >
        <img className='food-item-image' src={url + "/images/" + image} alt="" loading="lazy" onClick={() => { FoodPopup(id) }} />
        {!cartItems[id] ?
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" /> :
          <div className='food-item-counter'>
            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" /> <p>{cartItems[id]}</p>  <img src={assets.add_icon_green} alt="" onClick={() => addToCart(id)} />
          </div>

        }
      </div >
      <div className="food-item-info" onClick={() => { FoodPopup(id) }} >
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p>{category}</p>
        <p className="food-item-price">${price}</p>
      </div>

    </div >
  )
}


export default Fooditem
