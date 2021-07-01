import '../stylesheets/Login.css';
import { useState } from 'react';
const URL = 'https://arctic-eh-68834.herokuapp.com';

function Login(props) {

  const [message, setMessage] = useState(null);

  const login = (e) => {
    e.preventDefault();
    fetch(`${URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      res.json().then((res) => {
        // If login didn't work...
        if (res.message) {
          setMessage(res.message);
          // If login did work...
        } else {
          // Remove login module
          props.setDisplayLogin(false);
          // Save token in local storage for insertion into header
          localStorage.setItem('userID', res.user._id);
          localStorage.setItem('token', res.token);
          // Tell App that logged in
          props.setLoggedIn(true);
        };
      });
    });
  };

  return (
    <div className='login-modal'>
      <button onClick={props.displayLoginModal} className='close-btn'>×</button>
      {message && <p>{message}</p>}
      <form onSubmit={login}>
        <input id='username' name='username' type='text' placeholder='username' />
        <input id='password' name='password' type='password' placeholder='password' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Login;
