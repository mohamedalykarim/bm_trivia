import React from "react";
import '../../assets/styles/custom.css';


import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import  {  LoginToMicrosoft } from '../authentication/LoginToMicrosoft'


import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarsIcon from '@mui/icons-material/Stars';
import { MainTab } from "../HomeTabs/MainTab";

import bgImage from '../../assets/img/background.jpg'


const styles = {
    fullBackground : {
      background: `url(${bgImage}) center center no-repeat`,
      backgroundSize : "cover", 
      webkitBackgroundSize : "cover",
      mozBackgroundSize : "cover",
      minHeight: "100vh"
    }
  }
  
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


function Home(props){

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  

    
    return <Box sx={{ flexGrow: 1 }}>
    
        <UnauthenticatedTemplate >
                <div class="full-height-vh" >
                <LoginToMicrosoft />
                </div>
            </UnauthenticatedTemplate>


        <AuthenticatedTemplate>
            <Container style={styles.fullBackground}>
                <Grid container > 
                  <Grid 
                xl={10} xloffset={1}
                lg={8} lgOffset={2}
                md={12} 
                sm={12} 
                xs={12}>


                    <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        variant= "fullWidth"
                        textColor="#ffffff"
                        TabIndicatorProps={{style: {background:'#ffffff', color: '#ffffff'}}}
                        aria-label="basic tabs example">
                        <Tab label="Main" icon={<HomeIcon />} {...a11yProps(0)} />
                        <Tab label="Top Ten" icon={<EmojiEventsIcon />} {...a11yProps(1)} />
                        <Tab label="Leaderboard" icon={<StarsIcon />} {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <MainTab />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    </Box>


                </Grid>
                </Grid>
            </Container>
        </AuthenticatedTemplate>
    </Box>

}


export default Home
