import React, {useState, useEffect} from 'react'
import styles from './Search.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {searchNews,getNews} from '../../actions/news'

const Search = () => {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    
    useEffect(() => {
        if(value.length === 0){
            dispatch(getNews(user))
        }
    }, [value, dispatch, user])

    const onChange = (e) => {
        setValue(e.target.value)
        dispatch(searchNews(user, e.target.value))
    }
    const clearValue = () => {
        setValue("")
        dispatch(getNews(user))
    }

    return(
        <div className={styles.Search}>
            <form className={styles.SearchForm}>    
                <div className={styles.Input_Wrapper}>
                    {value.length >= 1 ? <div onClick={clearValue} className={styles.SearchLabel}></div> : ""}
                    <input value={value} id="SearchId" onChange={onChange} type='text' placeholder="Поиск" className={styles.SearchInput} />
                </div>
            </form>
        </div>
    )
}

export default Search