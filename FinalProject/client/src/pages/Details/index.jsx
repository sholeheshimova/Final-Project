import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../Details/index.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const BASE_URL = "http://localhost:8080/marvels";

const Details = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);

  const getFilmDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Insufficient permission! Please login..");
        return;
      }

      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFilm(response.data);
    } catch (error) {
      console.error("Xəta:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Məlumat çəkilmədi");
    }
  };

  useEffect(() => {
    getFilmDetails();
  }, [id]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!film) {
    return <p style={{ color: "white", textAlign: "center" }}>Məlumat yüklənir...</p>;
  }

  return (
    <Row className={styles.row1}>
      <div className={styles.common}>
        <Col className={styles.col1}>
          <img src={film.image} alt={film.name} />
        </Col>
        <Col className={styles.col2}>
          <p>{film.description}</p>
          <TableContainer style={{paddingTop: "2rem", backgroundColor: "#F3F4F6"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{color: "#A83232", fontSize: "20px"}}>Feature</TableCell>
                  <TableCell align="right" style={{color: "#A83232",fontSize: "20px"}}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" style={{color: "#A83232",fontSize: "20px"}}>
                    Name
                  </TableCell>
                  <TableCell align="right" style={{color: "#A83232",fontSize: "20px"}}>{film.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{color: "#A83232",fontSize: "20px"}}>
                    Date
                  </TableCell>
                  <TableCell align="right" style={{color: "#A83232",fontSize: "20px"}}>{film.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{color: "#A83232",fontSize: "20px"}}>
                    IMDb Rating
                  </TableCell>
                  <TableCell align="right" style={{color: "#A83232",fontSize: "20px"}}>{film.raiting}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
      </div>
    </Row>
  );
};

export default Details;
