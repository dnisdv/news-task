import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = styles.Modal_Background;
  }

  closeModalOnClick = (e) => {
    this.props.closeModal()
  }
  
  closeModalEvent = (e) => {
    if(e.target.className === styles.Modal_Background || e.target.className === styles.Modal_CloseIcon){
      this.props.closeModal()
    }
  }

  render() {
    return(this.props.open ? ReactDOM.createPortal(
      <div onClick={this.closeModalEvent} className={styles.Modal_Background}><div className={ this.props.className || styles.Modal} >
        <><div onClick={this.closeModalEvent} className={styles.Modal_CloseIcon}></div>{this.props.children}</></div></div>,
        modalRoot
    ): null)  
  }
}


export default Modal