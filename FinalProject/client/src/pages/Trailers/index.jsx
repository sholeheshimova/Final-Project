import React from 'react'
import { useParams } from 'react-router-dom'

const Trailers = () => {
    const {id} = useParams()

    const trailers = {
        "679e1f46682d1cbe67e633c4": "https://geo.dailymotion.com/player.html?video=x6zgoao",
        "679e226a75b68719cc373406": "https://geo.dailymotion.com/player.html?video=x30low",
        "679e22a475b68719cc373408": "https://geo.dailymotion.com/player.html?video=x89dfmn",
        "679e234a75b68719cc37340a": "hhttps://geo.dailymotion.com/player.html?video=x73h4ox",
        "679e23d775b68719cc37340c": "https://geo.dailymotion.com/player.html?video=x79e0eu",
        "679e249e75b68719cc37340e": "https://geo.dailymotion.com/player.html?video=x18ulca",
        "679e250f75b68719cc373410": "https://geo.dailymotion.com/player.html?video=x3qxbhv",
        "679e258275b68719cc373412": "https://geo.dailymotion.com/player.html?video=x23ie4m",
        "679e25f975b68719cc373414": "https://geo.dailymotion.com/player.html?video=x3x0sag",
        "679e265d75b68719cc373416": "https://geo.dailymotion.com/player.html?video=x8x2oia",
        "679e274475b68719cc373418": "https://geo.dailymotion.com/player.html?video=x1t5y6m",
        "679e278c75b68719cc37341a": "https://geo.dailymotion.com/player.html?video=x2a4won",
        "679e27c875b68719cc37341c": "https://geo.dailymotion.com/player.html?video=x2k5mqv",
        "679e285575b68719cc37341f": "https://geo.dailymotion.com/player.html?video=x7lga8f",
        "679e28a275b68719cc373421": "https://geo.dailymotion.com/player.html?video=x56htxb",
        "679e28e075b68719cc373423": "https://geo.dailymotion.com/player.html?video=x5q0fy4",
        "679e295575b68719cc373426": "https://geo.dailymotion.com/player.html?video=x8i7l7b",
        "679e299c75b68719cc373428": "https://geo.dailymotion.com/player.html?video=x7lgav9",
        "679e29d575b68719cc37342a": "https://geo.dailymotion.com/player.html?video=x77sd9p",
        "679e2a3775b68719cc37342c": "https://geo.dailymotion.com/player.html?video=x83opdb",
        "679e2a7775b68719cc37342e": "https://geo.dailymotion.com/player.html?video=x8amsok",
        "679e2aaa75b68719cc373430": "https://geo.dailymotion.com/player.html?video=x8bsx02",
        "679e2ae775b68719cc373432": "https://geo.dailymotion.com/player.html?video=x8cnrth",
        "679e2b2775b68719cc373434": "https://geo.dailymotion.com/player.html?video=x87rbjl",
        "679e2f12e335cb741b464675": "https://geo.dailymotion.com/player.html?video=x8x3t5e",
    }
   
    const videoLink = trailers[id]
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" , backgroundColor: "maroon"}}>
      {videoLink ? (
        <iframe
          width="640"
          height="360"
          src={`https://www.dailymotion.com/embed/video/${videoLink}`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      ) : (
        <h3>Bu film üçün trailer tapılmadı.</h3>
      )}
    </div>
    </>
  )
}

export default Trailers