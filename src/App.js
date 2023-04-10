import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Pages/Home'
import SoloGameStart from './components/Pages/SoloGameStart'
import PeerGameStart from './components/Pages/PeerGameStart'

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';


import  {  LoginToMicrosoft } from './components/authentication/LoginToMicrosoft'

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SoloGameQuiz from './components/Pages/SoloGameQuiz';
import { useEffect, useState } from 'react';
import {connect} from 'react-redux'


function App(props) {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);



  useEffect(()=>{
    instance
    .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
    })
    .then((response) => {
        callMsGraph(response.accessToken).then((response) => setGraphData(response));
        setEmail(accounts[0].username)
        setName(accounts[0].name)
    });


  }, [])



 

    const theme = createTheme({
      typography: {
        h1: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        h2: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        h3: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        h4: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        h5: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        h6: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        body1: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        },
        body2: {
          fontFamily: ['Carter One', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif',].join(',')
        }
      }
    });
    
   

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <div className="App" >
            <div className='App-header'>
                  <AppBar position="static">
                    <Toolbar>
                      {/* <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      >
                        <MenuIcon />
                      </IconButton> */}
                    
                      <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
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

    </ThemeProvider>


  );
}

export default App;
