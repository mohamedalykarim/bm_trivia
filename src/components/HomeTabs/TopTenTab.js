import React from "react";


import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import {Box} from '@mui/material'
import './Main.css'
import '../../assets/styles/custom.css'


import scoreImg from "../../assets/img/score.png"
import score2Img from "../../assets/img/score2.png"
import trophyIcon from '../../assets/img/trophy-icon.webp'


import { Link } from "react-router-dom";


export  const TopTenTab = (props) => {

    return (
        <>
        <Container style={{}}>
            <Grid container spacing={3}>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="TopTenItem">
                    <Grid container spacing={3}>
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                            <img src={trophyIcon} alt="trophyIcon" className="TopTenItemImg"/>
                        </Grid>

                        <Grid xs={7} sm={7} md={7} lg={7} xl={7}>
                            <h3>Mohamed Ahmed ALi Mohamed</h3>
                        </Grid>

                        <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                            <h1>76315</h1>
                        </Grid>

                    </Grid>

                  </div>
                </Grid>
           
            </Grid>
        </Container>




        


        </>
    );
};
