import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Router'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localStorge.helper'
import { AuthService } from './services/auth.service'
import { logOut, login } from './store/user/userSlice'
import { useEffect, useState } from 'react'
import LoadingPage from './pages/Loading'
function App() {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const chekAuth = async () => {
		const token = getTokenFromLocalStorage()

		try {
			if (token) {
				const data = await AuthService.getMe()
				if (data) {
					dispatch(login(data))
				} else {
					dispatch(logOut())
				}
			}
			setIsLoading(false)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		chekAuth()
	}, [])

	return isLoading ? <LoadingPage /> : <RouterProvider router={router} />
}

export default App
