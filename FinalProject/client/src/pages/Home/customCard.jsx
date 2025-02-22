import React from 'react'
import { Link } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiVideoLine } from "react-icons/ri";
import { motion } from "framer-motion";
import styles from "./CustomCard.module.scss";

const CustomCard = ({ film, isFavorite, toggleFavorites }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 215, 0, 0.5)" }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageWrapper}>
        <img src={film.image} alt={film.title} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{film.title}</h3>
        <p className={styles.info}>Exp: {film.date}</p>
        <p className={styles.info}>Rating: {film.raiting}</p>
      </div>
      <div className={styles.actions}>
        <Link to={`/marvels/${film._id}`}>
          <CgDetailsMore className={styles.icon} />
        </Link>
        <button
          className={styles.favoriteBtn}
          onClick={() => toggleFavorites(film)}
        >
          {isFavorite ? <FaHeart className={styles.favIcon} /> : <FaRegHeart className={styles.favIcon} />}
        </button>
        <Link to={`/marvels/trailers/${film._id}`}>
          <RiVideoLine className={styles.icon} />
        </Link>
      </div>
    </motion.div>
  )
}

export default CustomCard