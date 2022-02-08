import React, { useState, useEffect } from 'react'
import { login } from '../actions/userActions'
import { useLocation, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const location = useLocation()
  let navigate = useNavigate()

  const redirect = location?.state?.from || '/'
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <>
      <div className='container mx-auto'>
        <div className='col text-center'>
          <h1>Login</h1>
        </div>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-md-6 offset-md-3'>
            <label for='inputEmail4' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='inputEmail4'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='col-md-6 offset-md-3'>
            <label for='inputPassword4' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword4'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='col-md-6 offset-md-3'>
            <p className='my-2'>
              New User ?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </p>
          </div>

          <div className='col-md-6 offset-md-3'>
            <button
              disabled={!password || !email}
              type='submit'
              className='btn btn-primary'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
