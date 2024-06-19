import Header from '../../header/Header'
import AuthForm from '../AuthForm'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (data) => {
    setError('');
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json);
      } else {
        sessionStorage.setItem('user', JSON.stringify(json));
        navigate('/');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <h1>Login</h1>
      {error ? <div className="alert alert-warning">{error}</div> : <></>}
      <AuthForm submitCallback={submit}/>
    </div>
  )
}