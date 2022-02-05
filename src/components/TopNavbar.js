import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from './../actions/userActions';
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
    <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-md'>
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
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {userInfo ? (
              <>
                <li className='nav-item'>
                  <button
                    type='button'
                    data-mdb-ripple='true'
                    className='btn btn-outline-danger'
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
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

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Dropdown
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <a className='dropdown-item' href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link disabled'
                href='#'
                tabindex='-1'
                aria-disabled='true'
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar
