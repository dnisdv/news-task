import React,{useState} from 'react'
import styles from './Auth.module.css'
import Modal from '../Modal/Modal'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../../actions/user'

const Auth = ({open, setModal}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [form, setFormData] = useState({
        username:"",
        password:"",
        isError:{
            username:"",
            password:""
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (formValid(form)) {
            dispatch(loginUser(form, () => {
                closeModal()
            }))
        }
    }

    const closeModal = () => {
        setModal(false)
    }

     const FormChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = form.isError;
        switch (name) {
            case "username":
                if(value.length === 0){
                    isError.username = "Это поле обязательное"
                }else{
                    isError.username = ""
                }
                break;
            case "password":
                if(value.length === 0){
                    isError.password = "Это поле обязательное"
                }else{
                    isError.password = ""
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

    const formValid = ({ isError, username, password }) => {
        if(username.length === 0) {
            isError.username="Это поле обязательное"
        }
        if(password.length === 0) {
            isError.password="Это поле обязательное"
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
            <div className={styles.Auth}>
                <Modal open={open} closeModal={closeModal} className={styles.Modal}>
                    <div>
                        <h2 className={styles.Auth_Title}>Авторизация</h2>
                            {user.error && user.error.login ? <span className={styles.Feedback}>{user.error.login.msg}</span> : "" }

                        <form className={styles.Auth_Form} onSubmit={onSubmit}>
                            <div className={styles.Input_Wrapper}>
                                <label className={styles.FormLabel} htmlFor="authLogin">Логин</label>
                                <input name="username" value={form.username} onChange={FormChange} className={styles.Form_Input} id="authLogin" type="text" />
                                {form.isError.username ? <span className={styles.FormError_Feedback}>{form.isError.username}</span> : ""}
                            </div>
    
                            <div className={styles.Input_Wrapper}>
                                <label className={styles.FormLabel} htmlFor="authPass">Пароль</label>
                                <input name="password" value={form.password} onChange={FormChange} className={styles.Form_Input} id="authPass" type="password" />
                                {form.isError.password ? <span className={styles.FormError_Feedback} >{form.isError.password}</span> : ""}

                            </div>
                            
                            <button className={styles.AuthButton} type='submit'>Войти</button>
                        </form>
                    </div>
                </Modal>
                
            </div>
        )
}

export default Auth