import React, { useEffect,useState, useRef } from "react";

import '../../assets/styles/custom.css';
import '../../assets/styles/Buttons.css';

import {connect} from 'react-redux'


import { Container } from "@mui/system";
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
    fetchProviousGame, 
    fetchQuestions,
    getTheGame,
    insertTheGame,
    updateGameResultAndCQuestion,
    finishTheGame
} from '../helper/ApiHelper'

import { shuffle, getZeroAtStart, getRemainingTime } from '../helper/FunctionHelper'




import loadingImg from '../../assets/img/loading-gif.gif'
import awesomeImg from '../../assets/img/awesome.png'
import goodLuckImg from '../../assets/img/goodluck.png'
import accomplishImg from '../../assets/img/accomplish.png'



function SoloGameQuiz(props){
    var [isLoading, setIsloading] = useState(true);
    var [isPlayed, setIsPlayed] = useState(false)
    var [gamesPlayed, setGamesPlayed] = useState(null)
    var [questions, setQuestions] = useState([])
    var [currentQuestionNumber, setCurrentQuestionNumber] = useState(1)
    var [questionTextUI, setQuestionTextUI] = useState("")
    var [answerOneUI, setAnswerOneUI] = useState("")
    var [answerTwoUI, setAnswerTwoUI] = useState("")
    var [answerThreeUI, setAnswerThreeUI] = useState("")
    var [answerFourUI, setAnswerFourUI] = useState("")
    var [correctAnswerUI, setCorrectAnswerUI] = useState("")
    var [chosenValue, setChosenValue] = useState(null)
    const [gameId, setGameId] = useState(0)
    const [result, setResult] = useState(0)
    const [currentTime, setCurrentTime] = useState("")
    const [nextTitle, setNextTitle] = useState("Next Question")

    const choiceOneRef = useRef(null)
    const choiceTwoRef = useRef(null)
    const choiceThreeRef = useRef(null)
    const choiceFourRef = useRef(null)

    const [answerOneClassName, setAnswerOneClassName] = useState("choiceOptionRec")
    const [answerTwoClassName, setAnswerTwoClassName] = useState("choiceOptionRec")
    const [answerThreeClassName, setAnswerThreeClassName] = useState("choiceOptionRec")
    const [answerFourClassName, setAnswerFourClassName] = useState("choiceOptionRec")

    const [currentQuestionStatus, setCurrentQuestionStatus] = useState("")

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertImage, setAlertImg] = useState(null);
    const [alertText, setAlertText] = useState("")

    const [AnswerResults, setAnswerResults] = useState({
        "Question1" : null,
        "Question2" : null,
        "Question3" : null,
        "Question4" : null,
        "Question5" : null,
        "Question6" : null,
        "Question7" : null,
        "Question8" : null,
        "Question9" : null,
        "Question10" : null,
        "Question11" : null,
        "Question12" : null,
        "Question13" : null,
        "Question14" : null,
        "Question15" : null,
        "Question16" : null,
        "Question17" : null,
        "Question18" : null,
        "Question19" : null,
        "Question20" : null,
    })



    const handleAlertClickOpen = () => {
        setAlertOpen(true);
    };
    
      const handleAlertClose = () => {
        setAlertOpen(false);
    };


    

    const startInput = '00:00:00:0000';
    const [hourStart, minutesStart, secondsStart, millisecondsStart] = startInput.split(':');

    const endtInput = '23:59:59:0999';
    const [hourEnd, minutesEnd, secondsEnd, millisecondsEnd] = endtInput.split(':');


    var start = new Date();
    start.setHours(hourStart)
    start.setMinutes(minutesStart)
    start.setSeconds(secondsStart)
    start.setMilliseconds(millisecondsStart)

    var end = new Date();
    end.setHours(hourEnd)
    end.setMinutes(minutesEnd)
    end.setSeconds(secondsEnd)
    end.setMilliseconds(millisecondsEnd)

    const startDayTimeInMillisecond = start.getTime()
    const endDayTimeInMillisecond = end.getTime()


    



    const onChoiceChange = async(event)=>{
        setChosenValue(event.target.value)

        var countDownTimer = 300
        var motionStart = 70
        var motionMiddle = 60
        var motionEnd = 50



        if(event.target.name === "answerOne"){
            setAnswerOneClassName("choiceOptionRecSelected")
            setAnswerTwoClassName("choiceOptionRec")
            setAnswerThreeClassName("choiceOptionRec")
            setAnswerFourClassName("choiceOptionRec")

            const countDownInterval = setInterval(() => {
                if(countDownTimer === motionStart){
                    if(event.target.value === correctAnswerUI){
                        setAnswerOneClassName("choiceOptionRecCorrect")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : true
                        })
                        updateGameResultAndCQuestion(gameId, true)
                    }else{
                        setAnswerOneClassName("choiceOptionRecWrong")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : false
                        })
                        updateGameResultAndCQuestion(gameId)

                    }

                }else if (countDownTimer === motionMiddle){
                    setAnswerOneClassName("choiceOptionRec")
                }else if (countDownTimer === motionEnd){
                    if(event.target.value === correctAnswerUI){
                        setAnswerOneClassName("choiceOptionRecCorrect")
                        setAlertImg(awesomeImg)
                        setAlertText("Woohoo !")
                    }else{
                        setAlertImg(goodLuckImg)
                        setAlertText("Sorry, try again !")

                        setAnswerOneClassName("choiceOptionRecWrong")
                        if(correctAnswerUI === answerTwoUI){
                            setAnswerTwoClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerThreeUI){
                            setAnswerThreeClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerFourUI){
                            setAnswerFourClassName("choiceOptionRecCorrect")
                        }
                        
                    }

                    setCurrentQuestionStatus("answered")
                }
                
                countDownTimer = countDownTimer - 1

                if(countDownTimer === 0){
                    handleAlertClickOpen()
                    clearInterval(countDownInterval)
                }
                
            }, 10);
            



        }else if (event.target.name === "answerTwo"){
            setAnswerOneClassName("choiceOptionRec")
            setAnswerTwoClassName("choiceOptionRecSelected")
            setAnswerThreeClassName("choiceOptionRec")
            setAnswerFourClassName("choiceOptionRec")

            const countDownInterval = setInterval(() => {
                if(countDownTimer === motionStart){
                    if(event.target.value === correctAnswerUI){
                        setAnswerTwoClassName("choiceOptionRecCorrect")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : true
                        })
                        updateGameResultAndCQuestion(gameId, true)
                    }else{
                        setAnswerTwoClassName("choiceOptionRecWrong")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : false
                        })
                        updateGameResultAndCQuestion(gameId)

                    }

                }else if (countDownTimer === motionMiddle){
                    setAnswerTwoClassName("choiceOptionRec")
                }else if (countDownTimer === motionEnd){
                    if(event.target.value === correctAnswerUI){
                        setAnswerTwoClassName("choiceOptionRecCorrect")
                        setAlertImg(awesomeImg)
                        setAlertText("Woohoo !")


                    }else{
                        setAlertImg(goodLuckImg)
                        setAlertText("Sorry, try again !")


                        setAnswerTwoClassName("choiceOptionRecWrong")
                        if(correctAnswerUI === answerOneUI){
                            setAnswerOneClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerThreeUI){
                            setAnswerThreeClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerFourUI){
                            setAnswerFourClassName("choiceOptionRecCorrect")
                        }
                        
                    }

                    setCurrentQuestionStatus("answered")

                }
                
                countDownTimer = countDownTimer - 1

                if(countDownTimer === 0){
                    handleAlertClickOpen()
                    clearInterval(countDownInterval)
                }
                
            }, 10);





        }else if (event.target.name === "answerThree"){
            setAnswerOneClassName("choiceOptionRec")
            setAnswerTwoClassName("choiceOptionRec")
            setAnswerThreeClassName("choiceOptionRecSelected")
            setAnswerFourClassName("choiceOptionRec")


            const countDownInterval = setInterval(() => {
                if(countDownTimer === motionStart){
                    if(event.target.value === correctAnswerUI){
                        setAnswerThreeClassName("choiceOptionRecCorrect")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : true
                        })
                        updateGameResultAndCQuestion(gameId, true)
                    }else{
                        setAnswerThreeClassName("choiceOptionRecWrong")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : false
                        })
                        updateGameResultAndCQuestion(gameId, false)
                    }

                }else if (countDownTimer === motionMiddle){
                    setAnswerThreeClassName("choiceOptionRec")
                }else if (countDownTimer === motionEnd){
                    if(event.target.value === correctAnswerUI){
                        setAnswerThreeClassName("choiceOptionRecCorrect")
                        setAlertImg(awesomeImg)
                        setAlertText("Woohoo !")


                    }else{
                        setAlertImg(goodLuckImg)
                        setAlertText("Sorry, try again !")


                        setAnswerThreeClassName("choiceOptionRecWrong")
                        if(correctAnswerUI === answerOneUI){
                            setAnswerOneClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerTwoUI){
                            setAnswerTwoClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerFourUI){
                            setAnswerFourClassName("choiceOptionRecCorrect")
                        }
                        
                    }

                    setCurrentQuestionStatus("answered")

                }
                
                countDownTimer = countDownTimer - 1

                if(countDownTimer === 0){
                    handleAlertClickOpen()
                    clearInterval(countDownInterval)
                }
                
            }, 10);

        }else if (event.target.name === "answerFour"){
            setAnswerOneClassName("choiceOptionRec")
            setAnswerTwoClassName("choiceOptionRec")
            setAnswerThreeClassName("choiceOptionRec")
            setAnswerFourClassName("choiceOptionRecSelected")

            const countDownInterval = setInterval(() => {
                if(countDownTimer === motionStart){
                    if(event.target.value === correctAnswerUI){
                        setAnswerFourClassName("choiceOptionRecCorrect")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : true
                        })
                        updateGameResultAndCQuestion(gameId, true)
                    }else{
                        setAnswerFourClassName("choiceOptionRecWrong")
                        setAnswerResults({
                            ...AnswerResults,
                            ["Question"+currentQuestionNumber] : false
                        })
                        updateGameResultAndCQuestion(gameId)

                    }

                }else if (countDownTimer === motionMiddle){
                    setAnswerFourClassName("choiceOptionRec")
                }else if (countDownTimer === motionEnd){
                    if(event.target.value === correctAnswerUI){
                        setAnswerFourClassName("choiceOptionRecCorrect")
                        setAlertImg(awesomeImg)
                        setAlertText("Woohoo !")


                    }else{
                        setAlertImg(goodLuckImg)
                        setAlertText("Sorry, try again !")


                        setAnswerFourClassName("choiceOptionRecWrong")
                        if(correctAnswerUI === answerOneUI){
                            setAnswerOneClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerTwoUI){
                            setAnswerTwoClassName("choiceOptionRecCorrect")
                        }else if(correctAnswerUI === answerThreeUI){
                            setAnswerThreeClassName("choiceOptionRecCorrect")
                        }
                        
                    }

                    setCurrentQuestionStatus("answered")
                }
                
                countDownTimer = countDownTimer - 1
                

                if(countDownTimer === 0){
                    handleAlertClickOpen()
                    clearInterval(countDownInterval)
                }
                
            }, 10);
        }


    }


    // handle next button 
    const handleNextButton = async(event)=>{
        if(currentQuestionNumber === 19){
            setNextTitle("Finish the game")
        }
        
        
        if(currentQuestionNumber === 20){
            const updatedProviousGame = await fetchProviousGame(startDayTimeInMillisecond, endDayTimeInMillisecond, props.email);
            setIsPlayed(true)
            setIsloading(false)
            setResult(updatedProviousGame.data[0].result)
            const finishResult = finishTheGame(updatedProviousGame.data[0].id)
        }
        else if(currentQuestionStatus === "answered"){
            const questionNumber = currentQuestionNumber + 1
            setCurrentQuestionNumber(questionNumber)
            const index = questionNumber - 1
            setQuestionTextUI(questions[index].question_text)
            setAnswerOneUI(questions[index].answer_one)
            setAnswerTwoUI(questions[index].answer_two)
            setAnswerThreeUI(questions[index].answer_three)
            setAnswerFourUI(questions[index].answer_four)
            setCorrectAnswerUI(questions[index].correct_answer)
            setChosenValue(null)

            console.log("set correct answer", questions[index].correct_answer);
            console.log("set correct answer", currentQuestionNumber);

            setAnswerOneClassName("choiceOptionRec")
            setAnswerTwoClassName("choiceOptionRec")
            setAnswerThreeClassName("choiceOptionRec")
            setAnswerFourClassName("choiceOptionRec")


            setCurrentQuestionStatus("ready_to_answer")
        }
    }

    
    
    
   
   useEffect(()=>{
    async function fetchData(email, name) {



        // Check if the employee played a solo game today
            // if yes
                // if not finished check it start time
                    //--> if pass 10 minutes --> finish it and go to you are finished your game for today
                    //--> if pass less than 8 minute --> continue playing
                // if finished --> go to you are finished your game for today
            // if no keep foward and add one test to the database   

        const results = await fetchProviousGame(startDayTimeInMillisecond, endDayTimeInMillisecond, email);
        const proviousGameResults = results.data


        // There is a game played today
        if(proviousGameResults.length > 0){
            setGameId(proviousGameResults[0].id)


            if(proviousGameResults[0].is_finished > 0){
                // the game is finished 
                setIsPlayed(true)
                setIsloading(false)
                setResult(proviousGameResults[0].result)
                const finishResult = finishTheGame(proviousGameResults[0].id)
            }else{
                // the game is not finished
                const now = new Date().getTime();
                const timePassed = ( now - proviousGameResults[0].start_time ) / 1000 / 60
            
                if (timePassed > 8){
                    // finish the game
                    setIsPlayed(true)
                    setIsloading(false)
                    setResult(proviousGameResults[0].result)
                    const finishResult = finishTheGame(proviousGameResults[0].id)
                }else{
                    
                    if (proviousGameResults[0].current_question_number > 20) {

                        const updatedProviousGame = await fetchProviousGame(startDayTimeInMillisecond, endDayTimeInMillisecond, email);
                        setIsPlayed(true)
                        setIsloading(false)
                        setResult(updatedProviousGame.data[0].result)
                        // TODO
                        const finishResult = finishTheGame(proviousGameResults[0].id)
                        return
                    }
                    else{

                        // continue the game
                        const questionsResults = await fetchQuestions()
                        

                        questionsResults.data.forEach(async result => {
                            questions.push({
                                question_text : result.question_text,
                                question_type : result.question_type,
                                answer_one : result.answer_one,
                                answer_two : result.answer_two,
                                answer_three : result.answer_three,
                                answer_four : result.answer_four,
                                correct_answer : result.correct_answer
                            })
                        });
                        
            
                        setQuestions(shuffle(questions))
                        setQuestionTextUI(questions[proviousGameResults[0].current_question_number-1].question_text)
                        setAnswerOneUI(questions[proviousGameResults[0].current_question_number-1].answer_one)
                        setAnswerTwoUI(questions[proviousGameResults[0].current_question_number-1].answer_two)
                        setAnswerThreeUI(questions[proviousGameResults[0].current_question_number-1].answer_three)
                        setAnswerFourUI(questions[proviousGameResults[0].current_question_number-1].answer_four)
                        setCorrectAnswerUI(questions[proviousGameResults[0].current_question_number-1].correct_answer)
                        setCurrentQuestionNumber(proviousGameResults[0].current_question_number)
                        setIsloading(false)





                        var minute = getRemainingTime(proviousGameResults[0].start_time);
                        var sec = 0;                        
            
                        setInterval(async function() {
                            setCurrentTime(getZeroAtStart(minute) + ":" + getZeroAtStart(sec))
                        
                            if (sec < 1) {
                            if (minute < 1 && sec < 1 ) {
                                setCurrentTime(getZeroAtStart(minute) + ":" + getZeroAtStart(sec))
                                clearInterval()
            
                                const updatedProviousGame = await fetchProviousGame(startDayTimeInMillisecond, endDayTimeInMillisecond, email);
                                setIsPlayed(true)
                                setIsloading(false)
                                setResult(updatedProviousGame[0].result)
                                const finishResult = finishTheGame(proviousGameResults[0].id)
            
                            }
                            else{
                                minute--;
                                sec = 59;
                            }
                            }else{
                                sec--;
                            }
                        }, 1000);


                    }
                    
                    
                    
                    
        
        

                }
            }
        }
        
        // There is no game played today
        else{

            const results = await fetchQuestions()
            const questionsResults = results.data

            

            questionsResults.forEach(async result => {
                questions.push({
                    question_text : result.question_text,
                    question_type : result.question_type,
                    answer_one : result.answer_one,
                    answer_two : result.answer_two,
                    answer_three : result.answer_three,
                    answer_four : result.answer_four,
                    correct_answer : result.correct_answer
                 })
             });

             setQuestions(shuffle(questions))
             setQuestionTextUI(questions[0].question_text)
             setAnswerOneUI(questions[0].answer_one)
             setAnswerTwoUI(questions[0].answer_two)
             setAnswerThreeUI(questions[0].answer_three)
             setAnswerFourUI(questions[0].answer_four)
             setCorrectAnswerUI(questions[0].correct_answer)
             setIsloading(false)

             var minute = 10;
             var sec = 0;                        

             setInterval(async function() {
                setCurrentTime(getZeroAtStart(minute) + ":" + getZeroAtStart(sec))
            
                if (sec < 1) {
                  if (minute < 1 && sec < 1 ) {
                    setCurrentTime(getZeroAtStart(minute) + ":" + getZeroAtStart(sec))
                    clearInterval()

                    const updatedProviousGame = await fetchProviousGame(startDayTimeInMillisecond, endDayTimeInMillisecond, email);
                    setIsPlayed(true)
                    setIsloading(false)
                    setResult(updatedProviousGame[0].result)
                    const finishResult = finishTheGame(updatedProviousGame[0].id)

                  }
                  else{
                    minute--;
                    sec = 59;
                  }
                }else{
                    sec--;
                }
              }, 1000);


             const gameData = {
                name: name,
                game_type: "SOLO",
                start_time : new Date().getTime(),
                email: email,
                peer_name : "",
                peer_email : "",
                is_finished: 0,
                current_question_number: 1,
                result: 0
            }
    
            const insertionResults = await insertTheGame(gameData)
            setGameId(insertionResults.data.insertId)

        }

        
    
    }




    if(props.email !== null)
    fetchData(props.email, props.name)



   }, [startDayTimeInMillisecond, endDayTimeInMillisecond, questions, props.email])
    

    
    return <Container >
        <Grid container spacing={0}>
            <Grid className="textAlignCentered" xs={12} sm={12} md={12} lg={12} xl={12}>

                

                 {isLoading ? 

                //Loading Fragment 
                <Container>
                <Grid container spacing={0}  >
                    <Grid className="textAlignCentered" xs={4} sm={4} md={4} lg={4} xl={4}>
                        
                    </Grid>

                    <Grid className="textAlignCentered" xs={4} sm={4} md={4} lg={4} xl={4} style={{height:"100vh"}}>

                        <img  src={loadingImg} alt="loading" style={{width:"50%", marginTop:"25vh"}} />
                        <Typography variant="h4">Loading...</Typography>
                    </Grid>

                    <Grid className="textAlignCentered" xs={4} sm={4} md={4} lg={4} xl={4}>
                        
                    </Grid>
                </Grid>

                </Container>
                 
                 :
                /* Question and played sections */
                 <div>
                {isPlayed ? 



                /* Played section */
                <Container>

                    <br />
                    <Grid container spacing={.5} >
                        <Grid xs={12} sm={3} md={3} lg={3} xl={3} style={{textAlign:"center"}}>
                        </Grid>

                        <Grid xs={12} sm={6} md={6} lg={6} xl={6} style={{textAlign:"center"}}>
                            <img src={accomplishImg} style={{width:"50%"}} /> 
                        </Grid>

                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} style={{textAlign:"center"}}>
                        </Grid>

                    </Grid>

                    <br />
                    <br />


                    <Grid container spacing={.5} >
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign:"center"}}>
                            <Typography variant="h4" >You are finished your SOLO game for today</Typography>
                            <Typography variant="h2" style={{fontWeight:"bolder"}}>You collect : {result} Points</Typography>
                            <br />
                            <Link to="/">
                                <Button className="game-button red"  autoFocus style={{width:"50%", height:"80px"}}>
                                    Back to Main Page
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>




                </Container>
                

                
                
                : 


                /* Question section */

                <Container>

                 <br />
                <Grid container spacing={.5} >
                    <Grid className="textAlignCentered" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography variant="body1">Question Number {currentQuestionNumber} of 20</Typography>                
                    </Grid>

                    <Grid className="textAlignCentered" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography variant="body1">Remain Time : {currentTime}</Typography>                
                    </Grid>

                </Grid>

                <br />


                <Grid container spacing={.5} >
            
                    <Grid className="textAlignCentered" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="soloStartHead" style={{width: "100%", }}>
                            <br />
                            <Typography variant="body1" style={{fontWeight:"bold", direction: "rtl"}}>
                                {questionTextUI}
                            </Typography>
                            <br />
                        </div> 

                    </Grid>


                </Grid>

                <br />

                <FormControl className="choicesForm">
                    
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className="choicesRadioGroup"
                        >

                            <Grid container spacing={.5} style={{direction : "rtl"}} >         

                            <Grid className="choiceGrid" xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControlLabel 
                                ref = {choiceOneRef}
                                disabled = {chosenValue !== null}
                                onChange={onChoiceChange}
                                checked = {chosenValue === answerOneUI}
                                className={ answerOneClassName } 
                                name="answerOne" 
                                value={answerOneUI} 
                                control={<Radio style={{}} />} 
                                label={answerOneUI}  />

            
                            </Grid>

                            <Grid className="choiceGrid" xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControlLabel 
                                ref = {choiceTwoRef}
                                disabled = {chosenValue !== null}
                                onChange={onChoiceChange}
                                checked = {chosenValue === answerTwoUI}
                                className={answerTwoClassName}
                                name="answerTwo"    
                                value={answerTwoUI} 
                                control={<Radio style={{}} />} 
                                label={answerTwoUI} />
            
                            </Grid>

                            {answerThreeUI ? 

                            <Grid className="choiceGrid" xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControlLabel 
                                ref = {choiceThreeRef}
                                disabled = {chosenValue !== null}
                                onChange={onChoiceChange}
                                checked = {chosenValue === answerThreeUI}
                                className={answerThreeClassName} 
                                name="answerThree" 
                                value={answerThreeUI} 
                                control={<Radio style={{}} />} 
                                label={answerThreeUI} />
                            
                            </Grid>

                            : null}

                            {answerFourUI ? 
                            <Grid className="choiceGrid" xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControlLabel  
                                ref = {choiceFourRef}    
                                disabled = {chosenValue !== null}                           
                                onChange={onChoiceChange}
                                checked = {chosenValue === answerFourUI}
                                className={answerFourClassName} 
                                name="answerFour" value={answerFourUI} 
                                control={<Radio style={{}} />} 
                                label={answerFourUI} />
                            </Grid>

                            : null}

                            </Grid>

                    </RadioGroup>
                </FormControl>


                


                <br />
                <br />
                <br />

                <Grid container spacing={.5} >
                    <Grid className="textAlignCentered" xs={2} sm={2} md={3} lg={3} xl={3}>
                    
                    </Grid>

                    <Grid className="textAlignCentered" xs={4} sm={4} md={3} lg={3} xl={3}>
                        <Button 
                        className="game-button blue"  
                        onClick={handleNextButton}
                        autoFocus 
                        style={{width:"90%", height:"80px",}}>
                            {nextTitle}
                        </Button>
                    </Grid>

                    <Grid className="textAlignCentered" xs={4} sm={4} md={3} lg={3} xl={3}>
                        <Button className="game-button red"  autoFocus style={{width:"90%", height:"80px"}}>
                            Exit to Main Page
                        </Button>
                    </Grid>

                    <Grid className="textAlignCentered" xs={2} sm={2} md={3} lg={3} xl={3}>
                    
                    </Grid>

                </Grid>  

                 </Container>
                
                
                
                
                    }
                 </div>

                 }

                 





            </Grid>
        </Grid>

        <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {alertText}
        </DialogTitle>
        <DialogContent>
            <div style={{width:"100%", padding:"10px", textAlign:"center"}}>
                <img src={alertImage} style={{width:"80%"}} alt="alert"/>


            </div>
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="game-button red" onClick={handleAlertClose} autoFocus style={{marginBottom:"20px"}}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

              

    </Container>
    

}



export default SoloGameQuiz