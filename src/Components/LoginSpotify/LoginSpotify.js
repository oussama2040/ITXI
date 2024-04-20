import React from 'react';
import Styles from './Login.module.css';
import spotifyLogo from '../../Assets/spotifyLogo.png'
import soptifyTelephone from '../../Assets/spotifyTelephone.webp'
function Login() {
  const CLIENT_ID = "80c639e98fda4e5390c6ca6b5d67ccfc";
  const REDIRECT_URL = "http://localhost:3000/callback";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPOND_TYPE = "code";

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPOND_TYPE}`;
  };

  return (
    <div className={Styles.backgroundStyle}>
      <div className={Styles.LoginWithSpotify}>
      <div className={Styles.loginspotifyTopic}>Login with Spotify</div>
      <img src={spotifyLogo} className={Styles.SpotifyLogo} onClick={handleLogin} ></img>
      </div>

      <div className={Styles.soptifyTelephoneMain}>
      <img src={soptifyTelephone} ></img>
      <h2>Enjoy</h2>
      <h3>Our</h3>
      <h4>Music</h4>
      </div>
    </div>
  );
}

export default Login;
