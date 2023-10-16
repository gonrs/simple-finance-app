import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import {
	ICategory,
	IResponseTransactionLoader,
	ITransaction,
} from '../types/types'
import { toast } from 'react-toastify'
import TrnsactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import { formateAmount } from '../helpers/formateAmount'
import Chart from '../components/Chart'
export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>('category/findall')
	const transactions = await instance.get<ITransaction[]>('transaction/findall')

	const totalIncome = await instance.get<number>('transaction/income/find')
	const totalExpanse = await instance.get<number>('transaction/expense/find')
	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpanse: totalExpanse.data,
	}
	return data
}
export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}
			await instance.post('/transaction/create', newTransaction)
			toast.success('Transaction created successfully')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete('/transaction/tr/delete/' + transactionId)
			toast.success('Transaction delete succes')
			return null
		}
	}
}
const Transaction: FC = () => {
	const { totalIncome, totalExpanse } =
		useLoaderData() as IResponseTransactionLoader
	return (
		<>
			<div className='grid grid-cols-3 gap-4 mt-4 items-start'>
				<div className='grid col-span-2'>
					<TransactionForm />
				</div>
				<div className='rounded-md bg-slate-800 p-3'>
					<div className='grid grid-cols-2 gap-3'>
						<div className=''>
							<p className='uppercase text-md font-bold text-center '>
								Total Income:
							</p>
							<p className='bg-green-600 p-1 rounded-small text-center nt-2'>
								{formateAmount.format(totalIncome)}$
							</p>
						</div>

						<div className=''>
							<p className='uppercase text-md font-bold text-center '>
								Total Expense:
							</p>
							<p className='bg-red-600 p-1 rounded-small text-center nt-2'>
								{formateAmount.format(totalExpanse)}$
							</p>
						</div>
					</div>
					<Chart totalIncome={totalIncome} totalExpense={totalExpanse} />
				</div>
			</div>

			<h1 className='my-5'>
				<TrnsactionTable limit={5} />
			</h1>
		</>
	)
}
export default Transaction
