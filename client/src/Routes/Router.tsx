import { createBrowserRouter } from 'react-router-dom'
import LayOut from '../pages/LayOut'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transaction from '../pages/Transaction'
import Categoryes from '../pages/Categoryes'
import Auth from '../pages/Auth'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LayOut />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				element: <Transaction />,
			},
			{
				path: 'categories',
				element: <Categoryes />,
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
])
