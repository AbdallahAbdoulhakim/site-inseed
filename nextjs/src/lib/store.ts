import { configureStore } from '@reduxjs/toolkit'
import publicationFilterReducer from '@/lib/features/publication/publicationFilterSlice'
import publicationMobileReducer from '@/lib/features/publication/publicationMobileSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      publicationFilter:publicationFilterReducer,
      publicationMobile:publicationMobileReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']