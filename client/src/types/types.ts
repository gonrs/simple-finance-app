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
export interface ICategory {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	transactions?: []
}
export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpanse: number
}

export interface ITransaction {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	amount: number
	type: string
	category: ICategory
}
