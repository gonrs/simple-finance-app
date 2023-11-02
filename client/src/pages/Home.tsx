import { FC } from 'react'
const Home: FC = () => {
	return (
		<div>
			<h1 style={{ textAlign: 'center', fontSize: 30, padding: 30 }}>
				Simple fifnance app
			</h1>
			<h1
				style={{
					fontSize: 25,
					color: '#ff8c8c',
					textAlign: 'center',
					marginTop: 20,
				}}
			>
				Author :{' '}
				<a target='_blanck' href='https://github.com/gonrs'>
					https://github.com/gonrs
				</a>{' '}
			</h1>
		</div>
	)
}
export default Home
