import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "antd";
import styles from "../Catogoires/index.module.scss";

const BASE_URL = "http://localhost:8080/marvels"; 

const Categories = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const getAllFilms = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Insufficient permission! Please login.");
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
      }
    };

    getAllFilms();
  }, []);

  const categories = {
    "Iron Man": ["Iron Man", "Iron Man 2", "Iron Man 3"],
    "Thor": ["Thor", "Thor: The Dark World", "Thor: Ragnarok", "Thor: Love and Thunder"],
    "Captain America": ["Captain America: The First Avenger", "Captain America: The Winter Soldier", "Captain America: Civil War"],
    "Avengers": ["The Avengers", "Avengers: Age of Ultron", "Avengers: Infinity War", "Avengers: Endgame"],
    "Spider-Man": ["Spider-Man: Homecoming", "Spider-Man: Far From Home", "Spider-Man: No Way Home"],
    "Doctor Strange": ["Doctor Strange", "Doctor Strange in the Multiverse of Madness"],
    "Black Panther": ["Black Panther", "Black Panther: Wakanda Forever"],
    "Guardians of the Galaxy": ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 3"],
    "Loki": ["Loki"]
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Movie Categories</h2>
      {Object.entries(categories).map(([category, movieList]) => {
        const categoryMovies = films.filter(film => movieList.includes(film.title));

        return (
          <div key={category} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <Row gutter={[16, 16]}>
              {categoryMovies.length > 0 ? (
                categoryMovies.map((film) => (
                  <Col key={film._id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      hoverable
                      cover={<img alt={film.title} src={film.image} className={styles.cardImage} />}
                      className={styles.card}
                    >
                      <Card.Meta title={film.title} description={`Release Date: ${film.date}`} />
                    </Card>
                  </Col>
                ))
              ) : (
                <p className={styles.noMovies}>No movies available</p>
              )}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;

