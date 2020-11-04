import {
    GET_NEWS,
    GET_NEWS_ERROR,
    LOADING_NEWS
} from '../types'
  
  const initialState = {
    loading:false,
    data:null,
    error:{
        news:null
    }
  }
  
  export default function newsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_NEWS : 
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        case GET_NEWS_ERROR : 
        return{
            ...state,
            loading:false,
            error:{
                ...state.error,
                news:action.payload
            }
        }
        case LOADING_NEWS: 
            return{
                loading:true
            }
      default:
        return state
    }
  }