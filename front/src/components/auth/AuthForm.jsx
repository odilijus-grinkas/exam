import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AuthForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const location = useLocation();


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    // add username to data if on login page
    if (location.pathname === '/register') {
      data.username = username;
    }

    props.submitCallback(data);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      {location.pathname === '/register' ? 
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input 
          type="text" 
          className="form-control" 
          id="username" 
          aria-describedby="emailHelp" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div> : <></>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          aria-describedby="emailHelp" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
  )
}