import React from "react";


import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import {Box} from '@mui/material'
import './Main.css'
import '../../assets/styles/Buttons.css'

import scoreImg from "../../assets/img/score.png"
import score2Img from "../../assets/img/score2.png"
import trophyIcon from '../../assets/img/trophy-icon.webp'


import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Link } from "react-router-dom";


export  const MainTab = (props) => {

    return (
        <Container style={{}}>
            <Grid container spacing={3}>
           
            <Grid xs={12} sm={12} md={6} lg={6} xl={6} >
                    
                    <Link to="/Solo-Start" >
                        <div className="game-button game-button-top-buttons" >
                            <img src={trophyIcon} alt="trophyIcon" className="soloStartHeadImage"/>
                            <br />
                            <br />
                            SOLO Challenge
                        </div>
                    </Link>
                    
               

                </Grid>


                <Grid xs={12} sm={12} md={6} lg={6} xl={6} >
                    
                    
                    <Link to="/Peer-Start" >
                        <div className="game-button game-button-top-buttons">
                            <img src={score2Img} alt="trophyIcon" className="soloStartHeadImage"/>
                            <br />
                            <br />
                            PEER Challenge
                        </div>
                    </Link>

                </Grid>


                <Grid xs={12}>
                    <div className="game-button orange" style={{width: "100%"}}>

                    <Box>
                        <Grid container>
                            <Grid xl={4} lg={4} md={4} sm={12} xs={12}>
                            <img src={scoreImg} className="scoreImg" />
                            </Grid>

                            <Grid xl={8} lg={8} md={8} sm={12} xs={12} textAlign="center"  >

                            <Box>
                                <Grid container>
                                    <Grid xl={12} lg={12} md={12} sm={12} xs={12} >
                                    <br />
                                        Your points:
                                    </Grid>

                                    <Grid xl={12} lg={12} md={12} sm={12} xs={12} >
                                        <br />

                                        <span style={{fontSize: "100px"}}>
                                        78563 
                                        </span>&nbsp; points
                                    </Grid>
                                </Grid>
                            </Box>

                               
                            </Grid>
                        </Grid>
                    </Box>

                    
                        
                        
                    </div>
                </Grid>


                <Grid xs={12}>
                    <Box>
                        <Grid container>
                            <Grid xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div className="soloPointHeader">
                                    <Typography variant="h5">SOLO Points</Typography>
                                </div>
                                <div className="soloPointBody">
                                    <PersonIcon fontSize="large" />
                                </div>
                            </Grid>

                            <Grid xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div className="soloPointHeader">
                                    <Typography variant="h5">PEER Points</Typography>
                                </div>
                                <div className="soloPointBody">
                                    <GroupIcon fontSize='large' />
                                </div>
                            </Grid>

                            <Grid xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div className="soloPointHeader">
                                    <Typography variant="h5">SQUAD Points</Typography>
                                </div>
                                <div className="soloPointBody">
                                    <Diversity3Icon fontSize="large" />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                 
                    
                </Grid>

              
            </Grid>
        </Container>




        


    );
};
