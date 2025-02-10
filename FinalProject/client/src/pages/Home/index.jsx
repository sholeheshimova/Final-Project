import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Card } from "antd";
import styles from "../Home/index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiVideoLine } from "react-icons/ri";
import { FavoritesContext } from "../../context/FavoritesContext";
import BackgroundMusic from '../../components/BackgorundMusic'
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
        setError("Yetərsiz icazə! Zəhmət olmasa giriş edin.");
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
      setError(error.response?.data?.message || "Məlumat çəkilmədi");
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
      placeholder="Filmi axtar..."
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
                <Card
                  hoverable
                  className={styles.card}
                  cover={<img alt="example" src={f.image} />}
                >
                  <div style={{ padding: "10px" }}>
                    <h3
                      style={{
                        color: "wheat",
                        fontSize: "1.2rem",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {f.title}
                    </h3>
                    <h4
                      style={{
                        color: "wheat",
                        fontSize: "1rem",
                        margin: "10px 0 0 0",
                      }}
                    >
                      Exp: {f.date}
                    </h4>
                    <p
                      style={{
                        color: "wheat",
                        fontSize: "1rem",
                        margin: "5px 0 0 0",
                      }}
                    >
                      Rating: {f.raiting}
                    </p>
                  </div>
                  <div className={styles.btns}>
                  <Link to={`/marvels/${f._id}`}><CgDetailsMore style={{fontSize: "30px", color: "wheat"}} /></Link>
                  <FaRegHeart style={{fontSize: "25px", color: "wheat"}} onClick={() => {toggleFavorites(f)}}/>
                  <Link to={`/marvels/trailers/${f._id}`}><RiVideoLine  style={{color: "wheat",  fontSize: "28px"}}/></Link>
                  </div>
                  <div className={styles.video}>
                 
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
