import React, { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { CgDetailsMore } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { RiVideoLine } from "react-icons/ri";
import styles from '../Favorites/index.module.scss'


const BASE_URL = "http://localhost:8080/marvels";
const Favorites = () => {
  const {film, toggleFavorites} = useContext(FavoritesContext)
  return (
    <>
    <div className={styles.container}>
    <Row className={styles.row}>
          {film.length > 0 &&
            film.map((f) => (
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
                  <RiVideoLine  style={{color: "wheat",  fontSize: "28px"}}/>
                  </div>
                  <div className={styles.video}>
                 
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
    </div>
    </>
  )
}

export default Favorites