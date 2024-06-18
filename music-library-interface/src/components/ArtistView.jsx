import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ArtistView() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState([]);

  // useEffect(() => {
  //   const API_URL = `http://localhost:4000/album/${id}`;
  //   const fetchData = async () => {
  //     const response = await fetch(API_URL);
  //     const resData = await response.json();
  //     console.log(resData);
  //     return setArtistData(resData.results);
  //   };
  //   fetchData();
  // });

  return <h1>ArtistID: {id}</h1>;
}

export default ArtistView;
