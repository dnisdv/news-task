import React,{useState} from 'react'
import Modal from '../Modal/Modal'
import styles from './NewsCreate.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {createNews} from '../../actions/news'
import PlusIcon from './assests/Plus.svg'

const NewsCreate = ({className}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    
    const [modal, setmodal] = useState(false)
    const [form, setFormData] = useState({
        image:"https://cdn11.bigcommerce.com/s-whhy1apb80/stencil/693c1f50-791c-0138-0971-0242ac110008/icons/icon-no-image.svg",
        title:"",
        description:"",
        isError:{
            title:"",
            description:""
        }
    })

    const selectImage = () => {
        let url = prompt('Image URL', "https://cdn11.bigcommerce.com/s-whhy1apb80/stencil/693c1f50-791c-0138-0971-0242ac110008/icons/icon-no-image.svg");
        if(url){
            setFormData({...form, image: url})
        }
    }
    const openModel = () => {
        setmodal(true)
    }
    const closeModal = () =>{
        setmodal(false)

        setFormData({
            image:"https://cdn11.bigcommerce.com/s-whhy1apb80/stencil/693c1f50-791c-0138-0971-0242ac110008/icons/icon-no-image.svg",
            title:"",
            description:"",
            isError:{
                title:"",
                description:""
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (formValid(form)) {
            dispatch(createNews(user, form, () => {
                closeModal()
            }))
        }
    }

    const changeInput = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = form.isError;
        switch (name) {
            case "title":
                if(value.length === 0){
                    isError.title = "Это поле обязательное"
                }else{  
                    isError.title = ""
                }
                break;
            case "description":
                if(value.length === 0){
                    isError.description = "Это поле обязательное"
                }else{
                    isError.description = ""
                }
                break;
            default:
                break;
        }
        setFormData({
            ...form,
            isError,
            [name]:  value
        })
    }


    const formValid = ({ isError, title, description }) => {
        if(title.length === 0) {
            isError.title="Это поле обязательное"
        }
        if(description.length === 0) {
            isError.description="Это поле обязательное"
        }
        setFormData({
            ...form,
            isError: isError
        })
    
        let isValid = true;
        Object.values(isError).forEach(val => {
            if (val.length > 0) {
                isValid = false
            }
        });
        return isValid;
    };

return(
    <div className={className || styles.NewsCreate_Wrapper}>
        <button onClick={openModel} className={styles.NewsCreate_Button}><img  alt="add" src={PlusIcon} /></button>
        <Modal open={modal} closeModal={closeModal} className={styles.NewsCreate_Modal}>
            <h1 className={styles.NewsCreate_Title}>Добавить новость</h1>
            <span className={styles.NewsCreate_Decription}>Заполните шаблон для добавления</span>
            <form className={styles.NewsTemplate} >
                
                <div onClick={selectImage} className={styles.NewsTemplate_Img} >
                    {form.image ? <img className={styles.NewsTemplate_Img_Wrapper} src={form.image}  alt="template"/> : "" }
                </div>

                <div className={styles.NewsTemplate_Data}>
                    <div className={styles.NewsTemplate_Item}>  
                        <label htmlFor="templatetitle" className={styles.Item_Label} >Заголовок</label>
                        <input onChange={changeInput} name="title" id="templatetitle" type="text" className={styles.Item_Input_Title} placeholder='В Индии врач купил у мошенников "лампу Алладина" за $90 тысяч' />
                        {form.isError.title ? <span className={styles.NewsTemplate_Item_Feedback}>{form.isError.title}</span> : "" }
                    </div>

                    <div className={styles.NewsTemplate_Item}>
                        <label htmlFor="templatedescr" className={styles.Item_Label} >Описание</label>
                        <textarea onChange={changeInput} name="description" id="templatedescr" type="text" className={styles.Item_Input_Description} placeholder="В Индии арестовали двоих подозреваемых в мошенничестве, которые продали «лампу Алладина» и даже показали покупателю «джина»." />
                        {form.isError.description ? <span className={styles.NewsTemplate_Item_Feedback}>{form.isError.description}</span> : "" }
                    </div>
                </div>
            </form>
            <button onClick={onSubmit} className={styles.NewsButton} type="submit">Отправить</button>
        </Modal>
    </div>
    )
}

export default NewsCreate