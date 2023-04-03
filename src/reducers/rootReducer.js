const ACTION_UPDATE_ACCESS_TOKEN = "ACTION_UPDATE_ACCESS_TOKEN"
const initialState = {
    accessToken : ""
}

const rootReducer  = (state = initialState, action)=>{
    if(action.type === ACTION_UPDATE_ACCESS_TOKEN) {
        return {
            ...state,
            accessToken: action.accessToken
        }
    }
    return state;
}


export default rootReducer;
