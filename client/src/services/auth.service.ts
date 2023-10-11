import { instance } from '../api/axios.api'
import { IResponceUserData, IUser, IUserData } from '../types/types'

export const AuthService = {
	async register(userData: IUserData): Promise<IResponceUserData | undefined> {
		const { data } = await instance.post<
			IUserData,
			{ data: IResponceUserData }
		>('/user', userData)
		return data
	},
	async login(userData: IUserData): Promise<IUser | undefined> {
		const { data } = await instance.post<IUser>('auth/login', userData)
		return data
	},
	async getMe(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile')
		if (data) return data
	},
}
