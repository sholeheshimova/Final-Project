import React, { useState } from "react";
import styles from "../Premium/index.module.scss";
import { Link } from "react-router-dom";

const premiumMovies = [
  {
    id: 1,
    title: "Wanda Vision",
    description:
      "It follows Wanda Maximoff and Vision as they live an idyllic suburban life in the town of Westview, New Jersey, until their reality starts moving through different decades of sitcom homages and television tropes.",
    image: "https://cdn.marvel.com/content/2x/wandavision_lob_crd_06.jpg",
    trailerUrl: "https://geo.dailymotion.com/player.html?video=x7whth8",
  },
  {
    id: 2,
    title: "Hawkey",
    description:
      "Clinton Francis Clint Barton is an extremely skilled marksman, a former special agent of S.H.I.E.L.D. and one of the founding members of the Avengers.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwMRruKGuinZklU5J_e55ZGmcYUVO_X2M7A&s",
    trailerUrl: "https://geo.dailymotion.com/player.html?video=x85lsc6",
  },
  {
    id: 3,
    title: "What If ...?",
    description:
      "What If...? is an animated American web television series based on the Marvel Comics series of the same name. It is the sixteenth television series.",
    image: "https://cdn.marvel.com/content/2x/whatif_lob_crd_01.jpg",
    trailerUrl: "https://geo.dailymotion.com/player.html?video=x8ywic4",
  },
  {
    id: 4,
    title: "Echo",
    description:
      "In the comics, Echo was a member of the Cheyenne Nation with photographic reflexes and an expert in piano.",
    image:
      "https://m.media-amazon.com/images/M/MV5BOGFiYzI1ZDctM2U1Zi00ZWI5LWFiMmQtNGU0NTU5MTg3OWM3XkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://geo.dailymotion.com/player.html?video=x8pjabk",
  },
  {
    id: 5,
    title: "Secret Invasion",
    description:
      "Secret Invasion premiered on June 21, 2023, and ran for six episodes until July 26. It is the first series in Phase Five of the MCU.",
    image:
      "https://m.media-amazon.com/images/M/MV5BNmYzYzA2NzMtOTVmMC00ZDY4LThlMDctZmUyN2NlMjQ2ODViXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://geo.dailymotion.com/player.html?video=x8lyac5",
  },
  {
    id: 6,
    title: "X-Man",
    description:
      "X-Men is an upcoming superhero film, based on the Marvel Comics team of the same name.",
    image: "https://i.redd.it/2og2885dnl5c1.jpg",
    trailerUrl: "https://geo.dailymotion.com/player.html?video=x8x2wbo",
  },
];

const PremiumFilm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const correctPassword = "MARVELVIP";

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsLoggedIn(true);
      setSelectedTrailer(null);
    } else {
      alert("Password is not correct!");
    }
  };

  const handleTrailerClick = (trailerUrl) => {
    if (isLoggedIn) {
      setSelectedTrailer(trailerUrl);
    } else {
      alert("Enter the password to watch the trailer.");
    }
  };

  return (
    <>
      <div className={styles.premiumContainer}>
        <h1 className={styles.title}>Premium Marvel Films</h1>
        <div className={styles.movieGrid}>
          {premiumMovies.map((movie) => (
            <div key={movie.id} className={styles.card}>
              <img src={movie.image} alt={movie.title} />
              <div className={styles.overlay}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <span className={styles.premiumLogo}>VIP</span>
                <button onClick={() => handleTrailerClick(movie.trailerUrl)}>
                  Watch Trailer
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isLoggedIn && (
          <div className={styles.loginBox}>
            <p>Enter your password for watch trailer</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleLogin}>Sign in</button>
          </div>
        )}
      </div>

      {selectedTrailer && (
        <div className={styles.trailerModal}>
          <iframe
            width="560"
            height="315"
            src={selectedTrailer}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={() => setSelectedTrailer(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default PremiumFilm;
