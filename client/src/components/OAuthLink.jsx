import React, { useEffect, useState } from 'react';

import { LinkButton } from './';
import { useGenerateLinkConfig } from '../hooks';

// Component rendered when user is redirected back to site from Oauth institution site.  It initiates link immediately with
// configs that are generated with the original link token, userId and itemId that were set in local storage from the initial link initialization.
const OAuthLink = () => {
  const [config, setConfig] = useState({});
  let { userId, itemId, token } = JSON.parse(
    localStorage.getItem('oauthConfig')
  );

  const linkConfig = useGenerateLinkConfig(true, userId, itemId, token);

  useEffect(() => {
    setConfig(linkConfig);
  }, [linkConfig, userId, itemId, token]);

  return (
    <>
      {config.onSuccess != null && (
        <LinkButton
          isOauth // this will initiate link immediately
          userId={userId}
          itemId={itemId}
          config={config}
        ></LinkButton>
      )}
    </>
  );
};

export default OAuthLink;