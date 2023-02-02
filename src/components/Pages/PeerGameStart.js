import React from "react";
import '../../assets/styles/custom.css';

import { Container } from "@mui/system";

import bgImage from '../../assets/img/background.jpg'
import score2Img from '../../assets/img/score2.png'
import instructionsImg from '../../assets/img/instructions.png'
import rulesImg from '../../assets/img/rules.png'

import { Link } from "react-router-dom";



import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from "@mui/material";


const styles = {
    fullBackground : {
      background: `url(${bgImage}) center center no-repeat`,
      backgroundSize : "cover", 
      WebkitBackgroundSize : "cover",
      MozBackgroundSize : "cover",
      minHeight: "100vh"
    }
  }

function PeerGameStart(props){

    return <Container >
    <Grid container spacing={1} > 

      {/* Page title */}
      <Grid className="textAlignCentered" xs={12} sm={12} md={12} lg={12} xl={12}>
       <div className="soloStartHead">
          <Typography variant="h1" style={{width: "100%", }}>
          <img src={score2Img} alt="trophyIcon" className="soloStartHeadImage"/>
          &nbsp; <span className="soloChallengeTitle">PEER CHALLENGE</span>
          </Typography>
       </div> 
      </Grid>

      {/* Instructions */}
      <Grid className="textAlignCentered" xs={12} sm={12} md={6} lg={6} xl={6}>
       <div className="soloStartHead" >
          <img src={instructionsImg} alt="trophyIcon" className="soloStartHeadImage" style={{}}/>

          <Typography variant="h1">
          &nbsp; Instructions
          </Typography>

          <Typography variant="body1">
          Solo Challenge allows you to challenge Your self to move forward and win Coins and Power Ups along the way!
          </Typography>
          <br />
       </div> 
      </Grid>

      {/* Game Rules */}
      <Grid className="textAlignCentered" xs={12} sm={12} md={6} lg={6} xl={6}>
       <div className="soloStartHead" >
          <img src={rulesImg} alt="trophyIcon" className="soloStartHeadImage" />

          <Typography variant="h1">
          &nbsp; Game Rules
          </Typography>

         
          <ul className="soloRulesListItem">
            <li >You can have only one solo game per day</li>
            <li>You get 5 points for each solo game you pass</li>
            <li>If you drop in middle of game it counts as one</li>
          </ul>

       </div> 
      </Grid>


      <Grid className="textAlignCentered" xs={12} sm={12} md={6} lg={6} xl={6}>
         <Link to="/" >
            <button className="game-button red soloStartHead" >
               <span className="soloChallengeTitle">Cancel</span>
            </button> 
         </Link>
      </Grid>

      <Grid className="textAlignCentered" xs={12} sm={12} md={6} lg={6} xl={6}>
      <button className="game-button red soloStartHead" >
          <span className="soloChallengeTitle">Start Game</span>
       </button> 

      </Grid>




    </Grid>
</Container>

}


export default PeerGameStart
