import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
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

 
  const categorizedData = Object.entries(categories).map(([category, movieList]) => ({
    key: category,
    category,
    movies: films
      .filter(film => movieList.includes(film.title))
      .map(film => film.title)
      .join(", ")
  }));

  
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <strong style={{ color: "wheat" }}>{text}</strong>,
    },
    {
      title: "Movies",
      dataIndex: "movies",
      key: "movies",
      render: (text) => <span style={{ color: "wheat" }}>{text}</span>,
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Movie Categories</h2>
      <Table className={styles.table} dataSource={categorizedData} columns={columns} pagination={false} />
    </div>
  );
};

export default Categories;
