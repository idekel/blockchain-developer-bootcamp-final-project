import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from './web3Slice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
      web3: web3Reducer,
      app: appReducer,
  },
})