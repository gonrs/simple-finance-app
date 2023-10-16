import { createBrowserRouter } from 'react-router-dom'
import LayOut from '../pages/LayOut'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transaction from '../pages/Transaction'
import Categoryes, {
	categoriesAction,
	categoryLoader,
} from '../pages/Categoryes'
import Auth from '../pages/Auth'
import ProtectedRout from '../components/ProtectedRout'
import { transactionAction, transactionLoader } from '../pages/Transaction'

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
				action: transactionAction,
				loader: transactionLoader,
				element: (
					<ProtectedRout needToBeLogin={true}>
						<Transaction />
					</ProtectedRout>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: (
					<ProtectedRout needToBeLogin={true}>
						<Categoryes />
					</ProtectedRout>
				),
			},
			{
				path: 'auth',
				element: (
					<ProtectedRout needToBeLogin={false}>
						<Auth />
					</ProtectedRout>
				),
			},
		],
	},
])
