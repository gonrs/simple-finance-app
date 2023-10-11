export interface IUser {
	id: number
	email: string
	token: string
}
export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser {
	email: string
	password: string
	createdAt: string
	updatedAt: string
	id: number
}

export interface IResponceUserData {
	token: string
	user: IResponseUser
}
