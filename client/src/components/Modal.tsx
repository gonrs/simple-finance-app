import { FC } from 'react'
import { Form } from 'react-router-dom'
interface ModalProps {
	type: 'post' | 'patch'
	id?: number
	setVisibleModal: (visible: boolean) => void
}
const Modal: FC<ModalProps> = ({ type, id, setVisibleModal }) => {
	return (
		<div className='fixed left-0 bottom-0 top-0 right-0 w-full h-full bg-black/50 flex justify-center items-center'>
			<Form
				action='/categories'
				method={type}
				onSubmit={() => setVisibleModal(false)}
				className='grid gap-2 w-[300px] p-5 rounded-md bg-slate-900 '
			>
				<label htmlFor='title' className=''>
					<small>Category title</small>
					<input
						type='text'
						name='title'
						placeholder='Title...'
						className='input w-full'
					/>
					<input type='hidden' value={id} name='id' />
				</label>
				<div className='flex items-center gap-2'>
					<button type='submit' className='btn btn-green'>
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						className='btn btn-red'
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}
export default Modal
