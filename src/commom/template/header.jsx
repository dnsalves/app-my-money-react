import React from 'react'
import NavBar from './navbar'

export default () => (
    <header className='main-header'>
        <a href='#' className='logo'>
            <span className="logo-mini"><b>My</b>M</span>
            <span className="logo-lg">
                <i className="fa fa-money"></i>
                <b> My</b> Money
            </span>
        </a>
        <nav className="navbar navbar-static-top">
            <a href="true" className="sidebar-toggle" data-toggle="offcanvas"></a>
            <NavBar />
        </nav>
    </header>
)