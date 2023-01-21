import { configureStore } from '@reduxjs/toolkit'
import emailSlice from './features/emailSlice'

const store = configureStore({
  reducer: {
    emails: emailSlice,
  },
})

export default store
