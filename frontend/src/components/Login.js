import { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);    
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
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
          className="login__button">Войти
        </button>
      </form>
    </div>
  )
}

export default Login;