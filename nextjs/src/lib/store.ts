import { configureStore } from '@reduxjs/toolkit'
import publicationFilterReducer from '@/lib/features/publicationFilter/publicationFilterSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      publicationFilter:publicationFilterReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']