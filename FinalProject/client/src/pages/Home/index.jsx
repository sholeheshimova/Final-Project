import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Card } from "antd";
import styles from "../Home/index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
// import { CgDetailsMore } from "react-icons/cg";
// import { FaRegHeart } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { RiVideoLine } from "react-icons/ri";
import { FavoritesContext } from "../../context/FavoritesContext";
import BackgroundMusic from '../../components/BackgorundMusic'
import CustomCard from "./customCard";
const { Search } = Input;


const BASE_URL = "http://localhost:8080/marvels";

const Home = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")

  const {film, toggleFavorites} = useContext(FavoritesContext)

  const getAllFilms = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Insufficient permission! Please login.");
        return;
      }

      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFilms(response.data);
    } catch (error) {
      console.error("Xəta:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Information was not taken");
    }
  };


  const filteredFilms = films.filter((f) => f.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))

  

  useEffect(() => {
    getAllFilms();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <BackgroundMusic />
        {error && <h3 className={styles.errorMessage}>{error}</h3>}
        <section className={styles.blurredBackground}>
          <div className={styles.content}></div>
        </section>

        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
    <Search
      placeholder="Search Film..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      enterButton={<SearchOutlined />}
      size="large"
      style={{
        maxWidth: "500px",
        borderRadius: "8px",
        background: "#333",
        color: "white",
      }}
    />
  </div>

        <Row className={styles.row}>
          {films.length > 0 &&
            filteredFilms.map((f) => (
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

export default Home;
