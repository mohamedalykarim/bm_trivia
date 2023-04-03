export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
export const calculateResult = (obj)=>{
  var result = 0;
  Object.keys(obj).forEach(key => {
    if (obj[key] === true) {
      result = result + 1;
    }
  });

  return result
  
}

export const getZeroAtStart = (integer)=>{
  switch(integer){
    case 9: return "09"
    case 8: return "08"
    case 7: return "07"
    case 6: return "06"
    case 5: return "05"
    case 4: return "04"
    case 3: return "03"
    case 2: return "02"
    case 1: return "01"
    case 0: return "00"
    default: return integer
  }
}

export const getRemainingTime = (startTime)=>{
  const currentTime = new Date().getTime()
  console.log("currentTime", currentTime);
  console.log("startTime", startTime);
  const passTime = (currentTime - startTime) /1000/60
  console.log("passTime", passTime);

  return Math.round(10 - passTime)
 
}