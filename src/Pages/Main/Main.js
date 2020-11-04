import React from 'react'
import styles from './Main.module.css'
import { useSelector } from "react-redux"

const MainPage = () => {
    const {user} = useSelector(state => state.user)
    return(
        <div className={styles.Main}>
            <h1 className={styles.Title}>Привет, <span className={styles.User}>{user && user ? user.username : "Гость"}.</span>
            </h1>
        </div>
    )
}

export default MainPage