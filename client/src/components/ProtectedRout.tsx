import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
interface ProtectedRoutProps {
	children: JSX.Element
	needToBeLogin: boolean
}
const ProtectedRout: FC<ProtectedRoutProps> = ({ children, needToBeLogin }) => {
	const isAuth = useAuth()
	return (
		<>
			{/* {needToBeLogin ? (
				<>
					{isAuth ? (
						children
					) : (
						<div className='flex flex-col justify-center items-center mt-20 gap-10'>
							<h1 className='text-2xl'>
								To view this page you must be logged in.
							</h1>
						</div>
					)}
				</>
			) : (
				<>
					{!isAuth ? (
						children
					) : (
						<div className='flex flex-col justify-center items-center mt-20 gap-10'>
							<h1 className='text-2xl'>
								To view this page you must be logged in.
							</h1>
						</div>
					)}
				</>
			)} */}
			{(isAuth && needToBeLogin) || (!needToBeLogin && !isAuth) ? (
				children
			) : (
				<div className='flex flex-col justify-center items-center mt-20 gap-10'>
					{!isAuth && needToBeLogin && (
						<h1 className='text-2xl'>
							To view this page you must be logged in.
						</h1>
					)}
					{isAuth && !needToBeLogin && (
						// <h1 className='text-2xl'>
						// 	You are already be logged in
						// </h1>
						<Navigate to={'/'} />
					)}
				</div>
			)}
		</>
	)
}
export default ProtectedRout
