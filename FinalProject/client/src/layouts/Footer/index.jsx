import React from "react";
import { Col, Row } from "antd";
import styles from "../Footer/index.module.scss";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[16, 16]}>
        
          <Col xs={24} sm={8} className={styles.left}>
            <h2>MarvelVerseHub</h2>
            <p>Get the latest information on Marvel movies.</p>
          </Col>

         
          <Col xs={24} sm={8} className={styles.center}>
            <h3>Transitions</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Movies</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
            </ul>
          </Col>

         
          <Col xs={24} sm={8} className={styles.right}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </Col>
        </Row>
        <hr />
        <p className={styles.copyright}>
          © {new Date().getFullYear()} MarvelVerseHub.All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
