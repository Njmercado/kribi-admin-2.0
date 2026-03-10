import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/models'

export interface MeState {
  id: number | null
  email: string | null
  username: string | null
  role: string | null
  entitlements: string[]
  isActive: boolean | null
  fullName: string | null
}

const initialState: MeState = {
  id: null,
  email: null,
  username: null,
  role: null,
  entitlements: [],
  isActive: null,
  fullName: null,
}

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<AuthResponse>) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.username = action.payload.username
      state.role = action.payload.role
      state.entitlements = action.payload.entitlements
      state.isActive = action.payload.is_active
      state.fullName = action.payload.full_name
    },
    clearMe: (state) => {
      state.id = null
      state.email = null
      state.username = null
      state.role = null
      state.entitlements = []
      state.isActive = null
      state.fullName = null
    },
  },
})

export const { setMe, clearMe } = meSlice.actions

export default meSlice.reducer