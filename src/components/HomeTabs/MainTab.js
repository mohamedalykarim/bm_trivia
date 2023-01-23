import React from "react";


import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import {Box} from '@mui/material'
import './Main.css'
import '../../assets/styles/Buttons.css'

import scoreImg from "../../assets/img/score.png"

import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Link } from "react-router-dom";


export  const MainTab = (props) => {

    return (
        <>
        <Container>
            <Grid container>
           
            <Grid xs={12} >
                    <Link to="/Solo-Start" >
                        <button class="game-button game-button-top-buttons" >
                            <PersonIcon />
                            SOLO Challenge 
                        </button>
                    </Link>
                    
                    <button class="game-button game-button-top-buttons">
                        <GroupIcon />
                        PEER Challenge
                    </button>
                </Grid>


                <Grid xs={12}>
                    <div className="game-button orange">

                    <Box>
                        <Grid container>
                            <Grid xl={4} lg={4} md={4} sm={12} xs={12}>
                            <img src={scoreImg} className="scoreImg" />
                            </Grid>

                            <Grid xl={8} lg={8} md={8} sm={12} xs={12} textAlign="center"  >
                                <br />
                                <Typography variant="h5" >
                                    Your points:
                                </Typography>
                                <br />
                                <h1 style={{  }}>
                                    78563 
                                </h1>
                                points
                                <br />
                            </Grid>
                        </Grid>
                    </Box>

                    
                        
                        
                    </div>
                </Grid>


                <Grid xs={12}>
                <button class="game-button red">
                    SOLO Points
                    <br />
                    <PersonIcon fontSize="large" />
                </button>
                <button class="game-button red">
                    PEER Points
                    <br />
                    <GroupIcon fontSize='large' />

                </button>
                <button class="game-button red">
                    SQUAD Points
                    <br />
                    <Diversity3Icon fontSize="large" />

                </button>
                    
                </Grid>

              
            </Grid>
        </Container>




        


        </>
    );
};
