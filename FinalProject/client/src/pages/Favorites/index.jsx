import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiVideoLine } from "react-icons/ri";
import styles from "../Favorites/index.module.scss";
import CustomCard from "../Home/customCard";

const BASE_URL = "http://localhost:8080/marvels";
const Favorites = () => {
  const { film, toggleFavorites } = useContext(FavoritesContext);
  return (
    <>
      <div className={styles.container}>
        <Row className={styles.row}>
          {film.length > 0 &&
            film.map((f) => (
              <Col span={6} key={f._id} className={styles.col}>
                <CustomCard
          film={f}
          isFavorite={film.find((q) => q._id === f._id)}
          toggleFavorites={toggleFavorites}
        />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default Favorites;
