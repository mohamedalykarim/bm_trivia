const ACTION_UPDATE_ACCESS_TOKEN = "ACTION_UPDATE_ACCESS_TOKEN"
const ACTION_UPDATE_NAME = "ACTION_UPDATE_NAME"
const ACTION_UPDATE_EMAIL = "ACTION_UPDATE_EMAIL"

const initialState = {
    accessToken : "",
    email: "test",
    name: "test"
}

const rootReducer  = (state = initialState, action)=>{
    switch(action.type){
        case ACTION_UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
            break;
        
        case ACTION_UPDATE_NAME:
            return {
                ...state,
                name: action.payload.name
            }
            break;

        case ACTION_UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload.email
            }
            break;

        default:
            return state;
            break;
    }
}


export default rootReducer;
