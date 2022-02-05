import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { carDetailsReducer, carListReducer } from './reducers/carReducers'
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  carList: carListReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  carDetails: carDetailsReducer,
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
