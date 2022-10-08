import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Header.css'
const Header = () => {
    const [activeTab, setActiveTab] = useState("HomePage");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab('HomePage');
        } else if (location.pathname == '/add') {
            setActiveTab("newTab");
        }
    }, [location])


    return (
        <div className='header'>
            <div className='header-left'>
                <p className='logo'>Flight-App</p>
                <Link to='/'>
                    <p className={`${activeTab === "HomePage" ? "active" : ""}`} onClick={() => setActiveTab("HomePage")}>List</p>
                </Link>
                {/* <Link to='/admin/add'>
                    <p className={`${activeTab === "newTab" ? "active" : ""}`} onClick={() => setActiveTab("newTab")}>New</p>
                </Link> */}
            </div>
        </div>
    )
}

export default Header
