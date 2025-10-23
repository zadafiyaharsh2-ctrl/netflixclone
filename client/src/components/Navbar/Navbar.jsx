import React, { useState, useRef, useEffect } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import search_icon from "../../assets/search_icon.svg"
import bell_icon from "../../assets/bell_icon.svg"
import profile_img from "../../assets/profile_img.png" 
import caret_icon from "../../assets/caret_icon.svg"
import { logout } from '../../firebase' // Adjust path according to your structure
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await logout()
      console.log("User signed out successfully")
      navigate('/login') // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className='icons'/>
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className='icons'/>
        <div className="navbar-profile" ref={dropdownRef}>
          <img src={profile_img} alt="Profile" className='profile'/>
          <img 
            src={caret_icon} 
            alt="Menu" 
            className={`caret ${showDropdown ? 'rotate' : ''}`}
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown">
              <p onClick={handleSignOut}>Sign out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar