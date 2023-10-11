import React, { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localStorge.helper'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	async function registerHandler(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const data = await AuthService.register({ email, password })
			if (data) {
				toast.success('Account has been registered')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	async function loginHeandler(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('Login has been successfully')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	return (
		<div className='mt-40 flex flex-col justify-center items-center bg-slate-900 text-white'>
			{isLogin ? 'Login' : 'Register'}
			<h1 className='text-center text-xl mb-10'></h1>
			<form
				onSubmit={isLogin ? loginHeandler : registerHandler}
				className='flex w-1/3 flex-col mx-auto gap-5 '
			>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					className='input'
					placeholder='Email'
				/>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					className='input'
					placeholder='Password'
				/>
				<button className='btn btn-green mx-auto'>Submit</button>
			</form>
			<div className='flex justify-center mt-5'>
				<button
					onClick={() => {
						setIsLogin(!isLogin)
					}}
					className='text-slate hover:text-white'
				>
					{isLogin
						? 'You don`t have an account ?'
						: 'Already have an account ?'}
				</button>
			</div>
		</div>
	)
}
export default Auth
