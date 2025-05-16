import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>For Better Experience Download <br />Tomato App</p>
            <div className="app-download-platform">
                <img loading="lazy" src={assets.play_store} alt="" />
                <img loading="lazy" src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
