import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import styles from "../Header/index.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className={styles.header}>
   
        <IoMenu className={styles.menuIcon} onClick={toggleMenu} />

        <div className={styles.logo}>
          <img
            src="https://c4.wallpaperflare.com/wallpaper/286/199/626/movie-marvel-studios-hd-wallpaper-preview.jpg"
            alt="Marvel Logo"
          />
        </div>

        
        <nav className={`${styles.sidebar} ${menuOpen ? styles.showSidebar : ""}`}>
         
          <IoCloseSharp className={styles.closeIcon} onClick={toggleMenu} />
          <ul>
            <li>
              <NavLink to={"/"} onClick={toggleMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/categories"} onClick={toggleMenu}>Categories</NavLink>
            </li>
            <li>
              <NavLink to={"/favorites"} onClick={toggleMenu}>Favorites</NavLink>
            </li>
            <li>
              <NavLink to={"/premium"} onClick={toggleMenu}>Premium</NavLink>
            </li>
            <li>
              <NavLink to={"/login"} onClick={toggleMenu}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/register"} onClick={toggleMenu}>Log out!</NavLink>
            </li>
          </ul>
        </nav>

        
        <nav>
          <ul className={styles.desktopMenu}>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/categories"}>Categories</NavLink>
            </li>
           
            <li>
              <NavLink to={"/favorites"}>Favorites</NavLink>
            </li>
            <li>
              <NavLink to={"/premium"}>Premium</NavLink>
            </li>
            {/* <li>
              <NavLink to={"/marvels/trailers/:id"}>Trailers</NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

