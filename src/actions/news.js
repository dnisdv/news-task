import {newsApi} from '../fakeServer/server'
import {
    GET_NEWS,
    GET_NEWS_ERROR,
    CREATE_NEWS,
    CREATE_NEWS_ERROR
} from '../types'


export const getNews = (user) => (dispatch) => {
    newsApi.getNews(user).then( (res) => {
        dispatch({
            type:GET_NEWS,
            payload:res
        })
    }).catch( (err) => {
        dispatch({
            type:GET_NEWS_ERROR,
            pauload:err
        })
    })
}

export const createNews = (user,data, cb) => (dispatch) => {
        newsApi.createNews(user, data).then( (res) =>{
            console.log(res)
            dispatch({
                type:CREATE_NEWS,
            })
            dispatch({
                type:GET_NEWS,
                payload:res
            })
            cb()
        })
        .catch((e) => {
            console.log(e)
            dispatch({
                type:CREATE_NEWS_ERROR
            })
        })
}

export const approveNews = (user, newsId) => (dispatch) => {
    newsApi.approveNews(user, newsId).then((res) => {
        dispatch({
            type:GET_NEWS,
            payload:res
        })
    })
}

export const deleteNews = (user, newsId) => (dispatch) => {
    newsApi.deleteNews(user, newsId).then((res) => {
        dispatch({
            type:GET_NEWS,
            payload:res
        })
    })
}

export const searchNews = (user, text) => (dispatch) => {
    newsApi.searchNews(user, text).then((res) => {
        return dispatch({
            type:GET_NEWS,
            payload:res
        })
    })
    .catch( (e) => {
        return dispatch({
            type:GET_NEWS_ERROR,
            payload:e
        })
    })
}