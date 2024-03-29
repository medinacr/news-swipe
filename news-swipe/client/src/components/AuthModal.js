import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import{ useCookie, useCookies } from 'react-cookie'

const AuthModal = ( {setShowModal, isSignUp} ) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let navigate = useNavigate()
  
  console.log(email, password, confirmPassword)

  const handleClick = () => {
    
    setShowModal(false)
  }

  const handleSubmit = async (e) => {
    console.log('click')
    e.preventDefault()
    try{
      if( isSignUp && (password !== confirmPassword)) {
        setError('Passwords need to match!')
        return
      }

      const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, {email, password}, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });


      setCookie('AuthToken', response.data.token)
      setCookie('UserId', response.data.userId)

      const success = response.status === 201 

      if(success && isSignUp) navigate('/signup')
      if(success && !isSignUp) navigate('/dashboard')

      window.location.reload()
      
    } catch (error) {
      console.log(error)
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }

  return (
    <div className="auth__modal">
      <div className="close__icon" onClick={handleClick}>⊗</div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && <input
          type="password"
          id="password-check"
          name="password-check"
          placeholder="confirm password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />}
        <input className="secondary__button" type="submit" />
        <p>{error}</p>
      </form>
      <hr/>
      <h2>GET THE APP</h2>
    </div>
  )
}

export default AuthModal