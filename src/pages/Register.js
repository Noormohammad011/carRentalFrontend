import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from './../actions/userActions'
import Message from './../components/Message'
import Loader from './../components/Loader'
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const location = useLocation()
  let navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location?.state?.from || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <>
      <div className='container mx-auto'>
        <div className='col text-center'>
          <h1>Registration</h1>
        </div>
        {message && <Message>{message}</Message>}
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-md-6 offset-md-3'>
            <label htmlFor='inputEmail456' className='form-label'>
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='form-control'
              id='inputEmail456'
            />
          </div>
          <div className='col-md-6 offset-md-3'>
            <label htmlFor='inputEmail4' className='form-label'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className='form-control'
              id='inputEmail4'
            />
          </div>
          <div className='col-md-6 offset-md-3'>
            <label htmlFor='inputPassword4' className='form-label'>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
              id='inputPassword4'
            />
          </div>
          <div className='col-md-6 offset-md-3'>
            <label htmlFor='inputPassword47' className='form-label'>
              Confrim Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              className='form-control'
              id='inputPassword47'
            />
          </div>
          <div className='col-md-6 offset-md-3'>
            <p className='my-2'>
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </p>
          </div>

          <div className='col-md-6 offset-md-3'>
            <button
              disabled={!name || !password || !email || !confirmPassword}
              type='submit'
              className='btn btn-primary'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
