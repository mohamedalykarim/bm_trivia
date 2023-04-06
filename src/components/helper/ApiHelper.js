import axios from "axios";

export const fetchProviousGame = async(startDayTimeInMillisecond, endDayTimeInMillisecond, email) => {
    const results = await axios.get(
      `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Games')/items?$filter=((Email eq '${email}') and (Type eq 'SOLO') and (StartTime ge ${startDayTimeInMillisecond}) and (StartTime le ${endDayTimeInMillisecond}))`,
      {},
      {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
      }
    )

    return results.data.value
}

export const getTheGame = async(gameId) => {
    const results = await axios.get(
      `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Games')/items(${gameId})`,
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
        `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Questions')/items`,
        {},
        {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
        }

    )
    
    return(results.data.value)

}

export const insertTheGame = async(data) => {    

    data = {
        ...data,
        __metadata: {
            type: "SP.Data.BM_x005f_Trivia_x005f_GamesListItem"
        }
    }

    const results = await axios.post(
        `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Games')/items`,
        data,
        {
            headers : {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            }
        }

    )

    return results.data.d
}

export const updateTheGame = async(gameId, data) => {   
    
    data = {
        ...data,
        "__metadata": {
            "type": "SP.Data.BM_x005f_Trivia_x005f_GamesListItem"
        }
    }
    const results = axios.post(
        `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Games')/items(${gameId})`,
        data,
        {
            headers :{
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'If-Match': "*",
                'X-HTTP-Method': "MERGE"
            }

        }

    )
    return results
}

export const updateGameResultAndCQuestion = async (gameId, currentQuestionNumber, increase = false)=>{
        if(increase){
            const theGame = await getTheGame(gameId)

            const updateResultData = {
                CurrentQuestionNumber : currentQuestionNumber +1,
                Result : theGame.Result + 1
            }

            console.log(updateResultData);


            const updateResult = updateTheGame(gameId, updateResultData)


        }else{
            const updateResultData = {
                CurrentQuestionNumber : currentQuestionNumber +1,
            }

            const updateResult = updateTheGame(gameId, updateResultData)
        }
}

export const getPoints = async (email)=>{
    var results = await axios.get(
        `/sites/CultureCoreChampions/_api/lists/GetByTitle('BM_Trivia_Games')/items?$filter=(Email eq '${email}')`,
        {},
        {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
        }
      )

      var total = 0
      const items = results.data.value

      items.forEach(result => {
        total = total + result.Result
      });
  
      return total
  

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

      var allResults = []
      var finalResults = {}
      const items = results.data.value

      items.reduce((accumulator, { Email, Result }) => {
        if(allResults[Email] === undefined || allResults[Email] === null){
            allResults[Email] = []
        }
        allResults[Email].push(Result)
        return Email
      }, 0)


      
      Object.entries(allResults).forEach(([key, value]) => {
        const sum = value.reduce((partialSum, a) => partialSum + a, 0);
        finalResults = {
            email : key,
            result : sum
        }
      });      

      console.log(finalResults);
  
      return allResults
}