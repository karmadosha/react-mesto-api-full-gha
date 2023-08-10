import React from 'react';
import loginSucceed from '../images/login-succeed.svg';
import loginFailed from '../images/login-failed.svg';

function InfoTooltip({isOpen, onClose, isSuccess}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_type_tooltip">
        <img src={isSuccess ? loginSucceed : loginFailed}
           className="popup__tooltip-image"
           alt={isSuccess ? 'Успешная регистрация' : 'Что-то пошло не так'} />
        <h2 className="popup__tooltip-text">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button className="popup__close-btn" type="button" onClick={onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip;