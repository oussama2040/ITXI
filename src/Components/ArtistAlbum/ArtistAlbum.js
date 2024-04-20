import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Styles from './ArtistAlbum.module.css'
import { FaArrowLeft } from "react-icons/fa6";

function ArtistAlbum() {
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [nameArtist, setnameArtist] = useState([]);
  const { artistId } = useParams();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (!accessToken) {
      window.location.href="/";
    }
  }, [accessToken]);

  useEffect(() => {
    if (artistId) {
      fetchArtistAlbums();
    }
  }, [artistId]); 


  const fetchArtistAlbums = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setArtistAlbums(response.data.items);
      setnameArtist(response.data.items[0].artists[0].name) // name of artist
    } catch (error) {
      console.error("Error fetching artist's albums:", error);
      if (error.response && error.response.status === 401) {
      }
    }
  };
  function returntoFunction() {
    window.location.href = "/artistsearch";
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/"; 
  }
  return (
    <div className={Styles.backgroundSVG}>
      <h1 className={Styles.ArtistAlbumTopic} > 
      <FaArrowLeft className={'mr-3 '} onClick={returntoFunction} />Artist Albums of {nameArtist}
      <button className={Styles.logoutbtn} onClick={logout}>Logout</button>
      </h1>
      
      <div className={Styles.MainCardAlbum}>
      {artistAlbums.map(album => (  
        <div key={album.id} className={Styles.ArtistLinkAlbum} >
          <img src={album.images[0] ? album.images[0].url : ''} alt={album.name} className={Styles.ArtistImageAlbum} />
          <h2 className={Styles.AlbumName }>{album.name}</h2>
          <h3 className={Styles.AlbumNameArtist }>{nameArtist}</h3>
          <div className={Styles.dateAlbum}> {album.release_date}</div>
          <div className={Styles.dateAlbum}>{album.total_tracks}Tracks </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default ArtistAlbum;
