export const formateDate = (dateSt: string): string => {
	const date = new Date(dateSt)
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleDateString('us-US', options)
}
