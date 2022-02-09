import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  carCreateReducer,
  carDeleteReducer,
  carDetailsReducer,
  carListReducer,
  carUpdateReducer,
} from './reducers/carReducers'
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userDeleteReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
  userListReducer,
} from './reducers/userReducers'
import {
  bookingDetailsReducer,
  getbookingsReducer,
} from './reducers/bookingReducers'
import { alertsReducer } from './reducers/alertsReducer'

const reducer = combineReducers({
  carList: carListReducer,
  carDetails: carDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  getBookings: getbookingsReducer,
  carCreate: carCreateReducer,
  carUpdate: carUpdateReducer,
  carDelete: carDeleteReducer,
  alertsReducer: alertsReducer,
  bookingDetails: bookingDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
