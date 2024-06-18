import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import more from '../../assets/more.png'
import upload from '../../assets/upload.png'
import notification from '../../assets/notification.png'
import user_profile from '../../assets/user_profile.jpg'
import { Link } from 'react-router-dom'
const Navbar = ({setSideBar}) => {
  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu-icon' src={menu_icon} alt="" onClick={()=>setSideBar(pre=>!pre)} />
       <Link to='/'> <img className='logo' src={logo} alt="" /></Link> 
      </div>

      {/* <div className='nav-middle flex-div'>
        <div className="search-box flex-div">
        <input type="text" placeholder='Search' />
        <img src={search} alt="" />
        </div>   
      </div> */}

      <div className='nav-right flex-div'>
        <img src={upload} alt="" />
        <img src={more} alt="" />
        <img src={notification} alt="" />
        <img className='user-icon' src={user_profile} alt="" title='balachandar' />
      </div>
    </nav>
  )
}

export default Navbar