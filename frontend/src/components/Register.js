import { useState} from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input 
          className="login__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={handleEmailChange}
          required
        />
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handlePasswordChange}
          required        
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="login__button">Зарегистрироваться
        </button>        
      </form>
      <p className="login__text">Уже зарегистрированы?
        <Link to="/signin" className="login__link">Войти</Link>
      </p>      
    </div>
  )
}
export default Register;