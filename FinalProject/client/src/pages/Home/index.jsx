import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Card } from "antd";
import styles from '../Home/index.module.scss'

const { Meta } = Card;

const BASE_URL = "http://localhost:8080/marvels";
const Home = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getAllFilms();
  }, []);

  console.log("Films", films);


  return (
    <>
      <div className={styles.container}>
  {error && <h3 className={styles.error-message}>{error}</h3>}
  <Row className={styles.row}>
    {films.length &&
      films.map((f) => (
        <Col span={6} key={f._id} className={styles.col}>
          <Card
            hoverable
            className={styles.card}
            cover={
              <img
                alt="example"
                src={f.image}
              />
            }
          >
           <div style={{ padding: "10px" }}>
              <h3 style={{ color: "wheat", fontSize: "1.2rem", margin: "0 0 10px 0" }}>
                {f.title}
              </h3>
              <p style={{ color: "lightgray", fontSize: "0.9rem", margin: "0 0 10px 0" }}>
                {f.description.slice(0, 50)}
              </p>
              <h4 style={{ color: "wheat", fontSize: "1rem", margin: "10px 0 0 0" }}>
                Exp: {f.date}
              </h4>
              <p style={{ color: "wheat", fontSize: "1rem", margin: "5px 0 0 0" }}>
               Rating: {f.raiting}
              </p>
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
