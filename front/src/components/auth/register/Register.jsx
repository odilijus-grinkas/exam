import Header from '../../header/Header'
import AuthForm from '../AuthForm'
import { useState } from 'react';
export default function Register() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (data) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const json = await response.json();
        setError(json);
      } else {
        setSuccess('User registered successfully, please log in.');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <h1>Register</h1>
      {error ? <div className="alert alert-warning">{error}</div> : <></>}
      {success ? <div className="alert alert-success">{success}</div> : <></>}
      <AuthForm submitCallback={submit}/>
    </div>
  )
}