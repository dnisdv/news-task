import {
    LOGIN_USER,
    LOGIN_USER_ERROR,
    CLEAR_USER_ERROR,
    LOGOUT_USER
} from '../types'
  
  const initialState = {
    authenticated: false,
    loading: false,
    user: null,
    error:{
      login:null,
    },
  }
  
  export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER : 
            return{
                ...state,
                user: action.payload,
                authenticated:true,
            }
        case LOGIN_USER_ERROR : 
        return{
            ...state,
            error:{
                ...state.error,
                login:action.payload
            }
        }
        case CLEAR_USER_ERROR :
            return{
                ...state,
                error:{
                    login:null
                }
            }
        case LOGOUT_USER : 
            return{
                ...state,
                authenticated:false,
                user:null
            }
      default:
        return state
    }
  }