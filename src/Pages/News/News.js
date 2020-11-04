import React,{useEffect} from 'react'
import styles from './News.module.css'
import Search from '../../components/Search/Search'
import News from '../../components/News/News'
import {useDispatch, useSelector} from 'react-redux'
import {getNews} from '../../actions/news'
import NewsCreate from '../../components/NewsCreate/NewsCreate'

const NewsPage = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => state.news)
    const {user, authenticated} = useSelector(state => state.user)


    useEffect(() => {
        dispatch(getNews(user))
    }, [user, dispatch])

    return(
        <div className={styles.NewsPage}>
            <div className={styles.NewsPage_Data}>
                <h1 className={styles.NewsPage_Title}>Наши <span className={styles.NewsPage_Title_purple}>Новости.</span></h1>
                <div className={styles.Search_Wrapper}>
                    <Search />
                    {authenticated && user ? <NewsCreate className={styles.NewsCreate} /> : "" }
                </div>
            </div>

            <ul className={styles.News_List}>
                {!news.loading && news.data ? news.data.map((i) => (
                    <News 
                        key={i.id   }
                        id={i.id}
                        Image={i.image}
                        Title={i.title}
                        Description={i.description}
                        Date={i.date}
                        approved={i.approved}
                    />
                ) ): ""}
            </ul>
        </div>
    )
}

export default NewsPage