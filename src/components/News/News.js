import React from 'react'
import styles from './News.module.css'
import Approved from './assests/approved.svg'
import Declined from './assests/Vector.svg'
import {useSelector, useDispatch} from "react-redux"
import {approveNews, deleteNews} from '../../actions/news'
import WaitingIcon from './assests/waiting.svg'

const News = ({Image, Title, Description, Date, approved, id}) => {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const ApproveNews = () => {
        dispatch(approveNews(user, id))
    }

    const DeclineNews = () => {
        dispatch(deleteNews(user, id))
    }   

    return( 
        <li className={styles.News_Item}>
            <img src={Image} className={styles.Item_Img} alt="item"  />
            
            <div className={styles.Item_Data}>
                <h3 className={styles.Item_Title}>{Title}</h3>
                <p className={styles.Item_Description}>{Description}</p>
            </div>

            <div className={styles.ControlsWrapper}>
            {!approved && user && user.role === "user" ? <div className={styles.News_Status_Feedback}><img className={styles.News_Status_Feedback_Icon} alt="waiting" src={WaitingIcon} />
                <span className={styles.News_Status_Feedback_Title}>Ваша новость в процессе одобрения</span>
            </div> : ""}

                {!approved && user && user.role === "admin" ?   
                    <div className={styles.Controls}>
                        <button onClick={ApproveNews} className={styles.NewsControl_Approved}><img src={Approved} alt="approve"/></button>
                        <button onClick={DeclineNews} className={styles.NewsControl_Declined}><img src={Declined} alt="decline"/></button>
                    </div>
                : ""}

                <span className={styles.Item_Date}>{Date}</span>
            </div> 
        </li>
    )
}

export default News