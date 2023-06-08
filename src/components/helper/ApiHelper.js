import { Title } from "@mui/icons-material";
import axios, { all } from "axios";

const BASE_URL = "http://localhost:3005"

export const fetchProviousGame = async(startDayTimeInMillisecond, endDayTimeInMillisecond, email) => {
    console.log("start fetchProviousGame");
    const results = await axios.post(
      `${BASE_URL}/games/old-games`,
      {
        email: email,
        startDayTimeInMillisecond: startDayTimeInMillisecond,
        endDayTimeInMillisecond: endDayTimeInMillisecond
      },
      {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
      }
    )

    return results.data
}

export const getTheGame = async(gameId) => {
    const results = await axios.get(
        `${BASE_URL}/games/${gameId}`,
        {},
      {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
      }
    )

    return results.data
}


export const fetchQuestions = async ()=>{
    const results = await axios.get(
        `${BASE_URL}/questions/`,
        {},
        {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
        }

    )
    
    return(results.data)

}

export const insertTheGame = async(data) => {    

    const results = await axios.post(
        `${BASE_URL}/games/`,
        data,
        {
            headers : {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            }
        }

    )

    return results.data
}

export const finishTheGame = async(gameId) => {   
    
    const results = axios.post(
        `${BASE_URL}/games/finish/${gameId}`,
        {  },
        {
            headers :{
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            }

        }

    )
    return results
}


export const addOnePointToResult = async(gameId) => {   
    
    const results = axios.post(
        `${BASE_URL}/games/add-point-to-result/${gameId}`,
        {},
        {
            headers :{
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            }

        }

    )
    return results
}

export const addOneNumberToCurrentQuestion = async(gameId) => {   
    
    const results = axios.post(
        `${BASE_URL}/games/add-to-current-question/${gameId}`,
        {},
        {
            headers :{
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            }

        }

    )
    return results
}



export const updateGameResultAndCQuestion = async (gameId, increase = false)=>{
        if(increase){
            await addOneNumberToCurrentQuestion(gameId)
            await addOnePointToResult(gameId)
        }else{
            await addOneNumberToCurrentQuestion(gameId)

        }
}

export const getPoints = async (email)=>{
    var results = await axios.get(
        `${BASE_URL}/games/points/${email}`,
        {},
        {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
        }
      )
  
  
      return results.data
  

}


export const getTop10 = async ()=>{
    var results = await axios.get(
        `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Games')/items`,
        {},
        {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
        }
      )

      var allResults = {}
      var finalResults = {}
      const items = results.data.value

      items.reduce((accumulator, { Title, Email, Result }) => {
        if(allResults[Email] === undefined){
            allResults[Email] = {}
        }

        if(allResults[Email]["Result"] === undefined){
            allResults[Email]["Result"] = 0
        }

        allResults = {
            ...allResults,
            [Email] : {
                Name: Title,
                Email: Email,
                Result: Result + allResults[Email].Result
            }
        }
        
        return 0
      }, 0)
      
      const sorted = []
      Object.entries(allResults).forEach(([key, value]) => {
        sorted.push([value.Email, value.Name, value.Result])
      });


      sorted.sort(function(a, b) {
        return b[2] - a[2];
      });  
  
      return sorted
}