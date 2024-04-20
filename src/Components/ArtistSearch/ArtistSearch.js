import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Styles from './ArtistSreach.module.css'
function ArtistSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (!accessToken) {
        window.location.href="/"
    }
  }, [accessToken]); 

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setSearchResults(response.data.artists.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
      if (error.response && error.response.status === 401) {
      }
    }
  };

  const ArtistLink = ({ artist }) => (
    <Link to={`/artistalbum/${artist.id}`} className={Styles.ArtistLink}>
      <div className={Styles.ArtistCard}>
       <img src={artist.images[0] ? artist.images[0].url : ''} alt={artist.name}  className={Styles.ArtistImage}/>
      <div className={Styles.ArtistDetails} >
        <h2 className={Styles.ArtistName}>{artist.name}</h2>
        <div className={Styles.ArtistFollowers}>{artist.followers.total}<div className={Styles.followers}> Followers </div></div>
        <div>
          {[...Array(Math.round(artist.popularity / 20))].map((star, index) => (
            <span key={index} className={Styles.popularityIcon}>★</span>
          ))}
        </div>
      </div>
      </div>
    </Link>
  );

  return (
    <div className={Styles.navbarArtistMain}>
      <div className={Styles.navbarArtist}>
      <div>
        <input
          type="text"
          placeholder="Search for an artist..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={Styles.searchBarInput}
        />
      </div>
    </div>
    

      <div className={Styles.MainCardArtist}>
        {searchResults.map(artist => (
          <ArtistLink key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default ArtistSearch;
