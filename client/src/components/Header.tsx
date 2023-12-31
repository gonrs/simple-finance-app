import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAppDispatch } from '../store/hooks'
import { logOut } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localStorge.helper'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
const Header: FC = () => {
	const isLogin = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	async function logOutHandler() {
		dispatch(logOut())
		removeTokenFromLocalStorage('token')
		toast.success('You logged out ')
		navigate('/')
	}
	return (
		<header className='flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm'>
			<Link to='/'>
				<FaBtc size={20} />
			</Link>
			{isLogin && (
				<nav className='ml-auto mr-10'>
					<ul className='flex items-center gap-5  transition'>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
								to={'/'}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
								to={'/transactions'}
							>
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
								to={'/categories'}
							>
								Categories
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
			{isLogin ? (
				<button onClick={logOutHandler} className='btn btn-red'>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className='ml-auto mr-10 btn btn-green py-2 text-white/50 hover:text-white '
					to={'auth'}
				>
					Auth
				</Link>
			)}
		</header>
	)
}
export default Header
