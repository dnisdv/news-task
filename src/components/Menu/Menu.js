import React,{useState} from 'react'
import styles from "./Menu.module.css";
import Auth from '../Auth/Auth'

import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {logoutUser} from '../../actions/user'
 
const Menu = () => {
    const {user, authenticated} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [modal, setmodal] = useState(false)

    const openModal = (e) => {
        e.preventDefault()
        setmodal(true)
    }

    const LogoutUser = () => {
        dispatch(logoutUser())
    }

    return(
        <div className={styles.Menu}>
            <ul className={styles.Menu_List}>
                <li className={styles.List_Item}>
                    <Link to="/" className={styles.Item_Title}>Главная</Link>
                </li>
                <li className={styles.List_Item}>
                    <Link to="/news" className={styles.Item_Title}>Новости</Link>
                </li>
                <li className={styles.List_Item}>
                    {authenticated && user ?  <span onClick={LogoutUser} href="#" className={styles.Item_Title}>Выход</span>
                    : <span onClick={openModal} href="#" className={styles.Item_Title}>Вход</span>
                }
                </li>
            </ul>
            <Auth open={modal} setModal={setmodal} />
        </div>
    )
}

export default Menu