import React, { useEffect, useState } from "react";

import {getTop10} from '../helper/ApiHelper'


import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import './Main.css'
import '../../assets/styles/custom.css'


import loadingImg from '../../assets/img/loading-gif.gif'




export  const LeaderBoard = (props) => {
    const [topTen, setTopTen] = useState([])
    const [isLoading, setIsloading]= useState(true)

    useEffect(()=>{
        const getData = async ()=>{
            const topTen = await getTop10()
            setTopTen(topTen.slice(0,9))
            setIsloading(false)
        }


        if (topTen.length === 0)
        getData()


    },[topTen])

    return (
        <>

        {isLoading ? 

        //Loading Fragment 
        <Container>
        <Grid container spacing={0}  >
            <Grid className="textAlignCentered" xs={4} sm={4} md={4} lg={4} xl={4}>
                
            </Grid>

            <Grid className="textAlignCentered" xs={4} sm={4} md={4} lg={4} xl={4} style={{height:"100vh"}}>

                <img  src={loadingImg} alt="loading" style={{width:"50%", marginTop:"10vh"}} />
                <Typography variant="h4">Loading...</Typography>
            </Grid>

            <Grid className="textAlignCentered" xs={4} sm={4} md={4} lg={4} xl={4}>
                
            </Grid>
        </Grid>

        </Container>
        
        : 
        
        <Container style={{}}>
            <Grid container spacing={3}>
                
                <Grid xs={12} sm={12} md={12} lg={12} xl={12}>

            
                    {
                    topTen.map((data, index)=>{
                        return <div className="TopTenItem" key={index}>
                        <Grid container spacing={3}>
                            <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                                <div className="circleBase circle1" style={{display: "table"}}>
                                    <Typography variant="body1" style={{display: "table-cell", verticalAlign:"middle"}} >{index+1}</Typography>
                                </div>
                            </Grid>
    
                            <Grid xs={7} sm={7} md={7} lg={7} xl={7} >
                                <div style={{display:"table", height:"100%", width:"100%", textAlign:"center"}}>
                                    <Typography variant="h5" style={{display:"table-cell", verticalAlign:"middle",textAlign:"center"}}>{data[1]}</Typography>
                                </div>
                            </Grid>
    
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                                <div style={{display:"table", height:"100%", width:"100%", textAlign:"center"}}>
                                    <Typography variant="h5" style={{display:"table-cell", verticalAlign:"middle",textAlign:"center"}}>{data[2]}</Typography>
                                </div>
                            </Grid>
    
                        </Grid>
    
                      </div>
                    })
                    }


                  
                </Grid>

               
           
            </Grid>
        </Container>
        
        
        }



        




        


        </>
    );
};
