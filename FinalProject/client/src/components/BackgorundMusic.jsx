import React, { useRef, useState, useEffect } from "react";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import musicFile from "../assets/music.mp3"; // Musiqi faylını əlavə et

const BackgroundMusic = () => {
  const audioRef = useRef(new Audio(musicFile));
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioRef.current.play().catch((err) => console.log("Autoplay bloklandı:", err));
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "24px",
        color: "white",
      }}
    >
      {isPlaying ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
    </button>
  );
};

export default BackgroundMusic;

