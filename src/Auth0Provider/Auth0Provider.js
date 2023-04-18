import React from "react"
import { useNavigate } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"



const Auth0ProviderWithHistory = ({ children }) => {

  const domain = process.env.REACT_APP_GAMING_PALACE_DOMAIN
  const clientId = process.env.REACT_APP_GAMING_PALACE_CLIENT_ID
  
  const history = useNavigate();

  const onRedirectCallback = appState => {
    history.push(
      appState
        ? appState.targetUrl
        : window.location.href = "/"
    );
  };


  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin
      }
      }
    >
      {children}

    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
