import React from "react";
import '../../assets/styles/custom.css';

import { Container } from "@mui/system";

import trophyIcon from '../../assets/img/trophy-icon.webp'
import instructionsImg from '../../assets/img/instructions.png'
import rulesImg from '../../assets/img/rules.png'

import { Link } from "react-router-dom";



import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




function SoloGameReact(props){

   const [open, setOpen] = React.useState(false);
   const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
   setOpen(true);
   };

  const handleClose = () => {
   setOpen(false);
   };


    return <Container >
    <br />
    <Grid container spacing={3} > 
    

      {/* Page title */}
      <Grid className="textAlignCentered" xs={12} sm={12} md={12} lg={12} xl={12}>
       <div className="soloStartHead" style={{width: "100%", }}>
          <Typography variant="h1" >
          <img src={trophyIcon} alt="trophyIcon" className="soloStartHeadImage"/>
          &nbsp; <span className="soloChallengeTitle">SOLO CHALLENGE</span>
          </Typography>
       </div> 
      </Grid>

      {/* Instructions */}
      <Grid className="textAlignCentered" xs={12} sm={12} md={6} lg={6} xl={6}>
       <div className="soloStartHead" >
          <img src={instructionsImg} alt="trophyIcon" className="soloStartHeadImage" style={{}}/>

          <Typography variant="h1" >
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


      <Grid className="textAlignCentered" xs={6} sm={6} md={6} lg={6} xl={6}>
         <Link to="/" >
            <div className="game-button red soloStartHead" >
              <span className="soloChallengeTitle">Cancel</span>
            </div> 
         </Link>
      </Grid>

      <Grid className="textAlignCentered" xs={6} sm={6} md={6} lg={6} xl={6}>
         <button className="game-button red soloStartHead" onClick={handleClickOpen} >
            &nbsp; <span className="soloChallengeTitle">Start Game</span>
         </button> 

      </Grid>




    </Grid>


    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        color="secondary"
        
      >
        <DialogTitle id="responsive-dialog-title" className="dialogTitle">
          {"START SOLO CHALLENGE !"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText className="dialogBody">
            DO YOU READY TO CHALLENGE YOURSELF AND ADVANCE YOUR POINTS AND KNOWLEDGE !! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="game-button red" autoFocus onClick={handleClose}>
            CANCEL
          </Button>
          <span style={{width: "20px"}}></span>
          <Link to="/Solo-Quiz">
            <Button className="game-button red"  autoFocus>
              READY
            </Button>
          </Link>
          
        </DialogActions>
        <br />

      </Dialog>

</Container>

}


export default SoloGameReact
