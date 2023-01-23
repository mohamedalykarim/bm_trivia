import React from "react";
import '../../assets/styles/custom.css';

import { Container } from "@mui/system";

import bgImage from '../../assets/img/background.jpg'
import trophyIcon from '../../assets/img/trophy-icon.webp'
import instructionsImg from '../../assets/img/instructions.png'
import rulesImg from '../../assets/img/rules.png'

import { Link } from "react-router-dom";



import Grid from '@mui/material/Unstable_Grid2';


const styles = {
    fullBackground : {
      background: `url(${bgImage}) center center no-repeat`,
      backgroundSize : "cover", 
      webkitBackgroundSize : "cover",
      mozBackgroundSize : "cover",
      minHeight: "100vh"
    }
  }

function SoloGameReact(props){

    return <Container style={styles.fullBackground}>
    <Grid container spacing={2} > 

      <Grid className="textAlignCentered" sx={12} sm={12} md={12} lg={12} xl={12}>
       <button className="game-button soloStartHead" >
          <h1>
          <img src={trophyIcon} alt="trophyIcon" className="soloStartHeadImage"/>
          &nbsp; <span className="soloChallengeTitle">SOLO CHALLENGE</span>
          </h1>
       </button> 
      </Grid>

      <Grid className="textAlignCentered" sx={12} sm={12} md={6} lg={6} xl={6}>
       <button className="game-button soloStartHead" >
          <img src={instructionsImg} alt="trophyIcon" className="soloStartHeadImage" style={{}}/>

          <h1>
          &nbsp; Instructions
          </h1>

          <p>
          Solo Challenge allows you to challenge Your self to move forward and win Coins and Power Ups along the way!
          </p>
       </button> 
      </Grid>

      <Grid className="textAlignCentered" sx={12} sm={12} md={6} lg={6} xl={6}>
       <button className="game-button soloStartHead" >
          <img src={rulesImg} alt="trophyIcon" className="soloStartHeadImage" />

          <h1>
          &nbsp; Game Rules
          </h1>

         
          <ul className="soloRulesListItem">
            <li >You can have only one solo game per day</li>
            <li>You get 5 points for each solo game you pass</li>
            <li>If you drop in middle of game it counts as one</li>
          </ul>


       </button> 
      </Grid>


      <Grid className="textAlignCentered" sx={12} sm={12} md={6} lg={6} xl={6}>
         <Link to="/" >
            <button className="game-button red soloStartHead" >
               <h1>
               &nbsp; <span className="soloChallengeTitle">Cancel</span>
               </h1>
            </button> 
         </Link>
      </Grid>

      <Grid className="textAlignCentered" sx={12} sm={12} md={6} lg={6} xl={6}>
      <button className="game-button red soloStartHead" >
          <h1>
          &nbsp; <span className="soloChallengeTitle">Start Game</span>
          </h1>
       </button> 

      </Grid>




    </Grid>
</Container>

}


export default SoloGameReact
