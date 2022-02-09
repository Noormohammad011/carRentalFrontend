import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from './../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const TopNavbar = () => {
  const dispatch = useDispatch()
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout())
  }
 
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark shadow-md'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <i className='fas fa-car fa-2x'></i>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0 text-center'>
            <li className='nav-item'>
              <Link
                to='/contact'
                type='button'
                className='btn btn-outline-info text-center'
              >
               Contact
              </Link>
            </li>
            {userInfo ? (
              <>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {userInfo.name}
                  </a>
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <li className='nav-item'>
                      <Link
                        to='/profile'
                        type='button'
                        data-mdb-ripple='true'
                        className='btn btn-outline-primary dropdown-item text-center'
                      >
                        Profile
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <button
                        type='button'
                        data-mdb-ripple='true'
                        className='btn btn-outline-danger dropdown-item text-center'
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link
                    to='register'
                    className='nav-link active'
                    aria-current='page'
                  >
                    Register
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='login' className='nav-link'>
                    Login
                  </Link>
                </li>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className='nav-item dropdown mx-2'>
                <a
                  className='nav-link dropdown-toggle'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Admin
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li className='nav-item'>
                    <Link
                      to='/admin/userlist'
                      type='button'
                      data-mdb-ripple='true'
                      className='btn btn-outline-primary dropdown-item text-center'
                    >
                      User List
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/admin/carlist'
                      type='button'
                      data-mdb-ripple='true'
                      className='btn btn-outline-primary dropdown-item text-center'
                    >
                      Car List
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/admin/bokingList'
                      type='button'
                      data-mdb-ripple='true'
                      className='btn btn-outline-primary dropdown-item text-center'
                    >
                      Booking List
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar
