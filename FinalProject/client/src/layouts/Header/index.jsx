import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../Header/index.module.scss'

const Header = () => {
  return (
    <>
    <header>
      <div className={styles.header}>
       <div className={styles.logo}>
        <img src="https://c4.wallpaperflare.com/wallpaper/286/199/626/movie-marvel-studios-hd-wallpaper-preview.jpg" alt="" />
       </div>
       <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/categories"}>Categories</NavLink>
          </li>
          <li>
            <NavLink to={"/marvels/:id"}>Details</NavLink>
          </li>
          <li>
            <NavLink to={"/favorites"}>Favorites</NavLink>
          </li>
          <li>
            <NavLink to={"/accessories"}>Accessories</NavLink>
          </li>
        </ul>
       </nav>
      </div>
    </header>
    </>
  )
}

export default Header