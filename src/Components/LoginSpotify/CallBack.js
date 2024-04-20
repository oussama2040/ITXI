import React, { useEffect } from 'react';
import axios from 'axios';
function CallBack() {

  useEffect(() => {
    const CLIENT_ID = "80c639e98fda4e5390c6ca6b5d67ccfc";
    const CLIENT_SECRET = "4272649fd0264193a6bb7015f07db00c"; 
    const REDIRECT_URI = "http://localhost:3000/callback";
    const CODE = new URLSearchParams(window.location.search).get("code"); // get the code from url

    if (CODE) {
      const requestData = new URLSearchParams();
      requestData.append('grant_type', 'authorization_code');
      requestData.append('code', CODE);
      requestData.append('redirect_uri', REDIRECT_URI);
      requestData.append('client_id', CLIENT_ID);
      requestData.append('client_secret', CLIENT_SECRET);
      
      axios.post('https://accounts.spotify.com/api/token', requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        const accessToken = response.data.access_token;

        console.log("Access token:", accessToken);

        localStorage.setItem('accessToken', accessToken);
        
        window.location.href="/artistsearch"
      }).catch(error => {
        console.error("Error exchanging code for token:", error);
      });
    } else {
      console.error("Authorization code not found in URL.");
    }
  }, []);

  return (
    <div>
    </div>
  );
}

export default CallBack;
