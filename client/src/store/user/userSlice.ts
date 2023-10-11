import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store.ts'
import { IUser } from '../../types/types.ts'

interface UserState {
	user: IUser | null
	isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logOut: state => {
			state.isAuth = false
			state.user = null
		},
	},
})

export const { login, logOut } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
