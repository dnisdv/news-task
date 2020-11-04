import {LOGIN_USER, LOGIN_USER_ERROR, CLEAR_USER_ERROR, LOGOUT_USER} from '../types'
import {userApi} from '../fakeServer/server'

export const loginUser = ({username,password}, cb) => (dispatch) =>{
    return userApi.login({username, password}).then( (res) => {
        cb()
        dispatch({
            type:LOGIN_USER,
            payload:res
        })
        return dispatch({
            type: CLEAR_USER_ERROR
        })
    })
    .catch( (error) => {
        return dispatch({
            type:LOGIN_USER_ERROR,
            payload:error
        })
    })
}

export const logoutUser = () => (dispatch) =>{
    return dispatch({
        type:LOGOUT_USER
    })
}