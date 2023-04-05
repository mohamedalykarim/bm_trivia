import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Pages/Home'
import SoloGameStart from './components/Pages/SoloGameStart'
import PeerGameStart from './components/Pages/PeerGameStart'

import { AuthenticatedTemplate, UnauthenticatedTemplate  } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

import  {  LoginToMicrosoft } from './components/authentication/LoginToMicrosoft'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SoloGameQuiz from './components/Pages/SoloGameQuiz';
import { useState } from 'react';
import {connect} from 'react-redux'

function App(props) {

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)

  const publicClientApplication = new PublicClientApplication(msalConfig);
  const account = publicClientApplication.getAllAccounts()[0];
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
  };
  
  // Use the same publicClientApplication instance provided to MsalProvider
  publicClientApplication
    .acquireTokenSilent(accessTokenRequest)
    .then(function (accessTokenResponse) {
      // Acquire token silent success
      const accessToken = accessTokenResponse.accessToken;
      
        fetch(`/_api/Web/currentUser`, {  
          method: "GET",
          headers: {             
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
          },        
          accept: 'application/json;odata=verbose',
        })
        .then((response) => response.json())
  
        .then((results)=>{
          setName(results.d.Title)
          setEmail(results.d.Email)
        })
        .catch(console.log);
    })
    .catch(function (error) {
      //Acquire token silent failure
      console.log(error);
    });

  return (
        <Router>
          <div className="App" >


            <div className='App-header'>
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      >
                        <MenuIcon />
                      </IconButton>
                    
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BM Quiz Trivia
                      </Typography>

                      <AuthenticatedTemplate >
                          <LoginToMicrosoft />
                      </AuthenticatedTemplate>        
                    </Toolbar>
                 </AppBar>

                 <Routes>
                  <Route exact path='/' element={< Home />}></Route>
                  <Route exact path='/Solo-Start' element={< SoloGameStart name={name} email={email} />}></Route>
                  <Route exact path='/Solo-Quiz' element={< SoloGameQuiz name={name} email={email} />} ></Route>
                  <Route exact path='/Peer-Start' element={< PeerGameStart name={name} email={email} />}></Route>
                </Routes>

            </div>

          </div>

        </Router>


  );
}

export default App;
