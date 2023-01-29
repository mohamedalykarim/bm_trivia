import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Pages/Home'
import SoloGameStart from './components/Pages/SoloGameStart'
import PeerGameStart from './components/Pages/PeerGameStart'

import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";


import  {  LoginToMicrosoft } from './components/authentication/LoginToMicrosoft'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

fetch(`/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia')/items`, {  
  method: "POST",
  headers: {             
    "accept": "application/json;odata=verbose",
    "content-type": "application/json;odata=verbose",
  },
  accept: 'application/json;odata=verbose',
  body: JSON.stringify({ '__metadata': { 'type': 'SP.List' }, 'AllowContentTypes': true,
  'BaseTemplate': 100, 'ContentTypesEnabled': true, 'Description': 'My list description', 'Title': 'Test from app' }
 )
})
.then((result)=>{
  console.log(result)
})
.then(console.log)
.catch(console.log);



function App() {
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
                  <Route exact path='/Solo-Start' element={< SoloGameStart />}></Route>
                  <Route exact path='/Peer-Start' element={< PeerGameStart />}></Route>
                </Routes>

            </div>

          </div>

        </Router>


  );
}

export default App;
