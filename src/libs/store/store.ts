import { configureStore } from '@reduxjs/toolkit'
import { meSlice } from './slices'

export const makeStore = () => {
  return configureStore({
    reducer: {
      me: meSlice.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']