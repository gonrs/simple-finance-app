import { FC } from 'react'
import { Link } from 'react-router-dom'
const ErrorPage: FC = () => {
	return (
		<div className='min-h-screen  bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
			<h1>404 page not found</h1>
			<Link
				className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'
				to={'/'}
			>
				Go Home
			</Link>
		</div>
	)
}
export default ErrorPage
