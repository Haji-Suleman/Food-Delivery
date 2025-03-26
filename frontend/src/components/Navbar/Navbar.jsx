import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({ setShowLogin }) => {
    let [menu, setMenu] = useState("home");
    const { cartItems, token, setToken, inputValue, setInputValue } = useContext(StoreContext);
    let [search, setSearch] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
    return (
        <div className='navbar'>
            <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link>
            {search ? <input type="search" value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='search-items' placeholder='Search...' autoFocus /> :
                <div className="menu-div-container">
                    <ul className="navbar-menu">
                        <Link to="/" className={menu === "home" ? "active" : ''} onClick={() => setMenu("home")}>home</Link>
                        <a href='#explore-menu' className={menu === "menu" ? "active" : ''} onClick={() => setMenu("menu")}>menu</a>
                        <a href='#app-download' className={menu === "mobile-app" ? "active" : ''} onClick={() => setMenu("mobile-app")}>mobile-app</a>
                        <a href='#footer' className={menu === "contact-us" ? "active" : ''} onClick={() => setMenu("contact-us")}>contact us</a>
                    </ul>
                </div>
            }
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" onClick={() => { setSearch(search ? false : true) }} />
                <div className='navbar-search-icon'>
                    <Link to="cart"><img src={assets.basket_icon} alt="" /></Link>
                    <div className={Object.keys(cartItems).length === 0 ? "dynamic" : "dot"}>{Object.keys(cartItems).length}</div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>

                }
            </div>
        </div>
    )
}

export default Navbar
