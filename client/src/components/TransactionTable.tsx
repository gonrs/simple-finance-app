import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formateDate } from '../helpers/date.helper'
import { formateAmount } from '../helpers/formateAmount'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface ITransactionTable {
	limit: number
}

const TrnsactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader

	const [data, setData] = useState<ITransaction[]>()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	function handlePageChange(selectedItem: { selected: number }) {
		setCurrentPage(selectedItem.selected + 1)
	}

	const fetchTransations = async (page: number) => {
		const response = await instance.get(
			`/transaction/getpaginations?page=${page}&limit=${limit}`
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	useEffect(() => {
		fetchTransations(currentPage)
	}, [currentPage, transactions])

	return (
		<>
			<ReactPaginate
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
				className='flex gap-3 justify-and mt-4 items-center'
				activeClassName='bg-blue-600 rounded-md'
				pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm '
				previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				disabledClassName='text-white/50 cursor-not-allowed'
				disabledLinkClassName='text-slate-600 cursor-not-allowed'
			/>
			<div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Title</td>
							<td className='font-bold'>Amount($)</td>
							<td className='font-bold'>Category</td>
							<td className='font-bold'>Date</td>
							<td className='text-right'>Action</td>
						</tr>
					</thead>
					<tbody className='w-full'>
						{data?.map((transaction, index) => {
							return (
								<tr key={index}>
									<td>{transaction.id}</td>
									<td>{transaction.title}</td>
									<td
										className={
											transaction.type == 'income'
												? 'text-green-500'
												: 'text-red-500'
										}
									>
										{transaction.type === 'income'
											? `+ ${formateAmount.format(transaction.amount)}`
											: `- ${formateAmount.format(transaction.amount)}`}
									</td>
									<td>{transaction.category?.title || 'Other'}</td>
									<td>{formateDate(transaction.createdAt)}</td>
									<td>
										<Form method='delete' action='/transactions'>
											<input type='hidden' name='id' value={transaction.id} />
											<button className='ml-auto btn hover:btn-red'>
												<FaTrash />
											</button>
										</Form>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}
export default TrnsactionTable
