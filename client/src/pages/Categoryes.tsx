import { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import Modal from '../components/Modal'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const title = {
				title: formData.get('title'),
			}
			await instance.post('category/create', title)
			console.log(20)
			return null
		}
		case 'PATCH': {
			const formData = await request.formData()
			const category = {
				id: formData.get('id'),
				title: formData.get('title'),
			}
			await instance.patch(`category/cat/update/${category.id}`, category)
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const categoryId = formData.get('id')
			await instance.delete(`category/cat/delete/${categoryId}`)
			return null
		}
	}
}
export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>('category/findall')
	return data
}
const Categoryes: FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [visibleModal, setVisibleModal] = useState<boolean>(false)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<number>(0)
	return (
		<>
			<div className='mt-10 pb p-4 rounded-md bg-slate-800 '>
				<h1>Your category list:</h1>
				<div className='flex mt-2 items-center gap-2 flex-wrap'>
					{categories.map((category, index) => {
						return (
							<div
								key={index}
								className='group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2'
							>
								{category.title}
								<div className='absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex'>
									<button
										onClick={() => {
											// setVisibleModal(true)
											setIsEdit(true)
											setCategoryId(category.id)
										}}
									>
										<AiFillEdit />
									</button>
									<Form method='delete' action='/categories' className='flex'>
										<input type='hidden' name='id' value={category.id} />
										<button type='submit'>
											<AiFillCloseCircle />
										</button>
									</Form>
								</div>
							</div>
						)
					})}
					{categories.length === 0 && (
						<h1 className='text-red-300'>You don`t have categories</h1>
					)}
				</div>
				<button
					onClick={() => setVisibleModal(true)}
					className='mt-5 max-w-fit flex items-center gap-2 text-white/50 hover:text-white'
				>
					<FaPlus />
					<span>Create a new category </span>
				</button>
			</div>

			{visibleModal && <Modal type='post' setVisibleModal={setVisibleModal} />}

			{isEdit && (
				<Modal type='patch' id={categoryId} setVisibleModal={setIsEdit} />
			)}
		</>
	)
}
export default Categoryes
