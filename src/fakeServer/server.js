import Users from "./users"
import News from './news'

class UserApi{
    login({username, password}){
        return new Promise( (resolve, reject) => {
            const user = Users.find((i) => {
                return JSON.stringify(i.username) === JSON.stringify(username) && JSON.stringify(i.password) === JSON.stringify(password)
            })

            if(user){
                return setTimeout(() => {
                    return resolve(user)
                }, 200);
            }

            return reject({
                msg: "No user found"
            })
        })
    }
}



 class NewsApi{
    constructor(){
        this.News = this.getNewsFromLocalStorage()
    }
    getNewsFromLocalStorage = () => {
        if(JSON.parse(localStorage.getItem('news'))){
            return JSON.parse(localStorage.getItem('news')) 
        }else{
            localStorage.setItem('news', JSON.stringify(News))
            return News
        }
    }   
    
    newsByUser(user){
        if(!user){
            const guestNews = this.News.filter((i) => {
                return i.approved === true
            })
            return guestNews.reverse()
        }

        if(user.role === "admin"){
            const adminNews = [...this.News]
            return adminNews.reverse()
        }else if(user.role === "user"){
            const userNews = this.News.filter((i) => i.approved === true || i.creatorid === user.id )
            return userNews.reverse()
        }   
    }
    
    getNews(user){
        return new Promise( (resolve,reject) => {
            if(this.News) {
                resolve(this.newsByUser(user))
            }else{
                reject({
                    msg:"A error ocurred"
                })
            }
        })
    }

    createNews(user, {title, description, image}){
        const max = Math.max(...this.News.map(i => i.id))
        const date = new Date()

        const dateDay = date.getDay().toString().length <= 1 ? "0" + date.getDay(): date.getDay()
        const dateMonth = date.getMonth().toString().length <= 1 ? "0" + date.getMonth(): date.getMonth()

        return new Promise((resolve, reject) => {
            if(user){
                console.log(title)
                const NewsItem = {
                    id:max + 1,
                    title,
                    description: description.length > 156 ?  description.slice(0, 156) + "..." : description,
                    image,
                    creatorid: user.id,
                    date:`${dateDay}.${dateMonth}.${date.getFullYear()}`,    
                    approved : user.role === "admin" ? true : false,
                }
                this.News.push(NewsItem)
                if(JSON.parse(localStorage.getItem('news'))){
                    localStorage.setItem('news', JSON.stringify([...JSON.parse(localStorage.getItem('news')), NewsItem]) )
                }
                resolve(this.newsByUser(user))

            }
            reject()
        })
    }

    approveNews(user, newsId){
        return new Promise( (resolve, reject) => {
            if(user && user.role === "admin"){
                this.News.map( (i) =>{
                    if(i.id === newsId){
                        return i.approved = true
                    }
                    return i
                })
                if(JSON.parse(localStorage.getItem('news'))){
                    localStorage.setItem('news', JSON.stringify([...this.News]) )
                }
                resolve(this.newsByUser(user))
            }
        })
    }
    deleteNews(user, newsId){
        return new Promise( (resolve, reject) => {
            if(user && user.role === "admin"){
                this.News = this.News.filter( (i) => {
                    return +i.id !== +newsId
                })
                if(JSON.parse(localStorage.getItem('news'))){
                    localStorage.setItem('news', JSON.stringify([...this.News]) )
                }

                resolve(this.newsByUser(user))
            }
        })
    } 
    
    searchNews(user, text){
        const newsByUser = this.newsByUser(user)
        return new Promise( (resolve,reject) => {
            const searched = newsByUser.filter((i) => i.title.toLowerCase().indexOf(text.toLowerCase()) !== -1  )
            resolve(searched)
        })
    }
}


export const newsApi = new NewsApi()
export const userApi = new UserApi()
