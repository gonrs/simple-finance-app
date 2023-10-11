import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localStorge.helper'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_URL,
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
	},
})
