import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import Modal from './Modal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState<boolean>(false)

	return (
		<div className='rounded-md bg-slate-800 p-4'>
			<Form method='post' action='/transactions' className='grid gap-2'>
				<label className='flex gap-5 items-center grid' htmlFor='title'>
					<span>Title</span>
					<input
						type='text'
						name='title'
						required
						className='input w-full'
						placeholder='Title'
					/>
				</label>
				<label className='flex gap-5 items-center grid' htmlFor='amount'>
					<span>Amount</span>
					<input
						type='number'
						name='amount'
						required
						className='input w-full'
						placeholder='Amount'
					/>
				</label>

				{categories.length ? (
					<label htmlFor='category' className='grid'>
						<span>Category</span>
						<select name='category' className='input mt-2' required>
							{categories.map((category, index) => {
								return (
									<option key={index} value={category.id}>
										{category.title}
									</option>
								)
							})}
						</select>
					</label>
				) : (
					<h1 className='text-red-300'>You don`t have categories</h1>
				)}
				<button
					onClick={() => setVisibleModal(true)}
					className='mt-2 max-w-fit flex items-center gap-2 text-white/50 hover:text-white'
				>
					<FaPlus />
					<span>Manage categories </span>
				</button>

				<div className='flex gap-4 items-center'>
					<label className='cursor-pointer flex items-center gap-2'>
						<input
							type='radio'
							name='type'
							value={'income'}
							className='form-radio text-blue-600'
						/>
						<span>Income</span>
					</label>
					<label className='cursor-pointer flex items-center gap-2'>
						<input
							type='radio'
							name='type'
							value={'expense'}
							className='form-radio text-blue-600'
						/>
						<span>Expense</span>
					</label>
				</div>

				<button className='btn btn-green max-w-fit mt-2' type='submit'>
					Submit
				</button>
			</Form>
			{visibleModal && <Modal type='post' setVisibleModal={setVisibleModal} />}
		</div>
	)
}
export default TransactionForm
