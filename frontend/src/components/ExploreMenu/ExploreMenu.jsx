import React, { useEffect, useState } from 'react'
import "./ExploreMenu.css"
import { menu_list } from "../../assets/frontend_assets/assets"
const ExploreMenu = ({ setCategory, category }) => {
    const [hoverCategory, setHoverCategory] = useState(0)
    useEffect(() => {
        console.log(hoverCategory)
    }, [hoverCategory])
    return (
        <div className='explore-menu' id="explore-menu">
            <h1>Explore Our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, idx) => {
                        return (
                            <div onClick={() => {
                                setHoverCategory(idx);
                                setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
                            }} key={idx} class={(hoverCategory === idx && category !== "All") ? "active-category" : ""} id='explore-menu-list-item'>
                                <img src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div >
    )
}

export default ExploreMenu
