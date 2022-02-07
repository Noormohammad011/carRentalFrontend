import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserEdit = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userList')
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, id, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }
  return (
    <>
      <div className='container'>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
          Go Back
        </Link>
      </div>

      <div className='container mx-auto'>
        <h1 className='text-center text-uppercase'>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form className='row g-3' onSubmit={submitHandler}>
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

            <div className='form-check col-md-6 offset-md-3'>
              <input
                className='form-check-input'
                type='checkbox'
                id='defaultCheck1'
                checked={!!isAdmin}
                onChange={(e) => setIsAdmin(!!e.target.value)}
              />
              <label className='form-check-label' htmlFor='defaultCheck1'>
                Is Admin
              </label>
            </div>

            <div className='col-md-6 offset-md-3'>
              <button type='submit' className='btn btn-primary'>
                Update
              </button>
            </div>
          </form>
        )}
      </div>
      {/* <div className='container mx-auto'>
        <div className='col text-center'>
          <h1>Edit User</h1>
        </div>
        {message && <Message>{message}</Message>}
        {error && <Message>{error.error}</Message>}
        {loading && <Loader />}
        <form className='row g-3' onSubmit={submitHandler}>
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
      </div> */}
    </>
  )
}

export default UserEdit
