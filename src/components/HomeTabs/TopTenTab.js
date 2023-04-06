import React, { useEffect } from "react";

import {getTop10} from '../helper/ApiHelper'


import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import './Main.css'
import '../../assets/styles/custom.css'

import score2Img from "../../assets/img/score2.png"
import trophyIcon from '../../assets/img/trophy-icon.webp'


import { Link } from "react-router-dom";


export  const TopTenTab = (props) => {

    useEffect(()=>{

        getTop10()

    },[])

    return (
        <>
        <Container style={{}}>
            <Grid container spacing={3}>
                
                <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="TopTenItem">
                    <Grid container spacing={3}>
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                            <div className="circleBase circle1" style={{display: "table"}}>
                                <Typography variant="body1" style={{display: "table-cell", verticalAlign:"middle"}} >10</Typography>
                            </div>
                        </Grid>

                        <Grid xs={7} sm={7} md={7} lg={7} xl={7} >
                            <div style={{display:"table", height:"100%", width:"100%", textAlign:"center"}}>
                                <Typography variant="h5" style={{display:"table-cell", verticalAlign:"middle",textAlign:"center"}}>Mohamed Ahmed ALi Mohamed</Typography>
                            </div>
                        </Grid>

                        <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                            <div style={{display:"table", height:"100%", width:"100%", textAlign:"center"}}>
                                <Typography variant="h5" style={{display:"table-cell", verticalAlign:"middle",textAlign:"center"}}>50</Typography>
                            </div>
                        </Grid>

                    </Grid>

                  </div>
                </Grid>

               
           
            </Grid>
        </Container>




        


        </>
    );
};
